import os
import sqlite3
import pandas as pd

# Set working directory
os.chdir("/home/dexter/flood/floodbe")

csv_file = "flood.csv"

# Read CSV, skip the first row
df = pd.read_csv(csv_file, skiprows=1)  # skips the "Total Projects..." line

# Check the columns
print("Columns detected:", df.columns.tolist())
print("Number of columns:", len(df.columns))
print("First 5 rows:")
print(df.head())

# Connect to SQLite
db_file = "flood.db"
conn = sqlite3.connect(db_file)

# Write DataFrame to SQLite
table_name = "mytable"
df.to_sql(table_name, conn, if_exists="replace", index=False)
print(f"Exported {df.shape[0]} rows and {df.shape[1]} columns to table '{table_name}' in '{db_file}'.")

# Optional: verify by reading back
df_check = pd.read_sql(f"SELECT * FROM {table_name} LIMIT 5", conn)
print("Preview from SQLite table:")
print(df_check)

conn.close()
