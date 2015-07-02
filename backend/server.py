import tornado.ioloop
import tornado.web
from search.jobsolr import JobSolrSuggesterHandler

def main():
	application = tornado.web.Application([
		(r"/jobsolr/suggest/(.*)", JobSolrSuggesterHandler)
	])

	application.listen(8888)
	tornado.ioloop.IOLoop.instance().start()

if __name__ == '__main__':
	main()
