
#code to create pkl

# import os
# import time
# import pickle
# import firebase_admin
# from firebase_admin import credentials, db

# # 1) Firebase Admin init
# cred = credentials.Certificate("serviceAccountKey.json")
# firebase_admin.initialize_app(cred, {
#     "databaseURL": "https://fir-signup-login-logout-28864-default-rtdb.firebaseio.com"
# })

# REF_PATH = "patients"   # node jahan se data lena hai
# PICKLE_FILE = "all_snapshots.pkl"   # single file

# # agar file pehle se exist hai to uska data load karlo
# if os.path.exists(PICKLE_FILE):
#     with open(PICKLE_FILE, "rb") as f:
#         snapshots = pickle.load(f)   # list of snapshots
#     print(f"Loaded existing snapshots ({len(snapshots)}) from {PICKLE_FILE}")
# else:
#     snapshots = []   # empty list, pehli baar se start

# def fetch_and_append():
#     ref = db.reference(REF_PATH)
#     data = ref.get()
#     ts = int(time.time())

#     snapshot = {
#         "timestamp": ts,
#         "patients": data
#     }

#     snapshots.append(snapshot)
#     print(f"Added snapshot #{len(snapshots)} at {ts}")

#     # har baar pura list ek hi file me overwrite kar rahe hain
#     with open(PICKLE_FILE, "wb") as f:
#         pickle.dump(snapshots, f)
#     print(f"Saved {len(snapshots)} snapshots into {PICKLE_FILE}")

# if __name__ == "__main__":
#     while True:
#         fetch_and_append()
#         time.sleep(30)   # har 30 sec new snapshot, same file me




# import os
# import time
# import pickle
# import firebase_admin
# from firebase_admin import credentials, db

# # 1) Firebase Admin init
# cred = credentials.Certificate("serviceAccountKey.json")
# firebase_admin.initialize_app(cred, {
#     "databaseURL": "https://fir-signup-login-logout-28864-default-rtdb.firebaseio.com"
# })

# REF_PATH = "patients"

# # 2) Folder jahan file save karni hai
# OUTPUT_DIR = "../data"   # 👉 change this path as you like
# os.makedirs(OUTPUT_DIR, exist_ok=True)  # folder bana dega agar nahi hai

# # single pickle file ka full path
# PICKLE_FILE = os.path.join(OUTPUT_DIR, "all_snapshots.pkl")

# # agar file pehle se hai to load
# if os.path.exists(PICKLE_FILE):
#     with open(PICKLE_FILE, "rb") as f:
#         snapshots = pickle.load(f)
#     print(f"Loaded existing snapshots ({len(snapshots)}) from {PICKLE_FILE}")
# else:
#     snapshots = []

# def fetch_and_append():
#     ref = db.reference(REF_PATH)
#     data = ref.get()
#     ts = int(time.time())

#     snapshot = {
#         "timestamp": ts,
#         "patients": data
#     }

#     snapshots.append(snapshot)
#     print(f"Added snapshot #{len(snapshots)} at {ts}")

#     with open(PICKLE_FILE, "wb") as f:
#         pickle.dump(snapshots, f)
#     print(f"Saved {len(snapshots)} snapshots into {PICKLE_FILE}")

# if __name__ == "__main__":
#     while True:
#         fetch_and_append()
#         time.sleep(30)




import os
import time
import pickle
import firebase_admin
from firebase_admin import credentials, db

# Firebase init
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    "databaseURL": "https://fir-signup-login-logout-28864-default-rtdb.firebaseio.com"
})

OUTPUT_DIR = r"C:\path\to\snapshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)
PICKLE_FILE = os.path.join(OUTPUT_DIR, "current_patient_snapshots.pkl")

# load existing snapshots if file exists
if os.path.exists(PICKLE_FILE):
    with open(PICKLE_FILE, "rb") as f:
        snapshots = pickle.load(f)
    print(f"Loaded {len(snapshots)} snapshots from {PICKLE_FILE}")
else:
    snapshots = []

UID_FILE = "current_uid.txt"   # file jisme frontend/other code UID likhega

def get_current_uid():
    if not os.path.exists(UID_FILE):
        print("UID file not found, skipping this cycle.")
        return None
    with open(UID_FILE, "r", encoding="utf-8") as f:
        uid = f.read().strip()
    return uid or None

def fetch_and_append_for_patient():
    patient_uid = get_current_uid()
    if not patient_uid:
        print("No UID set in current_uid.txt, waiting...")
        return

    ref_path = f"patients/{patient_uid}"
    ref = db.reference(ref_path)
    data = ref.get()
    ts = int(time.time())

    snapshot = {
        "timestamp": ts,
        "patientUid": patient_uid,
        "patient": data
    }

    snapshots.append(snapshot)
    print(f"Added snapshot #{len(snapshots)} for {patient_uid}")

    with open(PICKLE_FILE, "wb") as f:
        pickle.dump(snapshots, f)
    print(f"Saved {len(snapshots)} snapshots into {PICKLE_FILE}")

if __name__ == "__main__":
    while True:
        fetch_and_append_for_patient()
        time.sleep(30)
