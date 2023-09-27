import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import MDEditor from '@uiw/react-md-editor';
import { listCrops } from '../actions/cropActions.js';
import { createDisease, updateDisease} from '../actions/diseaseActions.js';
import { DISEASE_CREATE_RESET } from '../constants/diseaseConstants.js';
import Message from '../components/Message.js';


const FormDisease = ({ existingData }) => {
    // console.log('form page', existingData)
    const dispatch = useDispatch();
    const history = useNavigate();
    const redirect_url = '/admin/disease/'
    const [formData, setFormData] = useState({
        title: '',
        img: null,
        description: '',
        crop: {
            id: '',
        },
    });


    const cropList = useSelector(state => state.cropList);
    const diseaseCreate = useSelector(state => state.diseaseCreate);
    
    

    const { crops } = cropList;
    const {  error: errorCreate, success: successCreate } = diseaseCreate;


    useEffect(() => {
        dispatch(listCrops())
        if (existingData) {
            setFormData({
            title: existingData.title,
            img: null,
            description: existingData.description,
            crop: {
                id: existingData.crop.id,
            },
            });
        
        }
        if (successCreate) {
            dispatch({ type: DISEASE_CREATE_RESET });
            history(redirect_url)
        }
        
    }, [dispatch, existingData, successCreate, errorCreate]);

    // mark down link copy and picture show

    const cropOptions = []
    if (crops){
    crops.map((crop) => cropOptions.push(
        {
            value: crop.id,
            label: crop.title
        }
        ));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleCropChange = (selectedOption) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            crop: {
            id: selectedOption.value,
            },
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevFormData) => ({
        ...prevFormData,
        img: file,
        }));
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    // };

    const handleMarkdownChange = (value) => {
        // The Markdown editor's value is passed as an argument.
        // Here, you can set it to the 'description' field in the form data.
        setFormData((prevFormData) => ({
        ...prevFormData,
        description: value,
        }));
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('img', formData.img);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('cropId', formData.crop.id);
    
        // Perform the POST or PUT request based on whether it's an update or create operation
        if (existingData && existingData.id) {
            dispatch(updateDisease(existingData.id, formDataToSend))
            } 
        else {
            dispatch(createDisease(formDataToSend))
        }
    }



    

    return (
        <>
        {errorCreate && <Message message={errorCreate} />}
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="title">Title:</label>
            <input
            required
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="img">Image:</label>
            <input
            // required if  existingData is not null
            required={existingData ? false : true}
            type="file"
            id="img"
            name="img"
            accept=".png, .jpg, .jpeg" // Specify accepted file formats
            onChange={handleImageChange}
            />
        </div>

        <div>
            <label htmlFor="cropId">Crop ID:</label>
            <Select
            required
            options={cropOptions}
            onChange={handleCropChange}
            value={cropOptions.find((option) => option.value === formData.crop.id)}
            />
        </div>

        <div data-color-mode="light">
            <label htmlFor="description">Description (Markdown):</label>
            <MDEditor
            value={formData.description} // Set the value from the form data
            onChange={handleMarkdownChange} // Handle changes and update form data
            />
        </div>
        <div className='py-4 flex justify-left'>
            <button type='submit' className=' btn btn-primary w-24'>Submit</button>
        </div>
        </form>

        
    </>
    );
    
}


export default FormDisease