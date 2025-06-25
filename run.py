from flask import Flask
from app.routes.routes import bp  
from app.routes.crud_routes import crud_bp
from app.routes.search_routes import search_bp
from app.routes.log_routes import log_bp

from apscheduler.schedulers.background import BackgroundScheduler
from app.scheduler_jobs import check_expiring_user_medicines
import atexit

app = Flask(__name__)
app.register_blueprint(bp)
app.register_blueprint(crud_bp)
app.register_blueprint(search_bp)
app.register_blueprint(log_bp)

# Setup APScheduler
scheduler = BackgroundScheduler()
scheduler.add_job(func=check_expiring_user_medicines, trigger="interval", seconds=30) 
scheduler.start()

# Shutdown scheduler when app stops
atexit.register(lambda: scheduler.shutdown())

if __name__ == '__main__':
    app.run(debug=True)
