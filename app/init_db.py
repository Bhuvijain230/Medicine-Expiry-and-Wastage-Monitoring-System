import sqlite3

def create_db():
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email_id TEXT NOT NULL,
            phone_no TEXT,
            expiry_date DATE
        )
    ''')

    # Sample data
    cursor.execute('''
        INSERT INTO users (email_id, phone_no, expiry_date)
        VALUES ('test@example.com', '1234567890', date('now', '-5 days'))
    ''')

    conn.commit()
    conn.close()
    print("Database initialized with sample data.")

if __name__ == "__main__":
    create_db()
