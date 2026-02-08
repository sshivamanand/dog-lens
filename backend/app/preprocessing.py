from PIL import Image
import numpy as np
import tensorflow as tf
import io

IMG_SIZE = (224, 224)

def preprocess_image(image_bytes: bytes) -> np.ndarray:

    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize(IMG_SIZE)
    image_array = np.array(image, dtype=np.float32)
    image_array = np.expand_dims(image_array, axis=0)
    image_array = tf.keras.applications.efficientnet.preprocess_input(image_array)

    return image_array
