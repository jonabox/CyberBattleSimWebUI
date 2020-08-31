#storage the data into the database

from config import db,logging

class DataPersistor(object):
    #db: database session
    #data: data needed to be put into the database
    def persist_data(self,db,data):
        try:
            #remove duplicated data?
            for instance_name, instance_list in data.items():
                db.session.add_all(instance_list)
            
            try:
                db.session.commit()
                return 0
            except Exception as inst:
                db.session.rollback()
                db.session.remove()
                logging.error(f"DB error:fail to storage:{str(inst)}")
        except Exception as inst2:
            logging.error(f"DB error:fail to storage:{str(inst2)}")
        return 1



        