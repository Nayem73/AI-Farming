import React from 'react'
import { Link } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload.js';




const AISearchScreen = () => {

    
    

    return (
        <div className='lg:px-20 mt-10 mr-5 ml-5'>
        
            <div className='py-4 flex justify-left'>
                <Link to={'/admin/productlist'}>
                    <button className=' btn btn-primary w-24'>Back</button>
                </Link>
            </div>
            <h1 className='text-3xl font-bold justify-center items-center '>Image Search</h1>
            <ImageUpload/>

        </div>
    );
    
}


export default AISearchScreen





