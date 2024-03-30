# Use the official Python base image
FROM python:3.8-slim

# Install required packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gcc g++ && \
    rm -rf /var/lib/apt/lists/*

# Install TensorFlow Lite interpreter
COPY ./requirements.txt /requirements.txt
RUN pip install -r requirements.txt
RUN mkdir /app
COPY . /app
# Set the working directory
WORKDIR /app

EXPOSE 8000
CMD [ "python", "app.py" ]


