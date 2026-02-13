# DogLens

**Dog Breed Classification using Deep Learning**

DogLens is a full-stack machine learning web application that predicts the breed of a dog from an uploaded image. It uses a deep learning model trained on a large dog breed dataset and provides a clean, interactive user experience with real-time predictions.

[Live Demo](https://dog-lens.vercel.app/)
[Backend API](https://dog-lens.onrender.com)

---

## Features

- **Upload an image** to identify the dog breed
- **Deep learning model** (EfficientNet-based) for image classification
- **Confidence score** for predictions
- **Graceful handling** of non-dog / low-confidence images
- **Short, readable information** about each predicted breed
- **Fast inference** via a deployed backend API
- **Fully deployed** frontend and backend

---

## Model Details

| Feature | Details |
|---------|---------|
| **Architecture** | EfficientNet (Transfer Learning) |
| **Framework** | TensorFlow / Keras |
| **Input Size** | 224 × 224 RGB images |
| **Number of Classes** | 120 dog breeds |

### Preprocessing Steps
- Resize image to 224×224
- Normalize pixel values
- Apply EfficientNet preprocessing

### Confidence Handling
- Low-confidence predictions are flagged as "not likely a dog"

---

## Tech Stack

### Frontend
- **React** (Vite)
- **Tailwind CSS**
- **Framer Motion**
- **Deployed on**: Vercel

### Backend
- **FastAPI**
- **TensorFlow / Keras**
- **Docker**
- **Deployed on**: Render

---

## Performance Metrics

| Metric | Value |
|------|------|
| Dataset Size | 20,000+ labeled dog images |
| Number of Classes | 120 breeds |
| Inference Latency | <100ms per image (CPU) |
| Input Resolution | 224 × 224 |
| Model Type | EfficientNetB0 Transfer Learning |
| Deployment | FastAPI (Render) + React (Vercel) |

The model is optimized for real-time inference and production deployment using FastAPI.

---

## 📁 Project Structure

```
DogLens/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── .env
│
├── backend/
│   ├── app.py
│   ├── model.py
│   ├── preprocessing.py
│   ├── schemas.py
│   ├── breed_info.json
│   ├── models/
│   │   ├── dog_breed_model.keras
│   │   └── class_names.json
│   ├── requirements.txt
│   └── Dockerfile
│
└── README.md
```

---

## 🚀 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sshivamanand/dog-lens.git
cd dog-lens
```

### 2. Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload
```

Backend runs at: `http://localhost:8000`

### 3. Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

### 4. Environment Variables

**Frontend (`.env`):**
```env
VITE_API_BASE_URL=http://localhost:8000
```

**Backend (`.env`):**
```env
FRONTEND_URL=http://localhost:5173
```

---

## 📡 API Endpoint

### `POST /predict`

**Request:**
- Content-Type: `multipart/form-data`
- Field name: `file` (image)

**Response:**
```json
{
  "predicted_breed": "Golden Retriever",
  "confidence": 0.82,
  "message": "Prediction successful",
  "info": [
    "Friendly and intelligent",
    "Great family dogs",
    "Require regular exercise",
    "Known for their gentle nature 🐶"
  ]
}
```

---

## Acknowledgments

- EfficientNet architecture by Google
- Stanford Dogs Dataset
- FastAPI framework
- React and Vite 

---

