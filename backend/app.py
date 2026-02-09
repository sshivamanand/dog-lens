from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from preprocessing import preprocess_image
from model import predict_breed
from schemas import PredictionResponse
from dotenv import load_dotenv
import os

app = FastAPI(title="DogLens API")
load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health():
    return {"status": "DogLens backend running"}

@app.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be an image")

    try:
        image_bytes = await file.read()
        processed_image = preprocess_image(image_bytes)
        prediction = predict_breed(processed_image)
        return prediction

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
