"""Job service base class.

This module defines the base job search class.
Subclasses like the ``Apache solr``, ``ElasticSearch`` can implement the suggest,
select functions.
"""

from urllib2 import *
import urllib
from datetime import date
import logging
import json
import sys

from tornado.log import LogFormatter

class JobService(object):
    """Base job service, providing select, suggest functions.
    """

    """Initialize with the host, port and other options.

    The interface is the base class to provide job service with specified
    host, port and other options.
    """
    def __init__(self, host, port, **kwargs):
        self.host = host
        self.port = port
        for k in kwargs:
            setattr(self, k, kwargs[k])

        # initialize the logger with tornado's LogFormatter
        self.formatter = LogFormatter(color=False)
        self.logger = logging.Logger(self.__class__.__name__)
        self.logger.propagate = False

        try:
            self.handler = logging.FileHandler("/var/log/yongwu_" + date.today().isoformat() + ".log")
        except IOError:
            print "Please run as administrator."
            sys.exit(-1)

        self.handler.setFormatter(self.formatter)
        self.logger.addHandler(self.handler)

    def suggest(self, options={}):
        raise NotImplementedError()

    def select(self, options={}):
        raise NotImplementedError()

class JobSolrService(JobService):
    def suggest(self, options={}):
        if (hasattr(self, 'replica')):
            if (self.replica.endswith('/') == False):
                self.replica = self.replica + '/'
        else:
            self.replica = ''

        """suggest=true&suggest.build=true&suggest.dictionary=mySuggester&wt=json&
        """
        reqString = 'http://{0}:{1}/solr/{2}suggest?{3}'.format(
            self.host, self.port, self.replica,
            urllib.urlencode(options)
        )

        if 'suggest.q' in options:
            query = options['suggest.q']
        else:
            self.logger.fatal('suggest lack of query string')
            return False

        self.logger.debug("suggest %s" % reqString)

        try:
            conn = urlopen(reqString)
            rsp = json.load(conn)

            if ('responseHeader' in rsp and
                'status' in rsp['responseHeader'] and
                rsp['responseHeader']['status'] == 0):
                suggestions = rsp['suggest']['mySuggester'][query]['suggestions']

                self.logger.info(reqString)
                return suggestions
        except Exception, e:
            self.logger.error(reqString)
            return False

        return False

    def select(self, options={}):
        """Solr search function.

        keyword is the must field, options mean the extra url paramameters, like:
            'q'     -> query string **Key word**
            'indent'-> if indented
            'start' -> the start index
            'wt'    -> output format, `json`.`xml`.`csv`.`ruby`.`php`
            'rows'  -> query rows
            'fq'
            'sort'
            'fl'
            'df'

        for example:
            rows = service.select('*:*', {
                'wt': 'json',
                'indent': 'true'
            })
        """
        if (hasattr(self, 'replica')):
            if (self.replica.endswith('/') == False):
                self.replica = self.replica + '/'
        else:
            self.replica = ''

        reqString = 'http://{0}:{1}/solr/{2}select?{3}'.format(
            self.host, self.port, self.replica,
            urllib.urlencode(options)
        )
        self.logger.debug(reqString)

        try:
            conn = urlopen(reqString)
            rsp = json.load(conn)

            if ('responseHeader' in rsp and
                'status' in rsp['responseHeader'] and
                rsp['responseHeader']['status'] == 0):
                searchResult = rsp['response']

                self.logger.info(reqString)
                return searchResult
        except Exception, e:
            self.logger.error(reqString)
            return False

        return False

if __name__ == '__main__':
    service = JobSolrService('120.26.209.92', '9998', replica='jobsearch_shard1_replica1')
    sugg = service.suggest({
        'suggest.q': 'P',
        'wt': 'json',
        'indent': 'true',
        'suggest': 'true',
        'suggest.build': 'true',
        'suggest.dictionary': 'mySuggester'
    })
    print sugg
    # rows = service.select({
    #     'q': '*:*',
    #     'wt': 'json',
    #     'indent': 'true'
    # })
    # print rows
