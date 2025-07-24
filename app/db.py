import mysql.connector
import os

def get_connection():
    # Fallback to localhost for local development
    return mysql.connector.connect(
        host=os.environ.get("DB_HOST", "localhost"),
        user=os.environ.get("DB_USER", "root"),
        password=os.environ.get("DB_PASSWORD", "student"),
        database=os.environ.get("DB_NAME", "medicine_db"),
        port=int(os.environ.get("DB_PORT", 3306))
    )
