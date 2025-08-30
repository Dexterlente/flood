import os

import sqlite3
import pandas as pd

os.chdir("/home/dexter/flood/floodbe")
# 1. Load your CSV into a pandas DataFrame
csv_file = "flood.csv" 
df = pd.read_csv(csv_file)

# 2. Create/connect to an SQLite database file
db_file = "flood.db"     # output SQLite database
conn = sqlite3.connect(db_file)

# 3. Write DataFrame to SQLite as a new table
table_name = "mytable"    # name of the table in SQLite
df.to_sql(table_name, conn, if_exists="replace", index=False)

# 4. Close the connection
conn.close()

print(f"CSV '{csv_file}' has been imported into SQLite '{db_file}' as table '{table_name}'.")
