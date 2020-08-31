#this is to support the instance dynamic creation
#risky?
import sys
sys.path.append(...)

#create instance dynamically
def _createClass(module_name, class_name):
    module_meta = __import__(module_name, globals(), locals(), [class_name])
    class_meta = getattr(module_meta, class_name)
    return class_meta

#create instance dynamically
def _createInstance(module_name, class_name, *args, **kwargs):
    class_meta = _createClass(module_name, class_name)
    obj = class_meta(*args, **kwargs)
    return obj

#
from flask import Flask
application = Flask(__name__)
application.config.from_object('config.default')
# application.config.from_object('config.deploy')

"""
Create the global db connection
"""
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy(application)

"""
Initiate the marshmallow for serilazation
"""
from flask_marshmallow import Marshmallow
ma = Marshmallow(application)

"""
Create the global resource registration
"""
from flask_restful import Api
api = Api(application)

"""
Basic URL to be added to the resource API
"""
URL_BASE = '/cams/api/v1'

def __init__db__():
    from model.cyber_scenario_db import __init_db
    __init_db()
    return

def __init_api__():
    #config the available API
    print('Initiate API')
    from resource.system_initiate_resource import __register_system_initiate_resource
    __register_system_initiate_resource()

    from resource.attack_scenario_resource import __register_scenario_resource
    __register_scenario_resource()

    from resource.attack_scenario_detail_resource import __register_scenario_detail_resource
    __register_scenario_detail_resource()

    from resource.smart_grid_resource import __register_smart_grid_resource
    __register_smart_grid_resource()
    
    return

import logging as logging
def __init_logger__():
    import json
    import logging.config
    from os import path

    basepath = path.dirname(__file__)
    logging_file_path = basepath+'\\logging.json'
    with open(logging_file_path, 'rt') as f:
        config = json.load(f)
        logging.config.dictConfig(config)
    logging.info('Finish Initial the logger')

