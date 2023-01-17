
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from diseasesClassification.diseasesClassification import CropDiseaseML
crop_disease_ml = CropDiseaseML()

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
# banana_model = tf.keras.models.load_model('banana.h5')
# potato_model = tf.keras.models.load_model('potato.h5')
# tomato_model = tf.keras.models.load_model('tomato.h5')
# guava_model = tf.keras.models.load_model('guava.h5')
# cauliflower_model = tf.keras.models.load_model('cauliflower.h5')

# model_dict = {
#     'Banana':[banana_model, 224],
#     'Guava':[guava_model, 224],
#     'Cauliflower':[cauliflower_model , 224],
#     'Potato':[potato_model, 224],
#     'Tomato':[tomato_model, 112]   
# }
# class_name_dict = {
#     'Banana':['Cordana leaf spot','Healthy','Pestalotiopsis palmarum','Sigatoka'],
#     'Guava':['Canker','Dot leaf Disease', 'Healthy', 'Mummification','Rust'],
#     'Cauliflower':['Bacterial spot rot','Black Rot','Downy Mildew', 'Healthy'],
#     'Potato':['Early blight','Late blight','Healthy'],
#     'Tomato':['Bacterial spot', 'Early blight', 'Late blight','Leaf Mold', 'Septoria leaf spot',
#         'Spider mites Two spotted spider mite','Target Spot','Yellow Leaf Curl Virus','Mosaic virus','Healthy']
# }

# MODEL = potato_model

CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]

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
    # image = tf.image.resize(image, [224, 224])
    # img_batch = np.expand_dims(image, 0)
    
    # predictions = MODEL.predict(img_batch)

    # predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    # confidence = np.max(predictions[0])
    # return {
    #     'class': predicted_class,
    #     'confidence': float(confidence)
    # }
    return {
        'class': crop_disease_ml.predict(image, crop),
    }

if __name__ == "__main__":
    uvicorn.run(app, host='0.0.0.0', port=8000)