import csv
from app.db import get_connection

def insert_wellness_data(csv_path):
    conn = get_connection()
    cursor = conn.cursor()

    with open(csv_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            cursor.execute("""
                INSERT INTO Wellness_centres 
                (city, wellness_centre_code, wellness_centre_name,
                 address, doctor_count, category, contact_no,
                 longitude, latitude)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                row['cityName'], 
                row['wellnessCentreCode'],
                row['wellnessCentreName'],
                row['wellnessCentreAddress'],
                int(row['doctorCount']) if row['doctorCount'].isdigit() else 0,
                row['category'],
                row['wellnessCentreContactNo'],
                float(row['longitude']) if row['longitude'] else None,
                float(row['latitude']) if row['latitude'] else None
            ))

    conn.commit()
    conn.close()
    print("Data inserted successfully.")

insert_wellness_data("data/Wellness_centres.csv")
