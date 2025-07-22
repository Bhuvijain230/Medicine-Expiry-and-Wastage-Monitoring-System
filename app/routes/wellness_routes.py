from flask import Blueprint, request, jsonify
from ..db import get_connection

wellness_bp = Blueprint('wellness', __name__)

@wellness_bp.route('/wellness-centres', methods=['GET'])
def get_wellness_centres():
    city = request.args.get('city')
    category = request.args.get('category')

    query = "SELECT * FROM wellness_centres WHERE 1=1"
    params = []

    if city:
        query += " AND city = %s"
        params.append(city)

    if category:
        query += " AND category = %s"
        params.append(category)

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(query, params)
    centres = cursor.fetchall()
    conn.close()

    return jsonify(centres)
