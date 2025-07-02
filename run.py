from flask import Flask
from flask_cors import CORS
from app.routes.routes import bp  
from app.routes.crud_routes import crud_bp
from app.routes.search_routes import search_bp
from app.routes.log_routes import log_bp
from app.routes.wellness_routes import wellness_bp
from app.routes.hospital_routes import hospital_bp
from app.routes.auth_routes import auth_bp
from app.routes.donation_routes import donation_bp
from app.routes.notification_routes import notifications_bp
from apscheduler.schedulers.background import BackgroundScheduler
from app.scheduler_jobs import check_expiring_user_medicines
import atexit

from app.notification.mail_send import init_mail

app = Flask(__name__)
CORS(app)
init_mail(app)
app.register_blueprint(bp)
app.register_blueprint(crud_bp)
app.register_blueprint(search_bp)
app.register_blueprint(log_bp)
app.register_blueprint(wellness_bp)
app.register_blueprint(hospital_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(notifications_bp)
app.register_blueprint(donation_bp)

def scheduled_wrapper():
    with app.app_context():
        check_expiring_user_medicines()
        
# Setting up APScheduler
scheduler = BackgroundScheduler()
scheduler.add_job(func=check_expiring_user_medicines, trigger="interval", days=1) 
scheduler.start()

# Shutdown scheduler when app stops
atexit.register(lambda: scheduler.shutdown())

if __name__ == '__main__':
    app.run(debug=True)
