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