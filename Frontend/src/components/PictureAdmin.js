import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listPictures, deletePicture, createPicture, updatePicture } from '../actions/pictureActions';


const PictureAdmin = ({disease_id}) => {
    const dispatch = useDispatch();

    const [delete_picture_bool, setDelete_picture_bool] = useState(false);
    const [delete_picture_id, setDelete_picture_id] = useState('');
    const [edit_picture_bool, setEdit_picture_bool] = useState(false);
    const [edit_picture_id, setEdit_picture_id] = useState('');
    const [picture_image, setPicture_image] = useState(null);
    

    



    const pictureList = useSelector(state => state.pictureList);
    const { loading, error, pictures } = pictureList;

    const pictureDelete = useSelector(state => state.pictureDelete);
    const {  success: successDelete } = pictureDelete;

    const pictureCreate = useSelector(state => state.pictureCreate);
    const {  success: successCreate } = pictureCreate;

    const pictureUpdate = useSelector(state => state.pictureUpdate);
    const {  success: successUpdate } = pictureUpdate;



    useEffect(() => {
        dispatch(listPictures(disease_id))
        
        if(successDelete){
            setDelete_picture_bool(false)
        }
        if(successUpdate){
            setEdit_picture_bool(false)
        }
        if(successCreate){
            // img_upload
            document.getElementById('img_upload').reset();
        }
    }, [dispatch, successDelete, successCreate, successUpdate])

    // console.log(pictures)
    // console.log(`error: ${error}`)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPicture_image(file)
    };

    const deleteButtonHandler = (id) => {
        if (delete_picture_bool){
            setDelete_picture_bool(false)
        }else{
            setDelete_picture_bool(true)
        }
        setDelete_picture_id(id)
    }

    const deleteHandler = (id) => {
        dispatch(deletePicture(id))
    }

    const editButtonHandler = (id) => {
        if (edit_picture_bool){
            setEdit_picture_bool(false)
        }else{
            setEdit_picture_bool(true)
        }
        setEdit_picture_id(id)
    }

    const editHandler = (id) => {
        const formDataToSend = new FormData();
        formDataToSend.append('img', picture_image);
        dispatch(updatePicture(id, formDataToSend));
    }

    const uploadPictureHandler = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('diseaseId', disease_id);
        formDataToSend.append('img', picture_image);
        dispatch(createPicture(formDataToSend))
    }

    // ____________________copy clipboard ________________//
    // const [copyStatus, setCopyStatus] = useState('');
    const copyStatus = 'Copied';
    const [copyTimer, setCopyTimer] = useState(null);
    const [copyPictureId, setCopyPictureId] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = (id, text) => {
        // Copy the text to clipboard
        navigator.clipboard.writeText(text);
    
        // Set copy status to "Copied"
        // setCopyStatus('Copied');
        setCopyPictureId(id);
        setIsCopied(true);
    
        // Clear the copy status after 2 seconds
        clearTimeout(copyTimer);
        const timer = setTimeout(() => {
        // setCopyStatus('');
        setCopyPictureId('');
        setIsCopied(false);

        }, 2000); // 2000 milliseconds = 2 seconds
        setCopyTimer(timer);
    };
    // ____________________copy clipboard end ________________//



    return (
        <div className='px-5 py-10'>
            
            <div className="overflow-x-auto">

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
                    {loading ?<></>:error?<></>: 
                    <tbody>


                        {pictures.map(picture => (
                            <tr key={picture.id}>
                                <td>{picture.id}</td>
                                <td></td>
                                <td></td>
                                {edit_picture_bool && (edit_picture_id === picture.id) ?
                                <td><input
                                    type="file"
                                    id="img"
                                    name="img"
                                    accept=".png, .jpg, .jpeg" // Specify accepted file formats
                                    onChange={handleImageChange}
                                /></td>:
                                <td><img className='h-20 w-20' src={picture.img} alt={picture.img} /></td>}
                                
                                <td></td>
                                
                                {/* set all value right side */}
                                <td className="text-right">
                                    
                                    
                                    {(delete_picture_bool && (delete_picture_id === picture.id)) ?
                                    <><button onClick={() => deleteHandler(picture.id)} className='btn mx-3'> <i class="fa-solid fa-check"></i> </button>
                                    <button onClick={() => deleteButtonHandler(picture.id)} className='btn mx-3'> <i class="fa-solid fa-x"></i></button></>
                                    :<></>

                                    }

                                    {(edit_picture_bool && (edit_picture_id ===picture.id )) ?
                                    <><button onClick={() => editHandler(picture.id)} className='btn mx-3'> <i class="fa-solid fa-check"></i> </button>
                                    <button onClick={() => editButtonHandler(picture.id)} className='btn mx-3'> <i class="fa-solid fa-x"></i></button></>
                                    :<></>
                                    }

                                    {((delete_picture_bool && (delete_picture_id=== picture.id)) || (edit_picture_bool && (edit_picture_id===picture.id)))?
                                    <></>
                                    :<><button onClick={() => editButtonHandler(picture.id)} className='btn mx-3'> <i className='fas fa-edit'></i> </button>
                                    <button onClick={() => deleteButtonHandler(picture.id)} className='btn mx-3'> <i className='fas fa-trash'></i> </button></>
                                    }
                                    
                                    {/* __________________copy clipboard___________________ */}
                                    <button onClick={() => handleCopyClick(picture.id, picture.img)} className='btn mx-3'> <i class="fa-solid fa-copy"></i> </button>
                                    {isCopied && copyPictureId===picture.id ?
                                    <span className='copy-status'>{copyStatus}</span>:
                                    // class opacity-0
                                    <span className='opacity-0'>{copyStatus}</span>}
                                    {/* __________________copy clipboard end___________________ */}
                                    </td>
                            </tr>
                        ))}

                    </tbody>}
                </table>
                
                <hr className='my-10'/>

                <div className="w-full inline-flex items-center justify-center flex-shrink-0 h-10 mb-5 text-blue-500 bg-blue-100 rounded-full dark:bg-blue-500 dark:text-blue-100">
                    <h2 className="px-8 font-bold text-xl title-font">Upload Images</h2>
                </div>

                <form  id='img_upload' className='py-4 px-2' onSubmit={uploadPictureHandler}>
                    <div className="form-control w-full">
                        <input
                            type="file"
                            id="img"
                            name="img"
                            accept=".png, .jpg, .jpeg" // Specify accepted file formats
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className='my-4 flex justify-left items-left'>
                        <button type='submit' className='btn'> Add </button>
                        
                    </div>
                </form>
                
            </div>
        </div>
    )
}

export default PictureAdmin