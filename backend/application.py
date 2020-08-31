from config import application,db,__init__db__,__init_logger__,__init_api__
from flask import jsonify
import os

@application.teardown_request
def teardown_request(exception):
    if exception:
        application.logger.error(exception)
    try:    
        db.session.commit()
    except:       
        db.session.rollback()     
    finally:      
        db.session.close()       
        db.session.remove()  

@application.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    # response.headers.add('Access-Control-Allow-Origin', 'http://13.58.70.231:8080')
    response.headers.add("Access-Control-Allow-Credentials", "true")
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST')
    return response

@application.route("/")
def hello():
    return('Welcome to CAMS')

if __name__ == '__main__':
    if os.environ.get("WERKZEUG_RUN_MAIN") != "true":
        print('######Only Run Once within this##########')
        # initial the database
        __init__db__()
        __init_logger__()
        
    print('#########ReRun: Initial APIs###########')
    __init_api__()
    #finish
    application.run()

