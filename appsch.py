from flask import Flask
from flask_apscheduler import APScheduler
import sqlite3
from datetime import datetime, timedelta
from work.notification.mail_send import init_mail, send_email

class Config:
    SCHEDULER_API_ENABLED = True

app = Flask(__name__)
app.config.from_object(Config())
init_mail(app)
scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()

DATABASE = 'data.db'

def get_expiring_users():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    today = datetime.today().date()
    ten_days_ago = today - timedelta(days=10)

    cursor.execute('''
        SELECT email_id, expiry_date FROM users
        WHERE expiry_date BETWEEN ? AND ?
    ''', (ten_days_ago, today))

    users = cursor.fetchall()
    conn.close()
    return users

# Scheduled job runs automatically every day
@scheduler.task('cron', id='check_expiry_task', hour=9)
def check_and_notify():
    print("[🔔] Running expiry check at", datetime.now())
    users = get_expiring_users()

    for user in users:
        send_email(user['email_id'])

    print(f"[✅] {len(users)} user(s) notified.")


@app.route('/test-email')
def test_email_check():
    check_and_notify()
    return "✅ Test email check triggered!"

@app.route('/')
def home():
    return "📡 Email scheduler is running..."

if __name__ == '__main__':
    app.run(debug=True)
