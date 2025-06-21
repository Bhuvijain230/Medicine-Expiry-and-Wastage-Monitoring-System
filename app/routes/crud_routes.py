from flask import Blueprint, request, jsonify
from ..db import get_connection

crud_bp = Blueprint('crud_routes', __name__)

#POST 
@crud_bp.route('/add-medicine', methods=['POST'])
def add_medicine():
    data = request.get_json()

    conn = get_connection()
    cursor = conn.cursor()
    query = """
        INSERT INTO medicines (id, name, price, is_discontinued, manufacturer_name, type, pack_size_label, short_composition1, short_composition2)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    values = (
        data['id'],
        data['name'],
        data['price'],
        data['is_discontinued'],
        data['manufacturer_name'],
        data['type'],
        data['pack_size_label'],
        data['short_composition1'],
        data['short_composition2']
    )
    cursor.execute(query, values)
    conn.commit()
    conn.close()
    return jsonify({'message': 'Medicine added successfully'}), 201

#PUT
@crud_bp.route('/update-medicine/<int:medicine_id>', methods=['PUT'])
def update_medicine(medicine_id):
    data = request.get_json()

    conn = get_connection()
    cursor = conn.cursor()

    query = """
    UPDATE medicines
    SET name = %s,
        price = %s,
        is_discontinued = %s,
        manufacturer_name = %s,
        type = %s,
        pack_size_label = %s,
        short_composition1 = %s,
        short_composition2 = %s
    WHERE id = %s
    """

    values = (
        data['name'],
        data['price'],
        data['is_discontinued'],
        data['manufacturer_name'],
        data['type'],
        data['pack_size_label'],
        data['short_composition1'],
        data['short_composition2'],
        medicine_id
    )

    cursor.execute(query, values)
    conn.commit()
    conn.close()

    return jsonify({'message': 'Medicine updated successfully'}), 200

#DELETE
@crud_bp.route('/delete-medicine/<int:medicine_id>', methods=['DELETE'])
def delete_medicine(medicine_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM medicines WHERE id = %s", (medicine_id,))
    conn.commit()
    conn.close()

    return jsonify({'message': f'Medicine with ID {medicine_id} deleted successfully'}), 200
