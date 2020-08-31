"""
Provide API to access the scenario information
"""

from flask_restful import Resource,reqparse
from flask import jsonify
from config import api,URL_BASE

from db_operator.op_scenario import ScenarioDBOperator

class ScenarioResource(Resource):
    def get(self):
        #get the scenario information from the database
        #parser the parameters
        parser = reqparse.RequestParser()
        parser.add_argument('id', required=True, help="ID is required!")
        args = parser.parse_args()

        #fetch the scenario id
        scenario_id = args['id']
        operator = ScenarioDBOperator()
        result = operator.get_scenario_brief(scenario_id)
        result['status'] = 200
        result['message'] = 'Finish Fetching Scenario'
        return jsonify(result)

#register the resource
def __register_scenario_resource():
    #    #need to regist this resource to the aggregator
    api.add_resource(ScenarioResource, URL_BASE+'/scenario')
    print("Finish the Scenario api initiation")