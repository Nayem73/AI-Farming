import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useParams, useNavigate } from 'react-router-dom';

import { listDiseaseDetails, updateDisease } from '../actions/diseaseActions.js';
import Loader from '../components/Loader.js';
import Message from '../components/Message.js';
import FormDisease from '../components/FormDisease.js';
import { DISEASE_CREATE_RESET, DISEASE_UPDATE_RESET } from '../constants/diseaseConstants.js';

const DiseaseEditScreeen = () => {
    const params = useParams();
    const crop_title = params.crop_title
    const disease_title = params.disease_title
    const redirect_url = '/admin/disease/'

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;


    const dispatch = useDispatch();
    const history = useNavigate();

    const diseaseDetails = useSelector(state => state.diseaseDetails);
    const diseaseUpdate = useSelector(state => state.diseaseUpdate);

    const { loading, error, disease } = diseaseDetails;
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = diseaseUpdate;




    useEffect(() => {
        if (!userInfo.isAdmin) {
            history('/login')
        }
        dispatch(listDiseaseDetails(crop_title, disease_title))
        if (successUpdate) {
            dispatch({ type: DISEASE_UPDATE_RESET });
            history(redirect_url)

        }
    }, [ dispatch, successUpdate, successUpdate])
    
    // console.log('edit page',disease)


    return (
        <div className='lg:px-20 mt-10 mr-5 ml-5'>
        <div className='py-4 flex justify-left'>
            <Link to={'/admin/disease/'}>
                <button className=' btn btn-primary w-24'>Back</button>
            </Link>
        </div>
        <h1 className='text-3xl font-bold justify-center items-center'>Update Disease</h1>
        {loading ? (<Loader />) : error ? (<Message message={error} />) :
            (Object.keys(disease).length > 0 && disease.id ? (
            <FormDisease existingData={disease} />
            ) : (
            <p>Loading...</p>
            ))
        }
        </div>
    );
    

};

export default DiseaseEditScreeen;
