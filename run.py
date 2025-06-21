from flask import Flask
from app.routes.routes import bp  
from app.routes.crud_routes import crud_bp


app = Flask(__name__)
app.register_blueprint(bp)
app.register_blueprint(crud_bp)

if __name__ == '__main__':
    app.run(debug=True)
