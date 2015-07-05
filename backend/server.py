import tornado.ioloop
import tornado.web
from search.jobsolr import JobSolrSuggesterHandler, JobSolrSelectHandler

def main():
	application = tornado.web.Application([
		(r"/jobsolr/suggest", JobSolrSuggesterHandler),
        (r"/jobsolr/select", JobSolrSelectHandler)
	])

	application.listen(8888)
	tornado.ioloop.IOLoop.instance().start()

if __name__ == '__main__':
	main()
