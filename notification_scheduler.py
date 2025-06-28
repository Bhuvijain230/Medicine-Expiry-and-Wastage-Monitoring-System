from flask import Flask
from flask_apscheduler import APScheduler
from datetime import datetime, timedelta
from app.db import get_connection
from app.notification.mail_send import init_mail, send_email
from app.notification.sms_send import send_sms

class Config:
    SCHEDULER_API_ENABLED = True

app = Flask(__name__)
app.config.from_object(Config())
init_mail(app)

scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()

def get_expiring_users():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    query = '''
        SELECT u.email, u.phone_number, l.expiry_date
        FROM user_profiles u
        JOIN user_medicine_logs l ON u.id = l.user_id
        WHERE l.expiry_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 10 DAY)
    '''
    cursor.execute(query)
    users = cursor.fetchall()
    conn.close()
    return users

@scheduler.task('interval', id='check_expiry_task', seconds=60)

def check_and_notify():
    print("Scheduled task running at", datetime.now())
    users = get_expiring_users()
    for user in users:
        send_email(user['email'])
        send_sms(user['phone_number'])
    print(f"{len(users)} user(s) notified.")

@app.route('/')
def home():
    return "Scheduler is running."

if __name__ == '__main__':
    app.run(debug=True)
