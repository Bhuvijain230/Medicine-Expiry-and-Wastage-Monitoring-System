from flask import Blueprint, request, jsonify
from ..db import get_connection

search_bp = Blueprint('search', __name__)

@search_bp.route('/search-medicine', methods=['GET'])
def search_medicine():
    name = request.args.get('name')
    manufacturer = request.args.get('manufacturer_name')

    if not name or not manufacturer:
        return jsonify({"error": "Please provide both 'name' and 'manufacturer_name' as query parameters"}), 400

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    
    query = """
        SELECT * FROM medicines 
        WHERE name LIKE %s AND manufacturer_name LIKE %s
    """
    cursor.execute(query, (f"%{name}%", f"%{manufacturer}%"))
    results = cursor.fetchall()

    conn.close()

    return jsonify(results)
