import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { listDiseases, deleteDisease } from '../actions/diseaseActions';
import Loader from '../components/Loader';
import Message from '../components/Message';


import Paginate from '../components/Paginate'

const DiseaseListScreen = () => {
    const dispatch = useDispatch();

    const [delete_disease_bool, setDelete_disease_bool] = useState(false);
    const [delete_disease_id, setDelete_disease_id] = useState('');


    const diseaseList = useSelector(state => state.diseaseList);
    const { loading, error, diseases, cur_page, total_page } = diseaseList;
    const history = useNavigate();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const diseaseDelete = useSelector(state => state.diseaseDelete);
    const {  success: successDelete } = diseaseDelete;

    // var [currentPageNumber, setCurrentPageNumber] = useState('');


    useEffect(() => {
        if (!userInfo.isAdmin) {
            history('/login')
            dispatch(listDiseases())
        }
        dispatch(listDiseases())
        if (successDelete) {
            setDelete_disease_bool(false)
        }
    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        // dispatch(deleteUser(id))
        dispatch(deleteDisease(id))
    }

    const deleteButtonHandler = (id) => {
        if (delete_disease_bool){
            setDelete_disease_bool(false)
        }else{
            setDelete_disease_bool(true)
        }
        setDelete_disease_id(id)
    }


    return (
        <div className="container px-5 py-10 mx-auto ">
                <div className="flex flex-wrap -m-4">
                    
                    <div className="lg:p-4 md:p-4 sm:p-1 w-full">
                        <div className="h-full px-8 py-10 review">
                            <div className="flex flex-col items-center mb-3">
                            <div className=" my-5 w-full inline-flex items-center justify-center flex-shrink-0 lg:h-10 md:h-10 py-2 mb-5 text-blue-500 bg-blue-100 rounded-full dark:bg-blue-500 dark:text-blue-100">
                                <h2 className="px-8 font-bold text-xl title-font">Diseases Info, Create & Update</h2>
                            </div>

            {loading ? <Loader /> : error ? <Message message={error} /> : <div className="overflow-x-auto w-full">
            <Link to={'/admin/disease/create/'}>
                <button className='btn items-center justify-center mb-3'>ADD DISEASE</button>
            </Link>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th></th>
                            <th>Disease</th>
                            <th>Pictures</th>
                            <th>Crop</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>


                        {diseases.map(disease => (
                            <tr key={disease.id}>
                                <td>{disease.id}</td>
                                <td></td>
                                <td><Link to={`/disease/${disease.crop.title}/${disease.title}`}>{disease.title}</Link></td>
                                {/* <td><Link to={`/admin/picture/${disease.crop.title}/${disease.title}/${disease.id}/`}><i class="fa-solid fa-image"></i></Link></td> */}
                                <td><img className='h-20 w-20' src={disease.img} alt={disease.img} /></td>
                                <td>{disease.crop.title}</td>
                                {/* <td>{disease.isAdmin ? (<i className='fas fa-check' style={{ color: 'green' }}> </i>) : (<i className='fas fa-items' style={{ color: 'red' }}></i>)}</td> */}

                                <td>
                                    
                                    
                                    {(delete_disease_bool && delete_disease_id===disease.id) ?
                                    <><button onClick={() => deleteHandler(disease.id)} className='btn ml-4'> <i class="fa-solid fa-check"></i> </button>
                                    <button onClick={() => deleteButtonHandler(disease.id)} className='btn ml-2'> <i class="fa-solid fa-xmark"></i></button></>
                                    :<></>

                                    }


                                    {(delete_disease_bool && delete_disease_id===disease.id)?
                                    <></>
                                    :<>
                                    <Link to={`/admin/disease/edit/${disease.crop.title}/${disease.title}`}>
                                        <button className='btn mx-3'> <i className='fas fa-edit'></i> </button>
                                    </Link>
                                    <button onClick={() => deleteButtonHandler(disease.id)} className='btn'> <i className='fas fa-trash'></i> </button></>
                                    }
                                
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <div className="flex justify-center m-10">
                <Paginate pages={total_page} page={cur_page} dispatcher_action={listDiseases}/>
                </div>
            </div>}
        


        </div>
        </div>
        </div>
        </div>
        </div>
    )
}

export default DiseaseListScreen