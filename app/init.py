from flask import Flask

def create_app():
    app = Flask(__name__)
    
    from .routes.routes import bp as routes_bp
    app.register_blueprint(routes_bp)

    from .routes.crud_routes import crud_bp 
    app.register_blueprint(crud_bp)

    from .routes.search_routes import search_bp
    app.register_blueprint(search_bp)

    from .routes.log_routes import log_bp
    app.register_blueprint(log_bp)



    return app

