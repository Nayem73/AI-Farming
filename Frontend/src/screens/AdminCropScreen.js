import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { listCrops, deleteCrop, createCrop, updateCrop } from '../actions/cropActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const AdminCropScreen = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const [delete_crop_bool, setDelete_crop_bool] = useState(false);
    const [delete_crop_id, setDelete_crop_id] = useState('');
    const [edit_crop_bool, setEdit_crop_bool] = useState(false);
    const [edit_crop_id, setEdit_crop_id] = useState('');
    const [create_crop_bool, setCreate_crop_bool] = useState(false);
    const [crop_title, setCrop_title] = useState('');

    


    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;


    const cropList = useSelector(state => state.cropList);
    const { loading, error, crops } = cropList;

    const cropDelete = useSelector(state => state.cropDelete);
    const {  success: successDelete } = cropDelete;

    const cropCreate = useSelector(state => state.cropCreate);
    const { success: successCreate } = cropCreate;

    const cropUpdate = useSelector(state => state.cropUpdate);
    const {  success: successUpdate } = cropUpdate;



    useEffect(() => {
        if (!userInfo.isAdmin) {
            history('/login')
            dispatch(listCrops())
        }
        dispatch(listCrops())
        if(successDelete){
            setDelete_crop_bool(false)
        }
        if(successUpdate){
            setEdit_crop_bool(false)
        }
        if(successCreate){
            setCreate_crop_bool(false)
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, successUpdate])

    const deleteButtonHandler = (id) => {
        if (delete_crop_bool){
            setDelete_crop_bool(false)
        }else{
            setDelete_crop_bool(true)
        }
        setDelete_crop_id(id)
    }

    const deleteHandler = (id) => {
        dispatch(deleteCrop(id))
    }

    const editButtonHandler = (id) => {
        if (edit_crop_bool){
            setEdit_crop_bool(false)
        }else{
            setEdit_crop_bool(true)
        }
        setEdit_crop_id(id)
        setCrop_title(crops.find(crop => crop.id === id).title)
    }

    const editHandler = (id) => {
        const formDataToSend = new FormData();
        formDataToSend.append('title', crop_title);
        dispatch(updateCrop(id, formDataToSend));
    }

    const createButtonHandler = () => {
        if (edit_crop_bool){
            setCreate_crop_bool(false)
        }else{
            setCreate_crop_bool(true)
        }
    }

    const createDiseaseHandler = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('title', crop_title);
        dispatch(createCrop(formDataToSend))
    }


    return (
        <div className="container px-5 py-10 mx-auto ">
                <div className="flex flex-wrap -m-4">
                    
                    <div className="lg:p-4 md:p-4 w-full">
                        <div className="h-full lg:px-8 md:px-8  py-10 review">
                            <div className="flex flex-col items-center mb-3">
                            <div className=" my-5 w-full inline-flex items-center justify-center flex-shrink-0 h-10 mb-5 text-blue-500 bg-blue-100 rounded-full dark:bg-blue-500 dark:text-blue-100">
                                <h2 className="px-8 font-bold text-xl title-font">Crops Info, Create & Update</h2>
                            </div>

            {loading ? <Loader /> : error ? <Message message={error} /> : <div className="overflow-x-auto w-3/4">

           

                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th></th>
                            <th></th>
                            <th>Crop</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>


                        {crops.map(crop => (
                            <tr key={crop.id}>
                                <td>{crop.id}</td>
                                <td></td>
                                <td></td>
                                {edit_crop_bool && (edit_crop_id === crop.id) ?
                                <td><input value={crop_title} placeholder="Crop Title" className="input input-bordered w-full max-w-xs" onChange={(e) => setCrop_title(e.target.value)} /></td>:
                                <td>{crop.title}</td>}
                                
                                <td></td>
                                {/* <td>{disease.isAdmin ? (<i className='fas fa-check' style={{ color: 'green' }}> </i>) : (<i className='fas fa-items' style={{ color: 'red' }}></i>)}</td> */}

                                <td className="text-right">
                                    
                                    
                                    {(delete_crop_bool && (delete_crop_id === crop.id)) ?
                                    <><button onClick={() => deleteHandler(crop.id)} className='btn ml-3'> <i class="fa-solid fa-check"></i> </button>
                                    <button onClick={() => deleteButtonHandler(crop.id)} className='btn ml-3'> <i class="fa-solid fa-xmark"></i></button></>
                                    :<></>

                                    }

                                    {(edit_crop_bool && (edit_crop_id ===crop.id )) ?
                                    <><button onClick={() => editHandler(crop.id)} className='btn ml-3'> <i class="fa-solid fa-check"></i> </button>
                                    <button onClick={() => editButtonHandler(crop.id)} className='btn ml-3'> <i class="fa-solid fa-xmark"></i></button></>
                                    :<></>
                                    }

                                    {((delete_crop_bool && (delete_crop_id=== crop.id)) || (edit_crop_bool && (edit_crop_id===crop.id)))?
                                    <></>
                                    :<><button onClick={() => editButtonHandler(crop.id)} className='btn mx-3'> <i className='fas fa-edit'></i> </button>
                                    <button onClick={() => deleteButtonHandler(crop.id)} className='btn'> <i className='fas fa-trash'></i> </button></>
                                    }
                                    
                                    </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                
                {create_crop_bool ?<>
                    <form className='py-4 px-2' onSubmit={createDiseaseHandler}>
                        <div className="form-control w-full">
                            <input  placeholder="Crop Title" className="input input-bordered w-full max-w-xs" onChange={(e) => setCrop_title(e.target.value)} />
                        </div>
                        <div className='my-4 flex justify-left items-left'>
                            <button type='submit' className='btn'> Add </button>
                            <button  onClick={() => createButtonHandler()} className='btn mx-2'> Cancle</button>
                        </div>
                    </form>
                </>
                :<button  onClick={() => createButtonHandler()} className='btn items-center justify-center mb-3'>ADD Crop</button>
                }
                
            </div>}
            </div>
        </div>
        </div>
        </div>
        </div>
    )
}

export default AdminCropScreen