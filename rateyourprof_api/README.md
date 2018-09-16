# Rate Your Profs

Installation
------------

After cloning, create a virtual environment and install the requirements. For Linux and Mac users:

    $ python3 -m venv venv
    $ source venv/bin/activate
    (venv) $ pip install -r requirements.txt

If you are on Windows, then use the following commands instead:

    $ python3 -m venv venv
    $ venv\Scripts\activate
    (venv) $ pip install -r requirements.txt

Running
-------

To run the server use the following command:

    (venv) $ python api.py
     * Running on http://127.0.0.1:FLASK_PORT/
     * Restarting with reloader

Then from a different terminal window you can send requests.

Dependencies
-------

To update dependencies if you have used new libraries not in the requirements.txt file

    (venv) $ pip freeze > requirements.txt

Database
-------

To set up connection to external database

    change this variable in .env
    DATABASE_URL="postgresql://username:password@serverurl:port/database"

Updating database schema
-------

To change the database schema, please access apiserver/app/models.py

    change the schema in apiserver/app/models.py file
    export FLASK_APP=api.py                                             // to tell flask where the app is
    flask db migrate -m "message for telling people what you change"    // to commit the changes in the schema (commit one new table at a time)
    flask db upgrade                                                    // to update the database based on the updated schema

Proxy port for server
-------

To set up a specific port to proxy, if left blank, it will default to port 4000

    change this variable in .env
    FLASK_PORT=4000

Debug mode
-------

Set it to False if it is set to run for production, if left blank, it will default to true where the debugger will be active

    change this variable in .env
    DEBUG=False

Set the location for the logfiles for the server
-------

To set up a specific path to store the log file, if left blank, it will default to be stored as in apiserver as smartclaims.log

    change this variable in .env
    LOG_PATH = "/Path/you/want/filename"

Testing
-------

To set up credentials for test

    change these variables in .env
    TEST_PASSWORD="test"
    TEST_USERNAME="test"

To run pytest

    python -m pytest

Will run all tests. Remember to set necessary environment variables such as DATABASE_URL (see above).


Manual testing
-------
    refer to api documentation at TBD

To run curl calls

    $ curl -H "Content-Type: application/json" -X POST   -d '{"username":"username","password":"password"}' http://localhost:FLASK_PORT/login
    #upon success, get an access token valid for a period of time
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwianRpIjoiZjhmNDlmMjUtNTQ4OS00NmRjLTkyOWUtZTU2Y2QxOGZhNzRlIiwidXNlcl9jbGFpbXMiOnt9LCJuYmYiOjE0NzQ0NzQ3OTEsImlhdCI6MTQ3NDQ3NDc5MSwiaWRlbnRpdHkiOiJ0ZXN0IiwiZXhwIjoxNDc0NDc1NjkxLCJ0eXBlIjoiYWNjZXNzIn0.vCy0Sec61i9prcGIRRCbG8e9NV6_wFH2ICFgUGCLKpc"
    }

    #export the token as a env variable to use
    $ export ACCESS="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwianRpIjoiZjhmNDlmMjUtNTQ4OS00NmRjLTkyOWUtZTU2Y2QxOGZhNzRlIiwidXNlcl9jbGFpbXMiOnt9LCJuYmYiOjE0NzQ0NzQ3OTEsImlhdCI6MTQ3NDQ3NDc5MSwiaWRlbnRpdHkiOiJ0ZXN0IiwiZXhwIjoxNDc0NDc1NjkxLCJ0eXBlIjoiYWNjZXNzIn0.vCy0Sec61i9prcGIRRCbG8e9NV6_wFH2ICFgUGCLKpc"

    #curl to the endpoint that requires credentials
    $ curl -H "Authorization: Bearer $ACCESS" http://localhost:FLASK_PORT/predictions/disputeid
