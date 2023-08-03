import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProfileScreen = () => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;


    useEffect(() => {
        if (!userInfo) {
            history(`/login`)
        }
        dispatch(getUserDetails());
    }, [dispatch])



    return (
        <div className='lg:px-20 mt-10 mr-5 ml-5'>

            <h1 className='text-xl font-bold un'><u>Profile</u></h1>
            {loading ? <Loader /> : error ? <Message message={error} /> :
            <div className='container py-2 '>
                <h3> <strong>Username : </strong>{user.userName}</h3>
                <h3> <strong>Email : </strong>{user.email}</h3>
                <h3> <strong>Search Left : </strong>{user.searchLeft}</h3>
            </div>
            }
            
        </div>
    )
}

export default ProfileScreen;