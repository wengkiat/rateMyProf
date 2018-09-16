# To get the whole app package which contains the port number
from app import app, FLASK_PORT, DEBUG


if __name__ == '__main__':
    app.run(debug=DEBUG, host='0.0.0.0', port=int(FLASK_PORT))
