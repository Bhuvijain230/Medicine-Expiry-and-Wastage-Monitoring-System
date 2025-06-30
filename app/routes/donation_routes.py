# donation_routes.py
from flask import Blueprint, request, jsonify
from ..db import get_connection

donation_bp = Blueprint('donation', __name__)

@donation_bp.route('/submit-donation', methods=['POST'])
def submit_donation():
    data = request.get_json()

    donor = data.get('donor')
    contact = data.get('contact')
    city = data.get('city')
    centre_type = data.get('centre_type')
    centre_name = data.get('centre_name')
    medicines = data.get('medicines')

    if not all([donor, contact, city, centre_type, centre_name, medicines]):
        return jsonify({'error': 'Missing fields'}), 400

    conn = get_connection()
    cursor = conn.cursor()

    try:
        for med in medicines:
            cursor.execute('''
                INSERT INTO donation_logs 
                (donor_name, contact_info, city, centre_type, centre_name, medicine_name, batch_no, expiry_date, quantity)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            ''', (
                donor,
                contact,
                city,
                centre_type,
                centre_name,
                med['name'],
                med['batch'],
                med['expiry'],
                med['quantity']
            ))

        conn.commit()
        return jsonify({'message': 'Donation recorded successfully'}), 201

    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500

    finally:
        conn.close()
