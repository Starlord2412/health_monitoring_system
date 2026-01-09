import time
import pickle
import firebase_admin
from firebase_admin import credentials, db

# 1) Firebase Admin init
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    "databaseURL": "https://fir-signup-login-logout-28864-default-rtdb.firebaseio.com" 
})  

# 2) Path jahan se data lena hai
REF_PATH = "patients"   # ✅ sirf users node

def fetch_and_pickle():
    ref = db.reference(REF_PATH)
    data = ref.get()           # yahan pura /users ka JSON aa jayega
    ts = int(time.time())
    filename = f"users_{ts}.pkl"
    with open(filename, "wb") as f:
        pickle.dump(data, f)
    print(f"Saved {filename}")

if __name__ == "__main__":
    while True:
        fetch_and_pickle()
        time.sleep(30)  # har 30 sec me /users ka snapshot


