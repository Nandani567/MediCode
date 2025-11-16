from fastapi import FastAPI
from pydantic import BaseModel
import base64
import cv2
import numpy as np
import easyocr
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class OCRRequest(BaseModel):
    image: str  


reader = easyocr.Reader(['en'])

@app.post("/ocr")
async def perform_ocr(data: OCRRequest):
    try:
     
        image_data = base64.b64decode(data.image)
        nparr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        
        result = reader.readtext(img)
        text = " ".join([res[1] for res in result])

        return {"text": text}
    except Exception as e:
        return {"text": "", "error": str(e)}
