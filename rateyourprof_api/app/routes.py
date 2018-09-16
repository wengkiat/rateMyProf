from app import app


# default landing page
@app.route('/')
@app.route('/index')
def index():
    return "Hello World"
