from flask import Blueprint, jsonify, current_app
from datetime import datetime, timedelta
from app.db import get_connection
from app.notification.mail_send import send_email
from app.notification.sms_send import send_sms

notifications_bp = Blueprint('notifications', __name__)

def get_expiring_users():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    query = '''
        SELECT u.email, u.phone_number, l.expiry_date, l.medicine_name
        FROM user_profiles u
        JOIN user_medicine_logs l ON u.id = l.user_id
        WHERE l.expiry_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 10 DAY)
    '''
    cursor.execute(query)
    users = cursor.fetchall()
    cursor.close()
    conn.close()
    return users

@notifications_bp.route('/check_expiry', methods=['GET'])
def manual_check_and_notify():
    users = get_expiring_users()
    with current_app.app_context():
        for user in users:
            message = f"Reminder: Your medicine '{user['medicine_name']}' is expiring on {user['expiry_date']}."
            send_email(user['email'], "Medicine Expiry Alert", message)
            send_sms(user['phone_number'], message)
    return jsonify({"message": f"{len(users)} user(s) notified."}), 200

# Function to be scheduled
def check_expiring_user_medicines():
    print("Running scheduled expiry check at", datetime.now())
    users = get_expiring_users()
    with current_app.app_context():
        for user in users:
            message = f"Reminder: Your medicine '{user['medicine_name']}' is expiring on {user['expiry_date']}."
            send_email(user['email'], "Medicine Expiry Alert", message)
            send_sms(user['phone_number'], message)
    print(f"{len(users)} user(s) notified.")
