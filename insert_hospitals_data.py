import csv
from app.db import get_connection

def insert_hospital_data(csv_path):
    conn = get_connection()
    cursor = conn.cursor()

    with open(csv_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            cursor.execute("""
                INSERT INTO cghs_hospitals (city_name, hospital_name, hospital_address)
                VALUES (%s, %s, %s)
            """, (
                row['city_name'],
                row['hospital_name'],
                row['hospital_address']
            ))

    conn.commit()
    conn.close()
    print("Hospital data inserted successfully.")

insert_hospital_data("data/cghs_hospitals.csv")
