#!/usr/bin/env bash
#assumes python3 venv already created with
# python3 -m venv venv
#and requirements installed with
# pip install -r requirements.txt
source ./venv/bin/activate
python3 api.py >> ./server.log 2>&1 &
