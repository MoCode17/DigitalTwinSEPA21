import psycopg
from psycopg.rows import dict_row

def get_db_connection():
    conn = psycopg.connect(
            host="db.zjsltiicypuojkmeohpt.supabase.co",
            dbname="postgres",
            user="postgres",
            password="ILIeVWFPBWNQlczp")
    return conn

def getResults(sql):
    conn = get_db_connection()
    cur = conn.cursor(row_factory=dict_row)
    cur.execute(sql)
    results = cur.fetchall()
    cur.close()
    conn.close()
    return results