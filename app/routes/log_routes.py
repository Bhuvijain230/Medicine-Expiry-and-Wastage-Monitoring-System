from flask import Blueprint, request, jsonify
from app.db import get_connection

log_bp = Blueprint('log_routes', __name__)

@log_bp.route('/log-medicine', methods=['POST'])
def log_medicine():
    data = request.get_json()

    required_fields = ['medicine_name', 'manufacturer_name', 'mfg_date', 'expiry_date','user_id']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor()
        query = """
        INSERT INTO user_medicine_logs (medicine_name, manufacturer_name, mfg_date, expiry_date, notes,user_id)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        values = (
            data['medicine_name'],
            data['manufacturer_name'],
            data['mfg_date'],  # format: YYYY-MM-DD
            data['expiry_date'],
            data.get('notes', '') ,
            data['user_id'] 
        )
        cursor.execute(query, values)
        conn.commit()
        conn.close()

        return jsonify({'message': 'Medicine log added successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@log_bp.route('/user-logged-medicines/<int:user_id>', methods=['GET'])
def get_user_logged_medicines(user_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT * FROM user_medicine_logs
        WHERE user_id = %s
    """, (user_id,))
    
    logs = cursor.fetchall()
    conn.close()

    if logs:
        return jsonify(logs), 200
    else:
        return jsonify({"message": "No logs found for this user"}), 404

