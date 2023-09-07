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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('crop', formData.crop);
        formDataToSend.append('file', formData.file);
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
            console.log(acceptedFiles[0])
            if (acceptedFiles[0]) {
            setImageFile(acceptedFiles[0]);
            }
    }
})


// ____________________________drug_drop_down_______________________________________//







return (
    <form  onSubmit={handleSubmit}>
        {aiError && <Message message={aiError} />}
        <div className="container px-5 py-24 mx-auto  border-2 border-gray-200 rounded-lg dark:border-gray-800 ">
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
