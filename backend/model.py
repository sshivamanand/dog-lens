import os
import json
import numpy as np
import tensorflow as tf

from breed_info import get_breed_info

BASE_DIR = os.path.dirname(__file__)

MODEL_PATH = os.path.join(BASE_DIR, "models", "dog_breed_model.keras")
CLASS_NAMES_PATH = os.path.join(BASE_DIR, "models", "class_names.json")

model = tf.keras.models.load_model(MODEL_PATH)

with open(CLASS_NAMES_PATH, "r") as f:
    CLASS_NAMES = json.load(f)

DOG_THRESHOLD = 0.10
CONFIDENCE_THRESHOLD = 0.50


def format_breed_name(raw_label: str) -> str:

    return raw_label.split("-", 1)[-1].replace("_", " ").title()

def predict_breed(processed_image: np.ndarray):
    probs = model.predict(processed_image, verbose=0)[0]

    top_idx = int(np.argmax(probs))
    confidence = float(probs[top_idx])

    if confidence < CONFIDENCE_THRESHOLD:
        return {
            "predicted_breed": None,
            "confidence": confidence,
            "message": "The uploaded image does not appear to be a dog. Please upload a clear dog image.",
            "info": None
        }

    formatted_label = format_breed_name(CLASS_NAMES[top_idx])

    return {
        "predicted_breed": formatted_label,
        "confidence": confidence,
        "message": "Prediction successful",
        "info": get_breed_info(formatted_label)
    }
