
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from diseasesClassification.diseasesClassification import CropDiseaseML
crop_disease_ml = CropDiseaseML()
print(f"""
_________________________HSAkash_________________________
    Healthy Crops Prediction API is running
_________________________________________________________
""")

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    '*'
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/ping")
async def ping():
    return "Hello, I am alive"

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post("/predict")
# multiple parameters

async def predict(
    file: UploadFile = File(...)
    , crop: str = Form(...)
):
    image = read_file_as_image(await file.read())
    return {
        'class': crop_disease_ml.predict(image, crop),
    }

if __name__ == "__main__":
    uvicorn.run(app, host='0.0.0.0', port=8000)