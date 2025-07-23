from flask import Flask, send_from_directory
from flask_cors import CORS
import os
import atexit
from dotenv import load_dotenv
load_dotenv()
from app.routes.routes import bp  
from app.routes.crud_routes import crud_bp
from app.routes.search_routes import search_bp
from app.routes.log_routes import log_bp
from app.routes.wellness_routes import wellness_bp
from app.routes.hospital_routes import hospital_bp
from app.routes.auth_routes import auth_bp
from app.routes.donation_routes import donation_bp
from app.routes.notification_routes import notifications_bp
from app.notification.mail_send import init_mail

from apscheduler.schedulers.background import BackgroundScheduler
from app.scheduler_jobs import check_expiring_user_medicines

# -------- Flask App Setup --------
app = Flask(__name__, static_folder="frontend-folder/build", static_url_path="/")
CORS(app)
init_mail(app)

# -------- Register Blueprints --------
app.register_blueprint(bp)
app.register_blueprint(crud_bp)
app.register_blueprint(search_bp)
app.register_blueprint(log_bp)
app.register_blueprint(wellness_bp)
app.register_blueprint(hospital_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(notifications_bp)
app.register_blueprint(donation_bp)

# -------- Scheduler --------
def scheduled_wrapper():
    with app.app_context():
        check_expiring_user_medicines()

scheduler = BackgroundScheduler()
scheduler.add_job(func=check_expiring_user_medicines, trigger="interval", days=1)
scheduler.start()
atexit.register(lambda: scheduler.shutdown())

# -------- Serve React Frontend --------
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    file_path = os.path.join(app.static_folder, path)
    if path != "" and os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host='0.0.0.0', port=port)

app = app