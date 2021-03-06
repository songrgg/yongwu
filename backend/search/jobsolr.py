#!/usr/bin/python
# -*- coding: utf-8 -*-

# tornado packages
import tornado.ioloop
import tornado.web
from tornado.log import LogFormatter

# python packages
from urllib2 import *
from datetime import date
import json
import logging

# custom packages
from jobservice import JobSolrService

class JobSolrSuggesterHandler(tornado.web.RequestHandler):
    def initialize(self):
        # initialize the logger with tornado's LogFormatter
        self.formatter = LogFormatter(color=False)
        self.logger = logging.Logger(self.__class__.__name__)
        self.logger.propagate = False

        try:
            self.handler = logging.FileHandler("/var/log/yongwu_" + date.today().isoformat() + ".log")
        except IOError:
            print "Please run as administrator."

        self.handler.setFormatter(self.formatter)
        self.logger.addHandler(self.handler)

    def get(self):
        """jsonCallback({"query": "PHP","suggestions": [{ "value": "PHP Developer", "data": "PHP" }]})"""
        query = self.get_argument('suggest.q', 'P')

        callback = self.get_argument('callback', 'jsonCallback')

        service = JobSolrService('120.26.209.92', '9998', replica='jobsearch_shard1_replica1')

        self.set_header("Content-Type", "application/json")

        try:
            suggestions = service.suggest({
                'suggest.q': query.encode('utf-8'),
                "wt": "json",
                'suggest': 'true',
                'suggest.build': 'true',
                'suggest.dictionary': 'mySuggester'
            })

            _suggestions = []
            for v in suggestions:
                _suggestions.append({'value': v['term'], 'data': v['term']})

            response = '%s({"query": "%s","suggestions": %s})' % (callback, query, json.dumps(_suggestions))
            self.write(response)
            return
        except Exception, e:
            self.logger.error("suggest query for `%s`" % query)

        self.write('%s({"query":"%s", "suggestions": []})' % (callback, query))

class JobSolrSelectHandler(tornado.web.RequestHandler):
    def initialize(self):
        # initialize the logger with tornado's LogFormatter
        self.formatter = LogFormatter(color=False)
        self.logger = logging.Logger(self.__class__.__name__)
        self.logger.propagate = False

        try:
            self.handler = logging.FileHandler("/var/log/yongwu_" + date.today().isoformat() + ".log")
        except IOError:
            print "Please run as administrator."

        self.handler.setFormatter(self.formatter)
        self.logger.addHandler(self.handler)

    def get(self):
        query = self.get_argument('q', 'P')
        start = self.get_argument('start', 0)
        rows = self.get_argument('rows', 10) # default 10 items per page
        callback = self.get_argument('callback', 'jsonCallback')

        service = JobSolrService('120.26.209.92', '9998', replica='jobsearch_shard1_replica1')

        self.set_header("Content-Type", "application/json")

        try:
            rsp = service.select({
                # 'q': '%E7%94%B5',
                'q': query.encode('utf-8'),
                "wt": "json",
                'start': start,
                'rows': rows
            })

            self.write('%s(%s)' % (callback, json.dumps(rsp)))
            return
        except Exception as e:
			self.logger.error("suggest query for `%s`" % query)

        self.write('%s({})' % callback)
