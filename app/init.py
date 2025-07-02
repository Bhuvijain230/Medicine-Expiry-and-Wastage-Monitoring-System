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

    from app.routes.wellness_routes import wellness_bp
    app.register_blueprint(wellness_bp)

    from app.routes.hospital_routes import hospital_bp
    app.register_blueprint(hospital_bp)

    from app.routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp)

    from app.routes.donation_routes import donation_bp
    app.register_blueprint(donation_bp)





    return app

