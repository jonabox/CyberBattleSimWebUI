from flask_restful import Resource,reqparse
from flask import jsonify
from config import api,URL_BASE,logging,db

from data_import.excel_data_importer import ExcelDataImporter
from db_operator.op_data_persistent import DataPersistor

def __initial_db__(command):
    #load the data
    importer = ExcelDataImporter()
    data_file_name = 'data/Database.xlsx'
    configuration_file_name = 'data/scenario_config.json'
    data = importer.load_data_from_excel(data_file_name,configuration_file_name)
    data_importer_status = {}
    if data is not None:
        persistor = DataPersistor()
        persistion_status = persistor.persist_data(db,data)
        if persistion_status == 1:
            data_importer_status={'status':1,'message':'fail to store data into database'}
        else:
            data_importer_status={'status':0,'message':'succeed to load the data from excel into database'}
    else:
        data_importer_status={'status':1,'message':'fail to import data from excel'}
    # configuration_file_name = 'data\NESCRO_scenario_excel_config.json'
    return data_importer_status
  
class SystemInitiateResource(Resource):
    def get(self,command):
        #get the name,website
        result = __initial_db__(command)
        return jsonify({'status':200,'data loading status':result})

#register the resource
def __register_system_initiate_resource():
    #    #need to regist this resource to the aggregator
    api.add_resource(SystemInitiateResource, URL_BASE+'/system/<string:command>')
    logging.info("Finish the system maintain api initiation")