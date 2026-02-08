import json
import os

BASE_DIR = os.path.dirname(__file__)
BREED_INFO_PATH = os.path.join(BASE_DIR, "breed_info.json")

with open(BREED_INFO_PATH, "r") as f:
    BREED_INFO = json.load(f)

def get_breed_info(breed_name: str):
    return BREED_INFO.get(breed_name)
