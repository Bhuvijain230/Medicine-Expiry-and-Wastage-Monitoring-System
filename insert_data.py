import csv
import mysql.connector

# Connect to MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="student",
    database="medicine_db"
)
cursor = conn.cursor()


with open('data/indian_medicine_data.csv', mode='r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    
    for row in reader:
        query = """
        INSERT IGNORE INTO medicines 
        (id, name, price, is_discontinued, manufacturer_name, type, pack_size_label, short_composition1, short_composition2)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            int(row['id']),
            row['name'],
            float(row['price']),
            True if row['Is_discontinued'].strip().upper() == "TRUE" else False,
            row['manufacturer_name'],
            row['type'],
            row['pack_size_label'],
            row['short_composition1'],
            row['short_composition2']
        )
        cursor.execute(query, values)


print("Data inserted successfully!")

#list of life saving drugs
with open('data/life_saving_drugs.csv', mode='r', encoding='utf-8') as file:
    reader = csv.DictReader(file)

    for row in reader:
        query = """
        INSERT INTO life_saving_drugs (medicine_name, type_name)
        VALUES (%s, %s)
        """
        values = (row['medicineName'], row['typeName'])
        cursor.execute(query, values)

print("Life-saving drugs inserted successfully!")


conn.commit()
conn.close()