import tornado.ioloop
from tornado_json.routes import get_routes
from tornado_json.application import Application

import jobsolr

def main():
	routes = get_routes(jobsolr)

	application = Application(routes=routes, settings={})

	application.listen(8888)
	tornado.ioloop.ioloop.instance().start()
