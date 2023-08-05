import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { listCrops } from '../actions/cropActions.js';
import { aiSearch } from '../actions/diseaseActions.js';
import { useNavigate } from 'react-router-dom'
import {AI_SEARCH_RESET} from '../constants/diseaseConstants.js'
import Message from '../components/Message';
import Loader from '../components/Loader';

const ImageUpload = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [message, setMassage] = useState(null)

    const cropList = useSelector((state) => state.cropList);
    const { loading: cropLoading, error: cropError, crops } = cropList;

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
    const [usingCamera, setUsingCamera] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevFormData) => ({
        ...prevFormData,
        file: file,
        }));
        if (file) {
        setImageFile(file);
        setUsingCamera(false);
        }
    };

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

    return (
        <>
        {/* {message && <SuccessMessage message={message} />} */}
            {message && <Message message={message} />}
            {aiLoading && <Loader />}
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="crop">Crop ID:</label>
            <Select
                options={cropOptions}
                onChange={handleCropChange}
                value={cropOptions.find((option) => option.value === formData.crop)}
            />
            </div>
            <div>
            <label htmlFor="file">Image:</label>
            <input
                type="file"
                id="img"
                name="img"
                accept=".png, .jpg, .jpeg"
                onChange={handleImageChange}
            />
            </div>

            {imageFile && !usingCamera && (
            <div className="container-aisearch">
                <div className="ai_img">
                <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Uploaded"
                    className="uploaded-image"
                />
                </div>
            </div>
            )}

            <div className="py-4 flex justify-left">
            <button type="submit" className="btn btn-primary w-24">
                Submit
            </button>
            </div>
        </form>
        </>
    );
};

export default ImageUpload;
