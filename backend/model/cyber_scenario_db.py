#-----------------------
# model for the scenario
#-----------------------

from config import db

#------------------------
# NISTIT 7628: the system and security requirement
# Mapping Relations:
# Actor -- Reference Interface -- Reference Interface Category --Security Requirement - Vulnerability - CWE_ID
# Reference Interface Category -- Attribution
#-------------------------
class SG_Actor(db.Model):
    __tablename__ = 'sg_actor'
    actor_id = db.Column(db.String(255), primary_key = True)
    domain_name = db.Column(db.String(255)) #limitation
    actor_name = db.Column(db.Text)
    actor_acronym = db.Column(db.String(255))
    actor_description = db.Column(db.Text)

class SG_Logical_Reference(db.Model):
    __tablename__ = 'sg_logical_reference'
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    logical_reference_id = db.Column(db.String(255))
    actor_i_index = db.Column(db.String(255)) 
    actor_j_index = db.Column(db.String(255)) 
    logical_category_list = db.Column(db.String(255))

class SG_Logical_Reference_Category(db.Model):
    __tablename__ = 'sg_logical_reference_category'
    logical_category_id = db.Column(db.String(255), primary_key = True)
    category_description = db.Column(db.Text) 
    category_requirement_confidentiality = db.Column(db.String(255)) 
    category_requirement_integrity = db.Column(db.String(255)) 
    category_requirement_availability = db.Column(db.String(255))

class SG_Security_Requirement(db.Model):
    __tablename__ = 'sg_security_requirement'
    sr_id = db.Column(db.String(255), primary_key = True)
    sr_name = db.Column(db.Text)
    sr_category = db.Column(db.Text)
    sr_domain_id = db.Column(db.String(255))
    sr_requirement_description = db.Column(db.Text)
    sr_supplemental_guidance = db.Column(db.Text)
    sr_requirement_enhancements = db.Column(db.Text)
    sr_additional_considerations = db.Column(db.Text)
    low_impact_allocation = db.Column(db.String(255))
    moderate_impact_allocation = db.Column(db.String(255))
    high_impact_allocation = db.Column(db.String(255))

class SG_SR_LIC_Mapping(db.Model):
    __tablename__ = 'sg_security_requirement_logical_interface_category_mapper'
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    security_requirement_id = db.Column(db.String(255))
    logical_reference_category_id = db.Column(db.String(255))
    allocation_level = db.Column(db.String(255))

class SG_Vulnerability(db.Model):
    __tablename__ = 'sg_security_vulnerability'
    vulnerability_id  = db.Column(db.String(255), primary_key = True)
    vulnerability_name = db.Column(db.Text)
    description = db.Column(db.Text)
    potential_impact = db.Column(db.Text)
    example = db.Column(db.Text)
    sub_category_id = db.Column(db.String(255))
    sub_category_name = db.Column(db.String(255))
    category_id = db.Column(db.String(255))
    category_name = db.Column(db.String(255))
    related_CWE_ID = db.Column(db.Text)

class SG_Attribute(db.Model):
    __tablename__ = 'sg_attribute'
    attribute_id  = db.Column(db.String(255), primary_key = True)
    attribute_name = db.Column(db.Text)
    description = db.Column(db.Text)

class SG_Attribute_LIC_Mapping(db.Model):
    __tablename__ = 'sg_attribute_logical_interface_category_mapper'
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    attribute_id = db.Column(db.String(255))
    logical_reference_category_list = db.Column(db.String(255))

class SG_Vulnerability_SR_Mapping(db.Model):
    __tablename__ = 'sg_vulnerability_security_requirement_mapper'
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    vulnerability_id = db.Column(db.String(255))
    vulnerability_name = db.Column(db.Text)
    security_requirement_list = db.Column(db.String(255))

############################################
# NESCOR: Failure Scenario & Attack Tree
# scenario-scenario attack tree-item-mitigation
# scenario-vulnerability mapping
# scenario-mitigation mapping
# scenario-security requirment mapping 
############################################
class Scenario(db.Model):
    __tablename__ = 'cams_scenario'
    scenario_id  = db.Column(db.String(255), primary_key = True)
    scenario_domain_id = db.Column(db.String(255))
    scenario_domain_name = db.Column(db.String(255))
    scenario_name = db.Column(db.Text)
    scenario_description = db.Column(db.Text)
    scenario_impact = db.Column(db.Text)
    scenario_source = db.Column(db.String(255))

#status of the data integrity for each scenarios
class Scenario_Data_Integrity(db.Model):
    __tablename__ = 'cams_scenario_data_integrity'
    scenario_id  = db.Column(db.String(255), primary_key = True)
    has_attack_tree = db.Column(db.String(255))
    has_network_verify = db.Column(db.String(255))
    has_scenario_vulnerability = db.Column(db.String(255))
    has_scenario_mitigation = db.Column(db.String(255))
    has_scenario_security_requirement = db.Column(db.String(255))
    has_scenario_risk = db.Column(db.String(255))
    has_graph_node_vulnerability = db.Column(db.String(255))
    has_graph_node_mitigation = db.Column(db.String(255))
    has_graph_node_risk = db.Column(db.String(255))

class Scenario_Attack_Tree(db.Model):
    __tablename__ = 'cams_scenario_attack_tree'
    scenario_id  = db.Column(db.String(255), primary_key = True)
    scenario_name = db.Column(db.Text)
    scenario_domain_id = db.Column(db.String(255))
    scenario_description = db.Column(db.Text)
    scenario_assumption = db.Column(db.Text)

