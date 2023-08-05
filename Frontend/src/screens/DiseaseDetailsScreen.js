
import React, {useEffect } from 'react';
import Slider from '../components/Slider';
import {useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { listDiseaseDetails } from '../actions/diseaseActions';
import { listPictures } from '../actions/pictureActions';
import {AI_SEARCH_RESET} from '../constants/diseaseConstants'

// Components
import Loader from '../components/Loader';
import Message from '../components/Message';

// Markdown
import MDEditor from '@uiw/react-md-editor';



const DiseaseDetailsScreen = () => {
    const params = useParams();
    const crop_title = params.crop_title
    const disease_title = params.disease_title



    const dispatch = useDispatch();

    const diseaseDetails = useSelector(state => state.diseaseDetails);

    const { loading, error, disease } = diseaseDetails;

    const pictureList = useSelector(state => state.pictureList);
    const { error:errorPicture, pictures } = pictureList;


    useEffect(() => {
        dispatch({type: AI_SEARCH_RESET})
        dispatch(listDiseaseDetails(crop_title, disease_title))
    }, [dispatch, crop_title, disease_title])

    useEffect(() => {
        if (disease.id !== undefined) {
            dispatch(listPictures(disease.id))
        }
    }, [disease])

    
    // console.log('pictures',)
    
    return (
    
        <>
        <div className='mt-10'>
        {loading ? (<Loader />) : errorPicture ? (<></>) : pictures.length>0? <Slider items={pictures}/>:<></>}
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