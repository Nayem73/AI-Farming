
from fastapi import FastAPI, File, UploadFile, Form, status, Response, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
from ML_deseases.diseasesClassification import CropDiseaseML



crop_disease_ml = CropDiseaseML()

app = FastAPI()

origins = [
    'http://spring-boot-app'
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post("/predict", status_code=status.HTTP_200_OK)
# multiple parameters
async def predict(
    response: Response,file: UploadFile = File(...),  crop: str = Form(...)):
    try:
        image = read_file_as_image(await file.read())
    except Exception as e:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            'massage': str(e)
        }
    disease = crop_disease_ml.predict(image, crop)
    if disease:
        return {
            'class': disease
        }
    else:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            'massage': 'Invalid crop'
        }

if __name__ == "__main__":
    uvicorn.run(app, host='0.0.0.0', port=8000)