class Scenario_Attack_Tree_Item(db.Model):
    __tablename__ = 'cams_scenario_attack_tree_item'
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    scenario_id = db.Column(db.String(255))
    attack_item_id = db.Column(db.String(255))
    attack_item_description = db.Column(db.Text)
    is_sub_network = db.Column(db.String(255))
    item_type = db.Column(db.String(255))

class Scenario_Attack_Tree_Edge(db.Model):
    __tablename__ = 'cams_scenario_attack_tree_edge'
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    scenario_id = db.Column(db.String(255))
    attack_item_source = db.Column(db.String(255))
    attack_item_target = db.Column(db.String(255))
    logical_type = db.Column(db.String(255))

class Scenario_Attack_Tree_Item_Mitigation(db.Model):
    __tablename__ = 'cams_scenario_attack_tree_item_mitigation'
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    scenario_id = db.Column(db.String(255))
    attack_item_id = db.Column(db.String(255))
    mitigation_description = db.Column(db.Text)
    action_type = db.Column(db.String(255))
    action_common_category = db.Column(db.String(255))
    action_application_context = db.Column(db.Text)
    action_group = db.Column(db.String(255))

class Scenario_Vulnerability_Mapping(db.Model):
    __tablename__ = 'cams_scenario_vulnerability'
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    scenario_id = db.Column(db.String(255))
    original_vulnerability = db.Column(db.Text)
    common_vulnerability = db.Column(db.Text)
    vulnerability_context = db.Column(db.Text)
    vulnerability_name = db.Column(db.Text)
    vulnerability_id = db.Column(db.String(255))

class Scenario_Mitigation_Mapping(db.Model):
    __tablename__ = 'cams_scenario_mitigation'
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    scenario_id = db.Column(db.String(255))
    original_mitigation = db.Column(db.Text)
    action_type = db.Column(db.String(255))
    action_common_category = db.Column(db.String(255))
    action_application_context = db.Column(db.Text)
    action_group = db.Column(db.String(255))

class Scenario_Security_Requirement_Mapping(db.Model):
    __tablename__ = 'cams_scenario_security_requirement'
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    scenario_id = db.Column(db.String(255))
    security_requirement_id = db.Column(db.String(255))
    
##########################################
# MITER ATT&CK Framework
# Matrix - Tactic - Technique - Mitigation
# Technique - Software - Group
# Everything - External Source
##########################################

class MITRE_Matrix(db.Model):
    __tablename__ = 'mitre_attack_matrix'
    matrix_id  = db.Column(db.String(255), primary_key = True)
    matrix_name = db.Column(db.String(255))
    matrix_description = db.Column(db.Text)
    matrix_url = db.Column(db.Text)
    matrix_source_name = db.Column(db.String(255))
    matrix_MITRE_id = db.Column(db.String(255))
    matrix_stix_json = db.Column(db.Text) #json file from the stix

class MITRE_Tactic(db.Model):
    __tablename__ = 'mitre_attack_tactic'
    tactic_id  = db.Column(db.String(255), primary_key = True)
    tactic_name = db.Column(db.String(255))
    tactic_short_name = db.Column(db.String(255))
    tactic_external_id = db.Column(db.String(255))
    tactic_description = db.Column(db.Text)
    tactic_url = db.Column(db.Text)
    tactic_source_name = db.Column(db.String(255))

class MITRE_Technique(db.Model):
    __tablename__ = 'mitre_attack_technique'
    technique_id  = db.Column(db.String(255), primary_key = True)
    technique_name = db.Column(db.String(255))
    technique_description = db.Column(db.Text)
    technique_type = db.Column(db.String(255))
    technique_kill_chain_phase = db.Column(db.String(255))
    technique_platforms = db.Column(db.Text)
    technique_permissions_requirements = db.Column(db.String(255))
    is_subtechnique = db.Column(db.String(255))

class MITRE_Mitigation(db.Model):
    __tablename__ = 'mitre_attack_mitigation'
    mitigation_id  = db.Column(db.String(255), primary_key = True)
    mitigation_name = db.Column(db.String(255))
    mitigation_description = db.Column(db.Text)
    is_deprecated = db.Column(db.String(255))

#procedure == group
class MITRE_Group(db.Model):
    __tablename__ = 'mitre_attack_group'
    group_id  = db.Column(db.String(255), primary_key = True)
    group_name = db.Column(db.String(255))
    group_description = db.Column(db.Text)
    group_type = db.Column(db.String(255))
    group_aliases = db.Column(db.Text)

class MITRE_External_Source(db.Model):
    __tablename__ = 'mitre_attack_external_source'
    external_source_id = db.Column(db.String(255), primary_key = True)
    external_source_url = db.Column(db.Text)
    external_source_name = db.Column(db.String(255))
    external_source_description = db.Column(db.Text)

class MITRE_Software(db.Model):
    __tablename__ = 'mitre_attack_software'
    software_id  = db.Column(db.String(255), primary_key = True)
    software_name = db.Column(db.String(255))
    software_description = db.Column(db.Text)
    software_type = db.Column(db.String(255))
    software_platforms = db.Column(db.Text)
    software_aliases = db.Column(db.Text)

class MITRE_Relationship(db.Model):
    __tablename__ = 'mitre_attack_relationship'
    relation_id = db.Column(db.String(255), primary_key = True)
    relation_description = db.Column(db.Text)
    relation_type = db.Column(db.String(255))
    source_ref_id = db.Column(db.String(255))
    target_ref_id = db.Column(db.String(255))

    
#--------------------------------------------------------------

def __init_db():
    db.create_all()
    print("Finish Database Create!")