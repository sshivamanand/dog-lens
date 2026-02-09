from pydantic import BaseModel
from typing import Optional, List

class PredictionResponse(BaseModel):
    predicted_breed: Optional[str] = None
    confidence: Optional[float] = None
    message: Optional[str] = None
    info: Optional[List[str]] = None
