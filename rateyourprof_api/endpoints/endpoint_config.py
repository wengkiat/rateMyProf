"""
Configuration file for endpoints, you can choose to include or exclude enpoints by editing the register_blueprint function
"""

from endpoints.api_input import endpoint_input
from endpoints.api_output import endpoint_output
from endpoints.users import users

def register_blueprints(app):
    """Configuration method to edit endpoints"""
    app.register_blueprint(endpoint_input)
    app.register_blueprint(endpoint_output)
    app.register_blueprint(users)

