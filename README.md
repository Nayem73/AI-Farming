# Backend API Documentation

This is the documentation for the backend APIs of the Spring Boot application connected to the MySQL database server. The base URL for the APIs is `http://localhost:8080`, and the database server is located at `localhost:3306/world`.

## Table of Contents

- [Crop](#crop)
  - [Create a Crop](#create-a-crop)
  - [Get All Crops](#get-all-crops)
  - [Update a Crop](#update-a-crop)
  - [Delete a Crop](#delete-a-crop)

- [Disease](#disease)
  - [Create a Disease](#create-a-disease)
  - [Get All Diseases](#get-all-diseases)
  - [Get a Specific Disease](#get-a-specific-disease)
  - [Update a Disease](#update-a-disease)
  - [Delete a Disease](#delete-a-disease)

- [Disease Picture](#disease-picture)
  - [Upload Disease Pictures](#upload-disease-pictures)
  - [Get All Pictures for a Disease](#get-all-pictures-for-a-disease)
  - [Update a Picture](#update-a-picture)
  - [Delete a Picture](#delete-a-picture)

- [Picture](#picture)
  - [Upload a Picture](#upload-a-picture)

- [User](#user)
  - [Sign In](#sign-in)
  - [Sign Up](#sign-up)

## Crop

### Create a Crop

- **Endpoint:** `POST /api/crops/`
- **Request Body:**
  ```json
  {
      "title": "Crop Title"
  }
- [Response] Status 201 Ok

  ### Get All Crops

- **Endpoint:** `POST /api/crops/`
- **Response:**
  ```json
  [
    {
        "id": 1,
        "title": "Crop Title 1"
    },
    {
        "id": 2,
        "title": "Crop Title 2"
    }
  ]

### Update a Crop

- **Endpoint:** `PUT /api/crops/<crop_id>`
- **Request Body:**
  ```json
  {
      "title": "Updated Crop Title"
  }
- [Response] Status 200 Ok

### Delete a Crop

- **Endpoint:** `/api/crops/<crop_id>`
- [Response] Status 201 Ok


## Disease


### Create a Disease


- **Endpoint:** `/api/disease/`
- **Method:** POST
- **Request Body:**
  ```json
    {
        "title": "Disease Title",
        "img": "MultipartFile",
        "description": "Disease Description",
        "crop": {
            "id": 1
        }
    }

- [Response] Status 201 Ok

### Get All Diseases


- **Endpoint:** `/api/disease/`
- **Search Endpoint:** `/api/disease?crop=<crop_title>&search=`
- **Method:** GET
- **Response:**
  ```json
  [
    {
        "id": 1,
        "title": "Disease Title 1",
        "img": "img url",
        "description": "Disease Description 1",
        "crop": {
            "id": 1,
            "title": "Crop Title 1"
        }
    },
    {
        "id": 2,
        "title": "Disease Title 2",
        "img": "img url",
        "description": "Disease Description 2",
        "crop": {
            "id": 2,
            "title": "Crop Title 2"
        }
    }
  ]

### Get a Specific Disease


- **Endpoint:** `/api/disease/<crop_title>/<disease_title>`
- **Method:** GET
- **Response:**
  ```json
    {
        "id": 1,
        "title": "Disease Title 1",
        "img": "img url",
        "description": "Disease Description 1",
        "crop": {
            "id": 1,
            "title": "Crop Title 1"
        }
    }


### Update a Disease


- **Endpoint:** `/api/disease/<disease_id>/`
- **Method:** PUT
- **Request Body:**
    ```json
    {
        "title": "Updated Disease Title",
        "img": "MultipartFile",
        "description": "Updated Disease Description",
        "crop": {
            "id": 2
        }
    }

- [Response] Status 200 OK


### Delete a Disease


- **Endpoint:** `/api/disease/<disease_id>`
- **Method:** DELETE
- [Response] Status 200 OK


## Disease Picture


### Upload Disease Pictures


- **Endpoint:** `/api/disease/picture/`
- **Method:** POST
- **Request Body:**
    ```json
    {
        "img": "MultipartFile",
        "disease": {
            "id": 1
        }
    }

- [Response] Status 200 OK


### Get All Pictures for a Disease


- **Endpoint:** `/api/disease/<disease_id>/picture/`
- **Method:** GET
- **Response:**
    ```json
    [
        {
            "id": 1,
            "img": "img url"
        },
        {
            "id": 2,
            "img": "img url"
        }
    ]


### Update a Picture


- **Endpoint:** `/api/disease/picture/<diseasePicture_id>`
- **Method:** PUT
- **Request Body:**
    ```json
    {
        "img": "MultipartFile"
    }

- [Response] Status 200 OK


## Picture

### Upload a Picture

- **Endpoint:** `/api/disease/picture/`
- **Method:** POST
- **Request Body:**
    ```json
    {
        "img": "MultipartFile",
    }

- [Response] Status 200 OK


### Get Picture

- **Endpoint:** `/<pictureUrl>`
- **Method:** GET
- **Response:**
    ```json
    "MultipartFile"



## User


### Sign In


- **Endpoint:** `/api/signin/`
- **Method:** POST
- **Request Body:**
    ```json
    {
        "userName": "nayem",
        "password": "root"
    }


- [Response]
    ```json
    {
        "token": "your_access_token_here",
        "userName": "nayem",
        "role": "root"
    }



### Sign Up


- **Endpoint:** `/api/signup/`
- **Method:** POST
- **Request Body:**
    ```json
    {
        "userName": "new_user",
        "email": "user@example.com",
        "password": "new_password",
        "IsAdmin": "Boolean"
    }



- [Response] Status 200 OK


### Sign Out


- **Endpoint:** `/api/signout/`
- **Method:** POST
- [Response] Status 200 OK
