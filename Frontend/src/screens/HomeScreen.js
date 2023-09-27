import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';



import Loader from '../components/Loader';
import Message from '../components/Message';
import DiseaseCard from '../components/DiseaseCard';
import { listDiseases } from '../actions/diseaseActions';
// import {sliderPicture} from '../actions/pictureActions'; 


import Slider from '../components/Slider';

import Paginate from '../components/Paginate'



function HomeScreen() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const crop_title = queryParams.get('crop');
    const search = queryParams.get('search');

    const dispatch = useDispatch();

    const diseaseList = useSelector(state => state.diseaseList);
    const { loading, error ,diseases, cur_page, total_page } = diseaseList;

    // const pictureSlider = useSelector(state => state.pictureSlider);
    // const { error:errorSliser, diseases:diseaseSlider } = pictureSlider;


    useEffect(() => {
        if (crop_title && search) {
            dispatch(listDiseases({crop:crop_title, search:search}))
        } else if (crop_title) {
            dispatch(listDiseases({crop:crop_title}))
        } else if (search) {
            dispatch(listDiseases({search:search}))
        } else {
            dispatch(listDiseases())
        }
    }, [dispatch, crop_title, search])

    // useEffect(() => {
    //     dispatch(sliderPicture())
    // }, [dispatch])

    return (
        <>  
            <div className='mt-5'></div>
            {loading ? (<Loader />) : error ? <></> :<Slider items={diseases}/>}
            

            <div className='lg:px-20 mt-10'>
                {loading ? (<Loader />) : error ? (<Message message={error} />) : <div className=' grid lg:grid-cols-5 md:grid-cols-3  gap-2 flex-col items-center justify-center '>
                    {diseases.map((disease) => <DiseaseCard key={disease.id} disease={disease} />)}
                
                </div>}
                <div className="flex justify-center m-10">
                {loading ? <></> : error ? <></> :<Paginate pages={total_page} page={cur_page} dispatcher_action={listDiseases}/>}
                </div>
                
            </div>
        </>
    )
}

export default HomeScreen