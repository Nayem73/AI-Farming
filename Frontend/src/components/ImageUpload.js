import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { listCrops } from '../actions/cropActions.js';
import { aiSearch } from '../actions/diseaseActions.js';
import { useNavigate } from 'react-router-dom'
import {AI_SEARCH_RESET} from '../constants/diseaseConstants.js'

const ImageUpload = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cropList = useSelector((state) => state.cropList);
    const { loading: cropLoading, error: cropError, crops } = cropList;

    const aiSearchData = useSelector((state) => state.aiSearch);
    const { loading: aiLoading, error: aiError, crop, disease } = aiSearchData;

    const cropOptions = crops.map((crop) => ({
        value: crop.title,
        label: crop.title,
    }));

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

    useEffect(() => {
        dispatch(listCrops());
        if (crop!=='' && disease!=='') {
        let crop_titles = crop
        let disease_titles = disease
        
        // reset crop and disease
        dispatch({
            type: AI_SEARCH_RESET
        })


        navigate(`/disease/${crop_titles}/${disease_titles}`);
        }
    }, [aiLoading, aiError, crop, disease]);

    return (
        <>
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
