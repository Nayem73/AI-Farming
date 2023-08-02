import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { listDiseases, deleteDisease, createDisease } from '../actions/diseaseActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { DISEASE_CREATE_RESET } from '../constants/diseaseConstants';

const DiseaseListScreen = () => {
    const dispatch = useDispatch();
    const diseaseList = useSelector(state => state.diseaseList);
    const { loading, error, diseases } = diseaseList;
    const history = useNavigate();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const diseaseDelete = useSelector(state => state.diseaseDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = diseaseDelete;


    useEffect(() => {
        if (!userInfo.isAdmin) {
            history('/login')
            dispatch(listDiseases())
        }
        dispatch(listDiseases())
    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        // dispatch(deleteUser(id))
        dispatch(deleteDisease(id))
    }

    const createDiseaseHandler = () => {
        //creaet a new disease
        dispatch(createDisease())
    }

    return (
        <div className='px-5'>
            <h1 className='text-xl font-bold py-3'>diseases</h1>
            {loading ? <Loader /> : error ? <Message message={error} /> : <div className="overflow-x-auto">
            <Link to={'/admin/disease/create/'}>
                <button className='btn items-center justify-center mb-3'>ADD DISEASE</button>
            </Link>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th></th>
                            <th>Disease</th>
                            <th></th>
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
                                <td></td>
                                <td>{disease.crop.title}</td>
                                {/* <td>{disease.isAdmin ? (<i className='fas fa-check' style={{ color: 'green' }}> </i>) : (<i className='fas fa-items' style={{ color: 'red' }}></i>)}</td> */}

                                <td>
                                    <Link to={`/admin/disease/edit/${disease.crop.title}/${disease.title}`}>
                                        <button className='btn mx-3'> <i className='fas fa-edit'></i> </button>
                                    </Link>
                                    <button onClick={() => deleteHandler(disease.id)} className='btn'> <i className='fas fa-trash'></i> </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
        </div>
    )
}

export default DiseaseListScreen