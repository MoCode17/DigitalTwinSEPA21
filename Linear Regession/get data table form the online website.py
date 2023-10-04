import requests

supabase_url = "https://zjsltiicypuojkmeohpt.supabase.co"
supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpqc2x0aWljeXB1b2prbWVvaHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2MTg3NzYsImV4cCI6MjAwNzE5NDc3Nn0.EcXA6P-5c3yf5LMIVShue98ecQDGntD7OFGvvSwby5s"


def get_data_from_supabase(table_name):
    headers = {
        "apikey": supabase_key,
        "Content-Type": "application/json",
    }

    # request to retrieve data from the specified table
    response = requests.get(f"{supabase_url}/rest/v1/{table_name}", headers=headers)

    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None


table_name = "Reading"
data = get_data_from_supabase(table_name)

if data:
    print(f"Data from {table_name}:")
    print(data)

