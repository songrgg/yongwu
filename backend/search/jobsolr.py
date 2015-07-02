import tornado.ioloop
import tornado.web
from urllib2 import *
import simplejson

class JobSolrSuggesterHandler(tornado.web.RequestHandler):
	def get(self, params):
		"""jsonCallback({"query": "PHP","suggestions": [{ "value": "PHP Developer", "data": "PHP" }]})"""
		query = self.get_argument('query', '')
		callback = self.get_argument('callback', 'jsonCallback')
		reqString = 'http://localhost:9998/solr/jobsearch_shard1_replica1/suggest?suggest=true&suggest.build=true&suggest.dictionary=mySuggester&wt=json&suggest.q=%s' % query
		conn = urlopen(reqString)

		try:
			rsp = simplejson.load(conn)

			if ('responseHeader' in rsp and
				'status' in rsp['responseHeader'] and
				rsp['responseHeader']['status'] == 0):
				suggestions = rsp['suggest']['mySuggester'][query]['suggestions']

				_suggestions = []
				for v in suggestions:
					_suggestions.append({'value': v['term'], 'data': v['term']})

				_suggestions = simplejson.dumps(_suggestions)

				response = '%s({"query": "%s","suggestions": %s})' % (callback, query, _suggestions)
				self.write(response)
				print "status OK: %s" % reqString
				return
		except Exception, e:
			print "status FAIL: %s" % reqString

		self.write('%s({"query":"%s", "suggestions": []})' % (callback, query))
		

