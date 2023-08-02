import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUserDetails, rechargeUser, updateUerProfile } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listMyOrders } from '../actions/orderActions';
import SuccessMessage from '../components/SuccessMessage';

const ProfileScreen = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMassage] = useState(null)

    const history = useNavigate();
    const redirect = window.location.search ? window.location.search.split('=')[1] : '/'
    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const orderListMy = useSelector(state => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    const userRecharge = useSelector(state => state.userRecharge);
    const { loading: loadingRecharge, error: errorRecharge, success: successRecharge } = userRecharge;

    useEffect(() => {
        if (!userInfo) {
            history(`/login`)
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'));
                dispatch(listMyOrders());
            } else {
                setName(user.name);
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user])


    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMassage(`Password don't match `)
        }
        else {
            dispatch(updateUerProfile({ id: user._id, name, email, password }))
        }
    }

    const rechargeHandler = (e) => {
        e.preventDefault();
        dispatch(rechargeUser(user._id, token))
    }


    return (
        <div className='grid grid-cols-3'>
            <div className=' items-center justify-center'>
                {message && <Message message={message} />}
                {error && <Message message={error} />}
                {success && <SuccessMessage message={'Profile Updated Successfully'} />}
                {loading && <Loader />}
                <FormContainer>
                    <form onSubmit={submitHandler}>
                        <div className="form-control w-full  ">
                            <br />
                            <h1 className='text-3xl pt-2'>{user.isSuperAdmin === "true" ? 'Admin' : user.isAdmin === 'true' ? 'Buyer' : 'User'} Profile </h1>
                            <br />
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" value={name} placeholder="Enter your Name" className="input input-bordered w-full max-w-xs" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-control w-full  ">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" value={email} placeholder="Enter your email" className="input input-bordered w-full max-w-xs" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Password</span>

                            </label>
                            <input type="password" placeholder="Enter your password" className="input input-bordered w-full max-w-xs" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>

                            </label>
                            <input type="password" placeholder="Confirm your password" className="input input-bordered w-full max-w-xs" onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <div className='py-4 flex justify-center items-center'>
                            <button type='submit' className=' btn btn-primary w-24'>Update</button>
                        </div>
                    </form>
                </FormContainer>
            </div>

            <div className='col-span-2'>
                <div className=' mt-2'>

                    <h1 className='text-xl font-bold '>Account Balance</h1>
                    <div className='container py-2 '>
                        <h1 className='text-2xl'> {user.balance} Taka </h1>
                        <h1 className='font-bold py-2'> Enter your token here for recharge</h1>
                        <input type="text" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Code" className="input input-bordered input-success w-full max-w-xs" />
                        <button onClick={rechargeHandler} className='btn px-5 mx-2'> RECHARGE</button>
                        {loadingRecharge && <Loader />}
                        {successRecharge && <SuccessMessage message={'Recharge successfull'} />}
                        {errorRecharge && <Message message={errorRecharge} />}
                    </div>
                </div>
                <h1 className='text-xl font-bold pt-14 pb-4'>Order History</h1>
                <div>
                    {orders && orders.map(order => (
                        <div key={order._id} className="grid grid-cols-6 gap-2 border-b-2 h-10">
                            <h1 className='flex items-center justify-center'>{order._id}</h1>
                            <h1 className='flex items-center justify-center'>{order.createdAt.substring(0, 10)}</h1>
                            <h1 className='flex items-center justify-center'>{order.totalPrice}</h1>
                            <h1 className='flex items-center justify-center'>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }}></i>}</h1>
                            <h1 className='flex items-center justify-center'>{order.isDelivered ? order.isDeliveredAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }}></i>}</h1>
                            <h1>{errorOrders}</h1>
                            {/* <button >
                                    <i className='fas fa-trash'></i>
                                </button> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen;