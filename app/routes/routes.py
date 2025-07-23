from flask import Blueprint, jsonify
from ..db import get_connection

bp = Blueprint('routes', __name__)


@bp.route('/medicines')
def get_medicines():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM medicines LIMIT 10")
    rows = cursor.fetchall()
    conn.close()
    return jsonify(rows)

@bp.route('/life-saving-drugs')
def get_life_saving_drugs():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM life_saving_drugs LIMIT 5")
    rows = cursor.fetchall()
    conn.close()
    return jsonify(rows)