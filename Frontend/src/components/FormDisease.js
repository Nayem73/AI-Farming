import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import MDEditor from '@uiw/react-md-editor';
import { listCrops } from '../actions/cropActions.js';
import { createDisease, updateDisease} from '../actions/diseaseActions.js';
import { DISEASE_CREATE_RESET, DISEASE_UPDATE_RESET } from '../constants/diseaseConstants.js';
import { listPictures } from '../actions/pictureActions';
import Loader from '../components/Loader.js';
import Message from '../components/Message.js';
import ClipboardJS from 'clipboard';

const FormDisease = ({ existingData }) => {
    // console.log('form page', existingData)
    const dispatch = useDispatch();
    const params = useParams();
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
    const [isCopied, setIsCopied] = useState(false);

    const cropList = useSelector(state => state.cropList);
    const diseaseCreate = useSelector(state => state.diseaseCreate);
    
    const pictureList = useSelector(state => state.pictureList);
    

    const { loading, error, crops } = cropList;
    const { loading: loadingCreate, error: errorCreate, success: successCreate } = diseaseCreate;
    const { loading:loadingPicture, error:errorPicture, pictures } = pictureList;

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
            dispatch(listPictures(existingData.id))
        }
        if (successCreate) {
            dispatch({ type: DISEASE_CREATE_RESET });
            history(redirect_url)
        }
        
    }, [dispatch, existingData, successCreate, errorCreate]);

    // mark down link copy and picture show
    let picMdFile = ``;
    pictures.map((picture) => {
        picMdFile += "```"
        picMdFile += `${picture.img}`
        picMdFile += "```<br>"
        picMdFile += `<img className='h-20 w-20' src="${picture.img}" alt="${picture.img}" /><br>`

    })

    const cropOptions = []
    crops.map((crop) => cropOptions.push(
        {
            value: crop.id,
            label: crop.title
        }
    ));

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

    const handleCopyClick = () => {
        const clipboard = new ClipboardJS('.copy-button');
        
        clipboard.on('success', (e) => {
            e.clearSelection();
            setIsCopied(true);
        
            setTimeout(() => {
                setIsCopied(false);
            }, 1500);
        });
    
        clipboard.on('error', (e) => {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
        });
    };

    

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

        
        { existingData? loading ? (<Loader />) : error ? (<Message message={error} />) : <div className="container md_div mb-5" data-color-mode="light">
        <table className="table w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th></th>
                            <th></th>
                            <th>Image</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>


                        {pictures.map(picture => (
                            <tr key={picture.id}>
                                <td>{picture.id}</td>
                                <td></td>
                                <td></td>
                                <td><img className='h-20 w-20' src={picture.img} alt={picture.img} /></td>
                                
                                <td></td>
                                {/* <td>{disease.isAdmin ? (<i className='fas fa-check' style={{ color: 'green' }}> </i>) : (<i className='fas fa-items' style={{ color: 'red' }}></i>)}</td> */}

                                <td>
                                    
                                    <button
                                        className="copy-button"
                                        data-clipboard-text={picture.img}
                                        onClick={handleCopyClick}
                                    >
                                        <i class="fa-solid fa-copy mx-2"></i>
                                    </button>
                                    
                                    </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
        </div>:<></>}
    </>
    );
    
}


export default FormDisease