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
        <div className='lg:px-20 mt-10 mr-5 ml-5 mb-10 review'>

            
            <div className="my-5 w-full inline-flex items-center justify-center flex-shrink-0 h-10 mb-5 text-blue-500 bg-blue-100 rounded-full dark:bg-blue-500 dark:text-blue-100">
                <h2 className="px-8 font-bold text-xl title-font">Profile</h2>
            </div>
            {loading ? <Loader /> : error ? <Message message={error} /> :


            <div className="container px-5 py-10 mx-auto ">
                <div className="flex flex-wrap -m-4">

                    {/* profile */}
                    <div className="p-4 lg:w-1/3 md:w-1/2">
                        <div className="h-full px-8 py-10 review">
                            <div className="flex flex-col items-center mb-3">
                                <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 text-blue-500 bg-blue-100 rounded-full dark:bg-blue-500 dark:text-blue-100">
                                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-12c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm7 12h-2v-1c0-1.657-1.343-3-3-3H10c-1.657 0-3 1.343-3 3v1H5c-1.104 0-2 .896-2 2v2c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2v-2c0-1.104-.896-2-2-2zm-7 3a3 3 0 0 0 0-6 3 3 0 0 0 0 6z"></path>
                                </svg>


                                </div>
                                <div className="flex-grow">
                                    <h2 className="mb-3 text-lg font-medium text-gray-900 title-font"><strong>Username : </strong>{user.userName}</h2>
                                    <p className="text-sm text-gray-500"><strong>Email : </strong>{user.email}</p>
                                    <p className="text-sm text-gray-500"><strong>Search Left : </strong>{user.searchLeft}</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reset password */}



                </div>
            </div>










            }
            
        </div>
    )
}

export default ProfileScreen;