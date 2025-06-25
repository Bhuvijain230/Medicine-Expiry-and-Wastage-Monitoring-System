from flask import Blueprint, request, jsonify
from ..db import get_connection


def is_priority_medicine(medicine_name):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM life_saving_drugs WHERE LOWER(name) = LOWER(%s)", (medicine_name,))
    result = cursor.fetchone()
    conn.close()
    return result is not None

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

    updated_results = []
    for row in results:
        row["priority_medicine"] = is_priority_medicine(row["name"])
        updated_results.append(row)

    return jsonify(updated_results)
