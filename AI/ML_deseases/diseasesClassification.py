import tflite_runtime.interpreter as tflite
import numpy as np
from PIL import Image

class CropDiseaseML:
    def __init__(self):
        """
        Load all pre-trained models
        """
        banana_model = tflite.Interpreter('ML_deseases/tfliteModels/banana.tflite')
        potato_model = tflite.Interpreter('ML_deseases/tfliteModels/potato.tflite')
        tomato_model = tflite.Interpreter('ML_deseases/tfliteModels/tomato.tflite')
        guava_model = tflite.Interpreter('ML_deseases/tfliteModels/guava.tflite')
        cauliflower_model = tflite.Interpreter('ML_deseases/tfliteModels/cauliflower.tflite')
        self.model_dict = {
            'Banana':[banana_model, 224],
            'Guava':[guava_model, 224],
            'Cauliflower':[cauliflower_model , 224],
            'Potato':[potato_model, 224],
            'Tomato':[tomato_model, 112]   
        }
        self.get_interpreter_input_output_details()
        
        self.class_name_dict = {
            'Banana':['Cordana leaf spot','Healthy','Pestalotiopsis palmarum','Sigatoka'],
            'Guava':['Canker','Dot leaf Disease', 'Healthy', 'Mummification','Rust'],
            'Cauliflower':['Bacterial spot rot','Black Rot','Downy Mildew', 'Healthy'],
            'Potato':['Early blight','Late blight','Healthy'],
            'Tomato':['Bacterial spot', 'Early blight', 'Late blight','Leaf Mold', 'Septoria leaf spot',
                'Spider mites Two spotted spider mite','Target Spot','Yellow Leaf Curl Virus','Mosaic virus','Healthy']
        }

    def get_interpreter_input_output_details(self):
        for model in self.model_dict.keys():
            self.model_dict[model][0].allocate_tensors()
            input_details = self.model_dict[model][0].get_input_details()
            output_details = self.model_dict[model][0].get_output_details()
            self.model_dict[model].append(input_details)
            self.model_dict[model].append(output_details)
    
    


        
    def image_tf_reshape(self, image, img_shape):
        if type(image) == np.ndarray:
            image = Image.fromarray(image.astype('uint8'), 'RGB')
        image = np.array(image.resize((img_shape, img_shape)))
        image = np.expand_dims(image, axis=0)
        return image.astype(np.float32)
        
        
    def predict(self, image, category):
        """
        image type must be PIL or Numpy
        """
        
        try:
            img_shape = self.model_dict[category][1]
            img = self.image_tf_reshape(image, img_shape)

            model = self.model_dict[category][0]
            input_details = self.model_dict[category][2]
            output_details = self.model_dict[category][3]
            model.set_tensor(input_details[0]['index'], img)
            model.invoke()
            pred_prob = model.get_tensor(output_details[0]['index'])
            arg_max_pred = pred_prob.argmax()
            return f"{self.class_name_dict[category][arg_max_pred]}"
        except Exception as e:
            pass
                
        return None