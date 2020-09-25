
from config import db,ma
from model.cyber_scenario_db import Scenario,Scenario_Security_Requirement_Mapping,Scenario_Mitigation_Mapping,Scenario_Attack_Tree,Scenario_Vulnerability_Mapping,Scenario_Attack_Tree_Edge

#create the schema that we can use the serialize the data
class ScenarioSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Scenario
scenario_schema = ScenarioSchema()
scenario_list_schema = ScenarioSchema(many=True)

class ScenarioAttackTreeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Scenario_Attack_Tree
scenario_attack_graph_schema = ScenarioAttackTreeSchema()
scenario_attack_graph_list_schema = ScenarioAttackTreeSchema(many=True)

class ScenarioVulnerabilitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Scenario_Vulnerability_Mapping
scenario_vulnerability_schema = ScenarioVulnerabilitySchema()
scenario_vulnerability_list_schema = ScenarioVulnerabilitySchema(many=True)

class ScenarioMitigationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Scenario_Mitigation_Mapping
scenario_mitigation_schema = ScenarioMitigationSchema()
scenario_mitigation_list_schema = ScenarioMitigationSchema(many=True)

class ScenarioEdgeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Scenario_Attack_Tree_Edge
scenario_edge_schema = ScenarioEdgeSchema()
scenario_edge_list_schema = ScenarioEdgeSchema(many=True)

class ScenarioSecurityRequirementSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Scenario_Security_Requirement_Mapping
scenario_security_requirement_schema = ScenarioSecurityRequirementSchema()
scenario_security_requirement_list_schema = ScenarioSecurityRequirementSchema(many=True)

class ScenarioDBOperator(object):
    """
    scenario_id: all/or detail id
    is_detail: whether return all the detail information or just brief information
    """
    def get_scenario_brief(self,scenario_id):
        scenario_list = []
        if scenario_id == 'all':
            #fetch all the secenario information
            scenario_list = db.session.query(Scenario).all()
            scenario_mitigation_list = db.session.query(Scenario_Attack_Tree_Edge).all()
        else:
            #check whether the scenario_id exist and then return
            scenario_list = db.session.query(Scenario).filter(Scenario.scenario_id==scenario_id).all()
        #if don't request detail information, then return the results
        #otherwise, begin to get more detail about each scenario
        result = {}
        result['scenario_no'] = len(scenario_list)

        if len(scenario_list) > 0:
            json_result = scenario_list_schema.dump(scenario_list)
            json_result += scenario_edge_list_schema.dump(scenario_mitigation_list)
            result['data'] = json_result

        return result
    
    def get_scenario_detail_by_id(self,scenario_id):
        #fetch the data
        scenario_item = db.session.query(Scenario).filter(Scenario.scenario_id==scenario_id).first()
        result = {}
        if scenario_item is None:
            result['has_detail']=0
        else:
            result['has_detail']=1
            #get the detail information for this scenario
            #including: 
            # scenario attack network
            self.get_scenario_attack_graph(scenario_id,result)
            # scenario vulnerability
            self.get_scenario_vulnerability(scenario_id,result)
            # scenario mitigation
            self.get_scenario_mitigation(scenario_id,result)
            # scenario edge
            self.get_scenario_edge(scenario_id,result)
            # scenario security requirement
            self.get_scenario_security_requirement(scenario_id,result)
        return result
    
    def get_scenario_mitigation(self,scenario_id,result):
        scenario_mitigation_list = db.session.query(Scenario_Mitigation_Mapping).filter(Scenario_Mitigation_Mapping.scenario_id==scenario_id).all()
        if len(scenario_mitigation_list) > 0:
            result['has_mitigation'] = len(scenario_mitigation_list)
            result['mitigation_details'] = scenario_mitigation_list_schema.dump(scenario_mitigation_list)
        else:
            result['has_mitigation'] = 0
        return
    
    def get_scenario_edge(self,scenario_id,result):
        scenario_mitigation_list = db.session.query(Scenario_Attack_Tree_Edge).filter(Scenario_Attack_Tree_Edge.scenario_id==scenario_id).all()
        if len(scenario_edge_list) > 0:
            result['has_edges'] = len(scenario_edge_list)
            result['edge_details'] = scenario_mitigation_list_schema.dump(scenario_edge_list)
        else:
            result['has_edges'] = 0
        return
    
    def get_scenario_vulnerability(self,scenario_id,result):
        scenario_vulnerability_list = db.session.query(Scenario_Vulnerability_Mapping).filter(Scenario_Vulnerability_Mapping.scenario_id==scenario_id).all()
        if len(scenario_vulnerability_list) > 0:
            result['has_vulnerability'] = len(scenario_vulnerability_list)
            result['vulnerability_details'] = scenario_vulnerability_list_schema.dump(scenario_vulnerability_list)
        else:
            result['has_vulnerability'] = 0
        return
    
    def get_scenario_security_requirement(self,scenario_id,result):
        scenario_security_requirement_list = db.session.query(Scenario_Security_Requirement_Mapping).filter(Scenario_Security_Requirement_Mapping.scenario_id==scenario_id).all()
        if len(scenario_security_requirement_list) > 0:
            result['has_security_requirement'] = len(scenario_security_requirement_list)
            result['security_requirement_details'] = scenario_security_requirement_list_schema.dump(scenario_security_requirement_list)
        else:
            result['has_security_requirement'] = 0
        return
    
    def get_scenario_attack_graph(self,scenario_id,result):
        scenario_attack_graph_list = db.session.query(Scenario_Attack_Tree).filter(Scenario_Attack_Tree.scenario_id==scenario_id).all()
        if len(scenario_attack_graph_list) > 0:
            result['has_attack_graph'] = len(scenario_attack_graph_list)
            result['attack_graph_details'] = scenario_attack_graph_list_schema.dump(scenario_attack_graph_list)
        else:
            result['has_attack_graph'] = 0
        return


