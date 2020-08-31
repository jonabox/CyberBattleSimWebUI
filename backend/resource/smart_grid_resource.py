"""
Provide API to access the scenario information
"""

from flask_restful import Resource,reqparse
from flask import jsonify
from config import api,URL_BASE,logging

from db_operator.op_smart_grid import SGDBOperator

class SmartGridActorResource(Resource):
    def get(self):
        #get the scenario information from the database
        #parser the parameters
        parser = reqparse.RequestParser()
        parser.add_argument('id', required=True, help="ID is required!")
        args = parser.parse_args()

        #fetch the scenario id
        actor_id = args['id']
        operator = SGDBOperator()
        result = operator.get_sg_actor_brief(actor_id)
        result['status'] = 200
        result['message'] = 'Finish Fetching Actor Information'
        return jsonify(result)

class SmartGridSystemNetworkResource(Resource):
    def get(self):
        #get the system network information
        parser = reqparse.RequestParser()
        parser.add_argument('s', help="whether only include the network scretch!")
        args = parser.parse_args()

        is_scretch = args['s'] #if not included, then it is None
        operator = SGDBOperator()
        result = operator.get_sg_network(is_scretch)
        # result={}
        result['status'] = 200
        result['message'] = 'Finish Fetching System Network Information'
        return jsonify(result)

class SmartGridIRCategoryResource(Resource):
    def get(self):
        #get the system network information
        parser = reqparse.RequestParser()
        parser.add_argument('id', required=True, help="ID is required!")
        args = parser.parse_args()

        category_id = args['id'] #if not included, then it is None
        operator = SGDBOperator()
        result = operator.get_sg_LRC_detail()
        # result={}
        result['status'] = 200
        result['message'] = 'Finish Fetching Information Category Information'
        return jsonify(result)

#register the resource
def __register_smart_grid_resource():
    #    #need to regist this resource to the aggregator
    api.add_resource(SmartGridActorResource, URL_BASE+'/sg/actor')
    api.add_resource(SmartGridSystemNetworkResource, URL_BASE+'/sg/network')
    api.add_resource(SmartGridIRCategoryResource, URL_BASE+'/sg/lrc')
    logging.info("Finish the Smart Grid api initiation")