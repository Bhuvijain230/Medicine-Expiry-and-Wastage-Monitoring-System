from flask import Blueprint, request, jsonify
from ..db import get_connection

hospital_bp = Blueprint('hospital', __name__)

@hospital_bp.route('/get-hospitals', methods=['GET'])
def hospitalsByCity():
    city = request.args.get('city')

    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT hospital_name, hospital_address
        FROM cghs_hospitals
        WHERE LOWER(city_name) = LOWER(%s)
    """
    cursor.execute(query, (city,))
    results = cursor.fetchall()

    conn.close()

    if not results:
        return jsonify({"message": "No hospitals found for this city"}), 404

    return jsonify(results)
