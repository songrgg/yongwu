from tornado_json.requesthandlers import APIHandler
from tornado_json import schema

class JobSolrHandler(APIHandler):
	"""JobSolr"""
	@schema.validate(
		output_schema={"type": "string"},
		output_example='jsonCallback({"query": "PHP","suggestions": [{ "value": "PHP Developer", "data": "PHP" }]})'
	)
	def suggest(self, q):
		"""jsonCallback({"query": "PHP","suggestions": [{ "value": "PHP Developer", "data": "PHP" }]})"""
		return 'jsonCallback({"query": "%s","suggestions": [{ "value": "PHP Developer", "data": "PHP" }]})' % q
