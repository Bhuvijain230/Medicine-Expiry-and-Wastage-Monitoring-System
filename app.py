from flask import Flask
import sqlite3
from datetime import datetime, timedelta
from work.notification.mail_send import init_mail, send_email
from work.notification.sms_send import send_sms

app = Flask(__name__)
init_mail(app)

DATABASE = 'data.db'

def get_expiring_users():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    today = datetime.today().date()
    ten_days_ago = today - timedelta(days=10)

    cursor.execute('''
        SELECT email_id, phone_no, expiry_date FROM users
        WHERE expiry_date BETWEEN ? AND ?
    ''', (ten_days_ago, today))

    users = cursor.fetchall()
    conn.close()
    return users

@app.route('/check_expiry')
def check_and_notify():
    users = get_expiring_users()

    for user in users:
        send_email(user['email_id'])
        send_sms(user['phone_no'])

    return f"{len(users)} user(s) notified via email and SMS.", 200

if __name__ == '__main__':
    app.run(debug=True)
