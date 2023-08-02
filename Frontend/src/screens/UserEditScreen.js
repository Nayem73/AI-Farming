import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser, } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { USER_EDIT_RESET } from '../constants/userConstants';

const UserEditScreen = () => {
    const params = useParams();
    const userId = params.id;
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isAdmin, setIsAdmin] = useState(true);

    const history = useNavigate();
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdate = useSelector(state => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_EDIT_RESET });
            history('/admin/userlist');
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin === "true")
            }
        }
    }, [user, history, successUpdate])


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({_id: userId, name, email, isAdmin}))
    }


    return (
        <FormContainer>

            <div>
                <form onSubmit={submitHandler}>
                    <div className="form-control w-full  ">
                        <br />
                        <h1 className='text-3xl'>Edit User</h1>
                        {loading && <Loader />}
                        {error && <Message message={error} />}
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
                    <div className="form-control">
                        <label className="cursor-pointer label">
                            <span className="label-text">Set as Admin</span>
                            <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} className="checkbox checkbox-success" />
                        </label>
                    </div>
                    <div className='py-4 flex justify-center items-center'>
                        <button type='submit' className=' btn btn-primary w-24'>Update</button>
                    </div>
                    <div className='py-4 flex justify-center items-center'>
                        <Link to={'/admin/userlist'}>
                        <button  className=' btn btn-primary w-24'>Back</button>
                        </Link>
                    </div>
                </form>
            </div>
        </FormContainer>
    )
}


export default UserEditScreen