from datetime import datetime, timedelta
from app.db import get_connection

def check_expiring_user_medicines():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    today = datetime.today().date()
    upcoming = today + timedelta(days=30)  

    cursor.execute("""
        SELECT * FROM user_medicine_logs 
        WHERE expiry_date BETWEEN %s AND %s
    """, (today, upcoming))

    results = cursor.fetchall()
    conn.close()

    print(f"[SCHEDULED CHECK] User medicines expiring within 30 days:")
    for med in results:
        print(med)
