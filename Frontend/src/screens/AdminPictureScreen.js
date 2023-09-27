import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate, useParams } from 'react-router-dom';
import { listPictures, deletePicture, createPicture, updatePicture } from '../actions/pictureActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const AdminPictureScreen = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const params = useParams();
    const crop_title = params.crop_title
    const disease_title = params.disease_title
    const disease_id = params.disease_id

    const [delete_picture_bool, setDelete_picture_bool] = useState(false);
    const [delete_picture_id, setDelete_picture_id] = useState('');
    const [edit_picture_bool, setEdit_picture_bool] = useState(false);
    const [edit_picture_id, setEdit_picture_id] = useState('');
    const [create_picture_bool, setCreate_picture_bool] = useState(false);
    const [picture_image, setPicture_image] = useState(null);
    

    


    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;


    const pictureList = useSelector(state => state.pictureList);
    const { loading, error, pictures } = pictureList;

    const pictureDelete = useSelector(state => state.pictureDelete);
    const {  success: successDelete } = pictureDelete;

    const pictureCreate = useSelector(state => state.pictureCreate);
    const {  success: successCreate } = pictureCreate;

    const pictureUpdate = useSelector(state => state.pictureUpdate);
    const {  success: successUpdate } = pictureUpdate;



    useEffect(() => {
        if (!userInfo.isAdmin) {
            history('/login')
            dispatch(listPictures(disease_id))
        }else{
            dispatch(listPictures(disease_id))
        }
        
        if(successDelete){
            setDelete_picture_bool(false)
        }
        if(successUpdate){
            setEdit_picture_bool(false)
        }
        if(successCreate){
            setCreate_picture_bool(false)
        }
    }, [dispatch, history, userInfo,disease_id, successDelete, successCreate, successUpdate])


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

    const createButtonHandler = () => {
        if (edit_picture_bool){
            setCreate_picture_bool(false)
        }else{
            setCreate_picture_bool(true)
        }
    }

    const createDiseaseHandler = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('diseaseId', disease_id);
        formDataToSend.append('img', picture_image);
        dispatch(createPicture(formDataToSend))
    }


    return (
        <div className='px-5 py-5'>
            <h1 className='text-xl font-bold py-3'>{crop_title} : {disease_title}</h1>
            {loading ? <Loader /> : error ? <Message message={error} /> : <div className="overflow-x-auto">

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
                                {/* <td>{disease.isAdmin ? (<i className='fas fa-check' style={{ color: 'green' }}> </i>) : (<i className='fas fa-items' style={{ color: 'red' }}></i>)}</td> */}

                                <td>
                                    
                                    
                                    {(delete_picture_bool && (delete_picture_id === picture.id)) ?
                                    <><button onClick={() => deleteHandler(picture.id)} className='btn ml-3'> <i class="fa-solid fa-check"></i> </button>
                                    <button onClick={() => deleteButtonHandler(picture.id)} className='btn ml-3'> <i class="fa-solid fa-xmark"></i></button></>
                                    :<></>

                                    }

                                    {(edit_picture_bool && (edit_picture_id ===picture.id )) ?
                                    <><button onClick={() => editHandler(picture.id)} className='btn ml-3'> <i class="fa-solid fa-check"></i> </button>
                                    <button onClick={() => editButtonHandler(picture.id)} className='btn ml-3'> <i class="fa-solid fa-xmark"></i></button></>
                                    :<></>
                                    }

                                    {((delete_picture_bool && (delete_picture_id=== picture.id)) || (edit_picture_bool && (edit_picture_id===picture.id)))?
                                    <></>
                                    :<><button onClick={() => editButtonHandler(picture.id)} className='btn mx-3'> <i className='fas fa-edit'></i> </button>
                                    <button onClick={() => deleteButtonHandler(picture.id)} className='btn'> <i className='fas fa-trash'></i> </button></>
                                    }
                                    
                                    </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                
                {create_picture_bool ?<>
                    <form className='py-4 px-2' onSubmit={createDiseaseHandler}>
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
                            <button  onClick={() => createButtonHandler()} className='btn mx-2'> Cancle</button>
                        </div>
                    </form>
                </>
                :<button  onClick={() => createButtonHandler()} className='btn items-center justify-center mb-3'>ADD Picture</button>
                }
                
            </div>}
        </div>
    )
}

export default AdminPictureScreen