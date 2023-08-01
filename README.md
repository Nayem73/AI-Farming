# AI-Farming

crop:
    post: /api/crops/
        {
            title: 
        }
    get: /api/crops/
        response:
        [
        {
            id:
            title:
        },
        {
            id:
            title:
        }
        ]
    put: /api/crops/<crop_id>
        {
            title:
        }
    delete: /api/crops/<crop_id>

disease:
    post: /api/disease/
        {
            title:
            img: multi field
            description:
            crop:{
                id:
            }

        }
    get: /api/disease/
        /api/disease
        /api/disease?crop=<crop_title>&search=
        response:[{
            id:
            title:
            img: url
            description:
            crop:
            {
                id:
                title:
            }
        },
        {
            id:
            title:
            img: url
            description:
            crop:
            {
                id:
                title:
            }
        }
        
        ]
    get: /api/disease/<crop_title>/<disease_title>                (spacified only for one disease)
        response:
        {
            id:
            title:
            img: url
            description:
            crop:
            {
                id:
                title:
            }
        }
    
    
    put: /api/disease/<disease_id>/
        {
            title:
            img: multi field
            description:
            crop:{
                id:
            }

        }

    delete: /api/disease/<disease_id>

diseasePicture:
    post: /api/disease/picture/
        {
            img: multi
            disease:
            {
                id:
            }
        }

    get: /api/disease/<disease_id>/picture/                                (all pictures for disease_id)
        response:
        [{
            id:
            img: url
        },
        {
            id:
            img: url
        }
        ]
    put: /api/disease/picture/<diseasePicture_id>
        {
            img: multi
        }
    delete: /api/disease/picture/<diseasePicture_id>

picture:
    post: /api/picture/
        {
            img: multi
        }
        response: {
            img: url
        }

user:
    signin: /api/signin/
        {
            userName:
            password:
        }
        response:{
            token: token
            userName:
            role:
        }
    signup: /api/signup/
        {
            userName:
            email:
            password:
            role:
        }

AI_search: 
    post: /api/search/
        {
            crop: <crop_title>
            img: multipart/form-data
        }
        response{
            crop: <crop_title>
            disease: <disease_title>
        }
