from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from ..db import get_connection

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    phone = data.get('phone_number')
    password = data.get('password')

    if not all([username, email, phone, password]):
        return jsonify({"error": "All fields are required"}), 400

    password_hash = generate_password_hash(password)

    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO user_profiles (username, email, phone_number, password_hash)
            VALUES (%s, %s, %s, %s)
        """, (username, email, phone, password_hash))
        conn.commit()
        return jsonify({
    "message": "User registered successfully",
    "user": {
        "username": username,
        "email": email,
        "phone": phone
    }
}), 201

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM user_profiles WHERE email = %s", (email,))
    user = cursor.fetchone()
    conn.close()

    if user and check_password_hash(user['password_hash'], password):
        return jsonify({"message": "Login successful", "user": {
            "id": user["id"],
            "username": user["username"],
            "email": user["email"],
            "phone": user["phone_number"]
        }}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401
