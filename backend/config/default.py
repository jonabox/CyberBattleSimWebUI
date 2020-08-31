# -*- coding: utf-8 -*-
"""
Created on Sat Jun  2 00:05:27 2018

@author: keman
"""
SERVER_NAME="localhost:5003"

DEBUG = True
use_reloader=False


SQLALCHEMY_ECHO = False
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_POOL_RECYCLE = 600

#config the selenium environment
# SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:hkm@LOCAL@270@localhost:3308/cams_scenario_db'
SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:jonabox@localhost:3306/cams_scenario_db'
