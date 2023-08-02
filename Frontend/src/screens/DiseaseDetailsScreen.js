
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { listDiseaseDetails } from '../actions/diseaseActions.js';
import Loader from '../components/Loader.js';
import Message from '../components/Message.js';
import MDEditor from '@uiw/react-md-editor';

const DiseaseDetailsScreen = () => {
    const params = useParams();
    const crop_title = params.crop_title
    const disease_title = params.disease_title



    const dispatch = useDispatch();

    const diseaseDetails = useSelector(state => state.diseaseDetails);

    const { loading, error, disease } = diseaseDetails;


    useEffect(() => {
        dispatch(listDiseaseDetails(crop_title, disease_title))
    }, [dispatch, crop_title, disease_title])

    // console.log('details',disease)
    // const value = `hemel
    // akash
    // sharker`;
    // console.log(value)


    // return (
    
    // <div className="container md_div" data-color-mode="light">
        
    //     <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} className='md_show_div'/>
    // </div>
    // );
    return (
    
        <>
        <div className='lg:px-20 mt-10'>
        
            
                {/* {loading ? (<Loader />) : error ? (<Message message={error} />) : <div className=' grid lg:grid-cols-5 md:grid-cols-3  gap-2 flex-col items-center justify-center '>
                    {products.map((product) => <ProductCard key={product._id} props={product} />)}
                </div>} */}


                {loading ? (<Loader />) : error ? (<Message message={error} />) : <div className="container md_div" data-color-mode="light">
                <MDEditor.Markdown source={disease.description} style={{ whiteSpace: 'pre-wrap' }} className='md_show_div'/>
                </div>}






                </div>
            </>


    // <div className="container md_div" data-color-mode="light">
        
    //     <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} className='md_show_div'/>
    // </div>
    );
}

export default DiseaseDetailsScreen