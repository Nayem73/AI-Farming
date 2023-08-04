
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { listDiseaseDetails } from '../actions/diseaseActions.js';
import Loader from '../components/Loader.js';
import Message from '../components/Message.js';
import MDEditor from '@uiw/react-md-editor';
import Slider from '../components/Slider';
import { listPictures } from '../actions/pictureActions';

const DiseaseDetailsScreen = () => {
    const params = useParams();
    const crop_title = params.crop_title
    const disease_title = params.disease_title



    const dispatch = useDispatch();

    const diseaseDetails = useSelector(state => state.diseaseDetails);

    const { loading, error, disease } = diseaseDetails;

    const pictureList = useSelector(state => state.pictureList);
    const { loading:loadingPicture, error:errorPicture, pictures } = pictureList;


    useEffect(() => {
        dispatch(listDiseaseDetails(crop_title, disease_title))
    }, [dispatch, crop_title, disease_title])

    useEffect(() => {
        if (disease) {
            dispatch(listPictures(disease.id))
        }
    }, [disease])

    
    console.log('pictures',)
    
    return (
    
        <>
        <div className='mt-10'>
        {loading ? (<Loader />) : error ? (<Message message={error} />) : pictures.length>0? <Slider items={pictures}/>:<></>}
        </div>
        
        <div className='lg:px-20 mt-10'>

                {loading ? (<Loader />) : error ? (<Message message={error} />) : <div className="container md_div" data-color-mode="light">
                <MDEditor.Markdown source={disease.description} style={{ whiteSpace: 'pre-wrap' }} className='md_show_div'/>
                </div>}






                </div>
            </>


    );
}

export default DiseaseDetailsScreen