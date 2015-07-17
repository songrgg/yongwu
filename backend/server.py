import tornado.ioloop
import tornado.web
from search.jobsolr import JobSolrSuggesterHandler, JobSolrSelectHandler
from user.activity import RegisterHandler, LoginHandler, LogoutHandler


def main():
	application = tornado.web.Application([
		(r"/jobsolr/suggest", JobSolrSuggesterHandler),
        (r"/jobsolr/select", JobSolrSelectHandler),
        (r"/user/register", RegisterHandler),
        (r"/user/login", LoginHandler),
        (r"/user/logout", LogoutHandler)
	], cookie_secret="ALLIWANNASAYISTHEYDONTCAREABOUTUS")

	application.listen(8888)
	tornado.ioloop.IOLoop.instance().start()

if __name__ == '__main__':
	main()
