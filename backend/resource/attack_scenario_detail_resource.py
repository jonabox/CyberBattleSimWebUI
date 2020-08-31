"""
Provide API to access the detail information for a given scenario
"""

from flask_restful import Resource,reqparse
from flask import jsonify
from config import api,URL_BASE

from db_operator.op_scenario import ScenarioDBOperator

class ScenarioDetailResource(Resource):
    def get(self):
        #get the scenario information from the database
        #parser the parameters
        parser = reqparse.RequestParser()
        parser.add_argument('id', required=True, help="ID is required!")
        args = parser.parse_args()

        #fetch the scenario id
        scenario_id = args['id']
        operator = ScenarioDBOperator()
        result = operator.get_scenario_detail_by_id(scenario_id)
        result['status'] = 200
        result['message'] = 'Finish Fetching Scenario Detail Information'
        return jsonify(result)

#register the resource
def __register_scenario_detail_resource():
    #    #need to regist this resource to the aggregator
    api.add_resource(ScenarioDetailResource, URL_BASE+'/scenario_detail')
    print("Finish the Scenario Detail api initiation")