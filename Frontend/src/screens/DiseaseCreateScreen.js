import React from 'react'
import { Link } from 'react-router-dom';
import FormDisease from '../components/FormDisease.js';




const DiseaseCreateScreen = () => {

    
    

    return (
        <div className='lg:px-20 mt-10 mr-5 ml-5'>
        
        <div className='py-4 flex justify-left'>
            <Link to={'/admin/disease/'}>
                <button className=' btn btn-primary w-24'>Back</button>
            </Link>
        </div>
        <h1 className='text-3xl font-bold justify-center items-center'>ADD Disease</h1>
        <FormDisease/>

    </div>
    );
    
}


export default DiseaseCreateScreen