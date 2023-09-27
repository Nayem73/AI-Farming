

import ImageUpload from '../components/ImageUpload.js';

import React, {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';

// constants
import {PICTURE_LIST_RESET} from '../constants/pictureConstants'
import {DISEASE_DETAIL_RESET} from '../constants/diseaseConstants'


const AISearchScreen = () => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const history = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch({type: PICTURE_LIST_RESET})
        dispatch({type: DISEASE_DETAIL_RESET})
        if (!userInfo) {
            history('/login')
        }
    }, [history, userInfo])
    

    return (
        <div className='lg:px-20 mt-10 mr-5 ml-5'>
        
            <div className='py-4 flex justify-left'>
                <Link to={'/'}>
                    <button className=' btn btn-primary w-24'>Back</button>
                </Link>
            </div>
            <h1 className='text-3xl font-bold justify-center items-center '>Image Search</h1>
            <ImageUpload/>

        </div>
    );
    
}


export default AISearchScreen





