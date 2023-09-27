import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { listCrops } from '../actions/cropActions.js';
import { aiSearch } from '../actions/diseaseActions.js';
import { useNavigate } from 'react-router-dom'
import {AI_SEARCH_RESET} from '../constants/diseaseConstants.js'
import Message from '../components/Message';
import  {useDropzone} from 'react-dropzone';

const ImageUpload = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ setMassage] = useState(null)

    const cropList = useSelector((state) => state.cropList);
    const {  crops } = cropList;

    const aiSearchData = useSelector((state) => state.aiSearch);
    const { loading: aiLoading, error: aiError, crop, disease } = aiSearchData;

    

    useEffect(() => {
        dispatch(listCrops());
        if (crop!=='' && disease!=='' && crop!==undefined && disease!==undefined) {
        let crop_titles = crop
        let disease_titles = disease
        
        // reset crop and disease
        dispatch({
            type: AI_SEARCH_RESET
        })
        // console.log('aierror', aiError)

        navigate(`/disease/${crop_titles}/${disease_titles}`);
        }
        if(aiError){
            // console.log('aierror', aiError)
            setMassage(aiError)
        }
    }, [aiLoading, aiError, crop, disease]);

    const cropOptions = []

    if(crops){
        crops.map((crop) => cropOptions.push(
            {
                value: crop.title,
                label: crop.title
            }
        ))

    }
    

    const [formData, setFormData] = useState({
        crop: '',
        file: null,
    });

    const [imageFile, setImageFile] = useState(null);



    const handleCropChange = (selectedOption) => {
        setFormData((prevFormData) => ({
        ...prevFormData,
        crop: selectedOption.value,
        }));
    };

    // image resize
    const resizeImage = (file) => {
        return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxWidth = 300; // Set your desired maximum width
            const maxHeight = 300; // Set your desired maximum height
            let width = img.width;
            let height = img.height;
    
            if (width > height) {
                if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
                }
            }
    
            canvas.width = width;
            canvas.height = height;
    
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
                resolve(new File([blob], file.name, { type: 'image/jpeg' }));
            }, 'image/jpeg');
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Ensure formData.file is a valid File object
        if (!formData.file instanceof File) {
            console.error('Invalid file.');
            return;
        }
        const resizedFile = await resizeImage(formData.file);
        const formDataToSend = new FormData();
        formDataToSend.append('crop', formData.crop);
        // formDataToSend.append('file', formData.file);
        formDataToSend.append('file', resizedFile);
        dispatch(aiSearch(formDataToSend));
    };

// ____________________________drug_drop_down_______________________________________//
// drag state


const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            file: acceptedFiles[0],
            }));
            // console.log(acceptedFiles[0])
            if (acceptedFiles[0]) {
            setImageFile(acceptedFiles[0]);
            }
    }
})


// ____________________________drug_drop_down_______________________________________//







return (
    <form  onSubmit={handleSubmit}>
        {aiError && <Message message={aiError} />}
        <div className=" aiSearch_id1 container px-5 py-24 mx-auto  border-2 border-gray-200 rounded-lg dark:border-gray-800 ">
            <div className="flex flex-wrap -m-4">
                <div className="mx-5 my-3 lg:w-1/3 md:w-1/2">
                <div className="h-full border-2 border-gray-200 rounded-lg dark:border-gray-100">
                    <label id="label-file-upload" htmlFor="input-file-upload" className={isDragActive ? "drag-active" : "" }>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?<p>Drop the image</p>:<p>Drag the image || click here</p>
                            }
                        </div> 
                        
                    </label>
                </div> 
                </div> 
                <div className="mx-5 my-3 lg:w-1/3 md:w-1/2">
                <div className="h-full  border-2 border-gray-200 rounded-lg dark:border-gray-800">
                    {imageFile && 
                        <img src={imageFile && URL.createObjectURL(imageFile)} alt="preview" className="preview-image" />
                    }
                </div>
                </div>
                    

            </div>
        </div>

        <div className='aiSearch_id2 my-2'>
            {!imageFile ? <div >
                <div className="h-full border-2 border-gray-200 rounded-lg dark:border-gray-100">
                    <label id="label-file-upload" htmlFor="input-file-upload" className={isDragActive ? "drag-active" : "" }>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?<p></p>:<p>click here</p>
                            }
                        </div> 
                        
                    </label>
                </div> 
            </div> :
            <div >
                <div className="h-full rounded-lg">
                    
                        <img src={imageFile && URL.createObjectURL(imageFile)} alt="preview" className="preview-image" />
                    
                </div>
            </div>}
                    
        </div>

        <div>
            <label htmlFor="crop">Crop ID:</label>
            <Select
                required
                options={cropOptions}
                onChange={handleCropChange}
                value={cropOptions.find((option) => option.value === formData.crop)}
            />
        </div>
        <div className="py-4 flex justify-left">
            <button type="submit" className="btn btn-primary w-24">
                Submit
            </button>
            </div>
    </form>
    );
};

export default ImageUpload;
