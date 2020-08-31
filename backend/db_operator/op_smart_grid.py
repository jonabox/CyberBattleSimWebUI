#operator to query the data base

from config import db,ma,logging
from model.cyber_scenario_db import SG_Actor,SG_Attribute,SG_Attribute_LIC_Mapping,SG_Logical_Reference,SG_Logical_Reference_Category,SG_Security_Requirement,SG_SR_LIC_Mapping,SG_Vulnerability,SG_Vulnerability_SR_Mapping

#create the schema that we can use for serialization
class SGActorSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SG_Actor
sg_actor_schema = SGActorSchema()
sg_actor_list_schema = SGActorSchema(many=True)

class SGLRSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SG_Logical_Reference
sg_logical_reference_schema = SGLRSchema()
sg_logical_reference_list_schema = SGLRSchema(many=True)

class SGLRCSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SG_Logical_Reference_Category
sg_logical_reference_category_schema = SGLRCSchema()
sg_logical_reference_category_list_schema = SGLRCSchema(many=True)

class SGSecurityRequirementSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SG_Security_Requirement
sg_security_requirement_schema = SGSecurityRequirementSchema()
sg_security_requirement_list_schema = SGSecurityRequirementSchema(many=True)

class SGVulnerabilitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SG_Vulnerability
sg_vulnerability_schema = SGVulnerabilitySchema()
sg_vulnerability_list_schema = SGVulnerabilitySchema(many=True)

class SGAttributeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SG_Attribute
sg_attribute_schema = SGAttributeSchema()
sg_attribute_list_schema = SGAttributeSchema(many=True)

class SGMapperSR_LTCSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SG_SR_LIC_Mapping
sg_mapper_sr_ltc_schema = SGMapperSR_LTCSchema()
sg_mapper_sr_ltc_list_schema = SGMapperSR_LTCSchema(many=True)

class SGMapperLTC_AttributeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SG_Attribute_LIC_Mapping
sg_mapper_ltc_attribute_schema = SGMapperLTC_AttributeSchema()
sg_mapper_ltc_attribute_list_schema = SGMapperLTC_AttributeSchema(many=True)

class SGMapperSR_VulnerabilitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SG_Vulnerability_SR_Mapping
sg_mapper_sr_vulnerability_schema = SGMapperSR_VulnerabilitySchema()
sg_mapper_sr_vulnerability_list_schema = SGMapperSR_VulnerabilitySchema(many=True)

