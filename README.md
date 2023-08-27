# HealthyCrops-AI-Farming-FastAPI

Clone repo:
```
git clone https://github.com/HSAkash/HealthyCrops-AI-Farming-FastAPI.git
```

## Docker Build
```
sudo docker build  -t <img_name> .
```

## Docker run
```
sudo docker run -it --rm -p 8000:8000 <img_name> python app.py
```

## Request linking
```
host:port/api/predict
```

Form data:
```
crop:txt field
file:file(image)
```



## Pretrain model
1. [Potato Leaf DIsease](https://github.com/HSAkash/Potato-Leaf-Disease-Dataset.git)
```
git clone https://github.com/HSAkash/Potato-Leaf-Disease-Dataset.git
```
2. [Tomato Leaf DIsease](https://github.com/HSAkash/Tomato-leaf-disease.git)
```
git clone https://github.com/HSAkash/Tomato-leaf-disease.git
```
3. [Banana Leaf DIsease](https://github.com/HSAkash/Banana-Leaf-Dataset.git)
```
git clone https://github.com/HSAkash/Banana-Leaf-Dataset.git
```
4. [Guava Leaf DIsease](https://github.com/HSAkash/Guava-Disease.git)
```
git clone https://github.com/HSAkash/Guava-Disease.git
```
5. [Cauliflower DIsease](https://github.com/HSAkash/Cauliflower-disease.git)
```
git clone https://github.com/HSAkash/Cauliflower-disease.git
```