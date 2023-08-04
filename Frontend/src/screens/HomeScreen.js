import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';



import Loader from '../components/Loader';
import Message from '../components/Message';
import DiseaseCard from '../components/DiseaseCard';
import CategoryName from '../components/CategoryName';
import { listDiseases } from '../actions/diseaseActions';


import Slider from '../components/Slider';



function HomeScreen() {

    const dispatch = useDispatch();

    const params = useParams();
    const keyword = params.keyword;
    console.log('params', params);

    const diseaseList = useSelector(state => state.diseaseList);

    const { loading, error, diseases } = diseaseList;


    useEffect(() => {
        dispatch(listDiseases(keyword))
    }, [dispatch, keyword])

    return (
        <>
            <div className='lg:px-20 mt-10'>
            <Slider/>
            </div>
            
            <div className='centered-select py-5'>
                
                    <div>
                        <CategoryName />
                    </div>
                </div>

            <div className='lg:px-20 mt-10'>
                {loading ? (<Loader />) : error ? (<Message message={error} />) : <div className=' grid lg:grid-cols-5 md:grid-cols-3  gap-2 flex-col items-center justify-center '>
                    {diseases.map((disease) => <DiseaseCard key={disease.id} disease={disease} />)}
                </div>}
    
            </div>
        </>
    )
}

export default HomeScreen