#create the operation to get the relative data
class SGDBOperator(object):
    def get_sg_actor_brief(self,sg_actor_id):
        actor_list = []
        if sg_actor_id == 'all':
            #fetch all the secenario information
            actor_list = db.session.query(SG_Actor).all()
        else:
            #check whether the scenario_id exist and then return
            actor_list = db.session.query(SG_Actor).filter(SG_Actor.actor_id==sg_actor_id).all()
        #if don't request detail information, then return the results
        #otherwise, begin to get more detail about each scenario
        result = {}
        result['sg_actor_no'] = len(actor_list)

        if len(actor_list) > 0:
            json_result = sg_actor_list_schema.dump(actor_list)
            result['data'] = json_result

        return result
    
    def get_sg_logical_reference_brief(self,logical_reference_id):
        data_list = []
        if logical_reference_id == 'all':
            #fetch all the relative information
            data_list = db.session.query(SG_Logical_Reference).all()
        else:
            #check whether the relative exist and then return
            data_list = db.session.query(SG_Logical_Reference).filter(SG_Logical_Reference.logical_reference_id==logical_reference_id).all()
        #if don't request detail information, then return the results
        result = {}
        result['sg_lr_no'] = len(data_list)

        if len(data_list) > 0:
            result['sg_lr_data'] = sg_logical_reference_list_schema.dump(data_list)
        return result

    def get_sg_LRC_detail(self):
        #get all the logical category
        logical_reference_category_list = db.session.query(SG_Logical_Reference_Category).all()
        #create the dict
        lrc_dict = {}
        for lrc in logical_reference_category_list:
            lrc_dict[lrc.logical_category_id]=sg_logical_reference_category_schema.dump(lrc)
            lrc_dict[lrc.logical_category_id]['lrs']=[]

        #get all relative reference
        lr_list = db.session.query(SG_Logical_Reference).all()
        lr_dict = {}
        for lr in lr_list:
            if lr.logical_reference_id not in lr_dict.keys():
                lr_dict[lr.logical_reference_id] = {}
            lr_dict[lr.logical_reference_id] = sg_logical_reference_schema.dump(lr)

            lr_category_list = lr.logical_category_list.split(',')
            for lrc_id in lr_category_list:
                if lrc_id not in lrc_dict.keys():
                    logging.error('Error:LRC ID is missing')
                else:
                    if lr.logical_reference_id not in lrc_dict[lrc_id]['lrs']:
                        lrc_dict[lrc_id]['lrs'].append(lr.logical_reference_id)

        #get all the security requirement
        security_requirement_list = db.session.query(SG_Security_Requirement).all()
        #create the dict
        security_requirement_dict = {}
        for security_requirement in security_requirement_list:
            security_requirement_dict[security_requirement.sr_id] = sg_security_requirement_schema.dump(security_requirement)

        #get all the vulnerability
        vulnerability_list = db.session.query(SG_Vulnerability).all()
        #create the dict
        vulnerability_dict = {}
        for vulnerability in vulnerability_list:
            vulnerability_dict[vulnerability.vulnerability_id] = sg_vulnerability_schema.dump(vulnerability)

        #get all the attribute
        attribute_list = db.session.query(SG_Attribute).all()
        attribute_dict = {}
        for attribute in attribute_list:
            attribute_dict[attribute.attribute_id] = sg_attribute_schema.dump(attribute)

        #get all the security requirement & LRC mapping
        security_requirement_LRC_mappers = db.session.query(SG_SR_LIC_Mapping).all()
        sg_lrc_sr_mapper = {}
        for security_requirement_lrc_mapper in security_requirement_LRC_mappers:
            sg_lrc_id = security_requirement_lrc_mapper.logical_reference_category_id
            security_requirement_id = security_requirement_lrc_mapper.security_requirement_id
            allocation_level = security_requirement_lrc_mapper.allocation_level
            if sg_lrc_id not in sg_lrc_sr_mapper.keys():
                sg_lrc_sr_mapper[sg_lrc_id]={}
            if security_requirement_id in sg_lrc_sr_mapper[sg_lrc_id].keys():
                logging.warning(f'Security Requirement ID {security_requirement_id} for logical inference category {sg_lrc_id} already exist')
            sg_lrc_sr_mapper[sg_lrc_id][security_requirement_id]=allocation_level

        #get all the attribute & LRC mapping
        attribute_LRC_mappers = db.session.query(SG_Attribute_LIC_Mapping).all()
        sg_lrc_attribute_mapper = {}
        for mapper in attribute_LRC_mappers:
            attribute_id = mapper.attribute_id
            if mapper.logical_reference_category_list is None:
                logging.warning(f'Logical Reference Category is None for Attribute {attribute_id}')
                continue
            
            sg_lrc_list = mapper.logical_reference_category_list.split(',')
            for sg_lrc_id in sg_lrc_list:
                if sg_lrc_id not in sg_lrc_attribute_mapper.keys():
                    sg_lrc_attribute_mapper[sg_lrc_id]=[]
                if attribute_id not in sg_lrc_attribute_mapper[sg_lrc_id]:
                    sg_lrc_attribute_mapper[sg_lrc_id].append(attribute_id)

        #get all the security requirement vulnerability mapping
        security_requirement_vulnerability_mappers = db.session.query(SG_Vulnerability_SR_Mapping).all()
        sg_sr_vulnerability_mapper = {}
        for mapper in security_requirement_vulnerability_mappers:
            vulnerability_id = mapper.vulnerability_id
            if mapper.security_requirement_list is None:
                logging.warning(f'Security Requirements for Vulnerability {vulnerability_id} is None')
                continue
            security_requirement_list = mapper.security_requirement_list.split(',')
            for security_requirement_id in security_requirement_list:
                if security_requirement_id not in sg_sr_vulnerability_mapper.keys():
                    sg_sr_vulnerability_mapper[security_requirement_id]=[]
                if vulnerability_id not in sg_sr_vulnerability_mapper[security_requirement_id]:
                    sg_sr_vulnerability_mapper[security_requirement_id].append(vulnerability_id)
            
        result = {}
        result['LRC'] = lrc_dict
        result['LRC_SR'] = sg_lrc_sr_mapper
        result['LRC_Attribute'] = sg_lrc_attribute_mapper
        result['SR_Vulnerability'] = sg_sr_vulnerability_mapper
        result['LR'] = lr_dict
        result['SR'] = security_requirement_dict
        result['Attribute'] = attribute_dict
        result['Vulnerability'] = vulnerability_dict
        return result

    def get_sg_network(self,is_scretch):
        #get the network stretch firstly
        #get all the actors
        actor_information = self.get_sg_actor_brief('all')
        #get all the logical references & category
        logical_reference_information = self.get_sg_logical_reference_brief('all')
        result = {'is_directed':'N','actor':actor_information,'logical_reference':logical_reference_information}
        return result
        