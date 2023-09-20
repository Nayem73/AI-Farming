
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
        if (disease !== undefined) {
            dispatch(listPictures(disease.id))
        }
    }, [dispatch, disease])

    
    // console.log('pictures',)
    
    return (
    
        <>
        <div className="container px-5 py-10 mx-auto ">
                <div className="flex flex-wrap -m-4">
                    
                    <div className="lg:p-4 md:p-4 w-full">
                        <div className="h-full lg:px-8 md:px-8 py-10 review">
                            <div className="flex flex-col items-center mb-3"></div>
                                <div className='mt-10 p-2'>
                                {loading ? (<Loader />) : errorPicture ? (<></>) : pictures.length>0? <Slider items={pictures}/>:<></>}
                                </div>
        
                                <div className='lg:px-20 mt-10'>

                                        
                                        
                                    <div className="w-full inline-flex items-center justify-center flex-shrink-0 lg:h-10 py-2 mb-5 text-blue-500 bg-blue-100 rounded-full dark:bg-blue-500 dark:text-blue-100">
                                        <h2 className="px-8 font-bold text-xl title-font">{crop_title} {disease_title}</h2>
                                    </div>
                                    {disease_title === 'Healthy'?
                                    <div className='flex justify-center'>
                                    <div class="p-4 mt-4 text-sm w-max text-black bg-green-400 rounded-lg dark:bg-green-400" role="alert">
                                    <span class="font-medium">No disease detected</span>
                                    </div>
                                    </div>
                                    :<>
                                    {loading ? (<Loader />) : error ? <div className='flex justify-center'><Message message={error} /></div> : <div className="container md_div" data-color-mode="light">
                                    <MDEditor.Markdown source={disease.description} style={{ whiteSpace: 'pre-wrap' }} className='md_show_div'/>
                                    </div>}</>}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

        </>


    );
}

export default DiseaseDetailsScreen