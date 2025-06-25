from flask import Blueprint, request, jsonify
from app.db import get_connection

log_bp = Blueprint('log_routes', __name__)

@log_bp.route('/log-medicine', methods=['POST'])
def log_medicine():
    data = request.get_json()

    required_fields = ['medicine_name', 'manufacturer_name', 'mfg_date', 'expiry_date']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor()
        query = """
        INSERT INTO user_medicine_logs (medicine_name, manufacturer_name, mfg_date, expiry_date, notes)
        VALUES (%s, %s, %s, %s, %s)
        """
        values = (
            data['medicine_name'],
            data['manufacturer_name'],
            data['mfg_date'],  # format: YYYY-MM-DD
            data['expiry_date'],
            data.get('notes', '')  
        )
        cursor.execute(query, values)
        conn.commit()
        conn.close()

        return jsonify({'message': 'Medicine log added successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500
