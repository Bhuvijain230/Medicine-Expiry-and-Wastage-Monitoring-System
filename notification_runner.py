from flask import Flask
from app.db import get_connection  
from app.notification.mail_send import init_mail, send_email
from app.notification.sms_send import send_sms

app = Flask(__name__)
init_mail(app)

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

@app.route('/check_expiry')
def check_and_notify():
    users = get_expiring_users()

    for user in users:
        send_email(user['email'])
        send_sms(user['phone_number'])

    return f"{len(users)} user(s) notified via email and SMS.", 200

if __name__ == '__main__':
    app.run(debug=True)
