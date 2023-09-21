import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions';
import { USER_REGISTER_FAILED } from '../constants/userConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';
import SuccessMessage from '../components/SuccessMessage';


const RegisterScreen = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');



    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, message:registerSuccessMessage } = userRegister;



    useEffect(() => {
        if (registerSuccessMessage){
            // reset signupForm
            document.getElementById('signupForm').reset();
        }
    }, [registerSuccessMessage, loading])


    const submitHandler = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('userName', name);
        formDataToSend.append('email', email);
        formDataToSend.append('password', password);

        if (password !== confirmPassword)
        {
            dispatch({
                type: USER_REGISTER_FAILED,
                payload: 'Password and Confirm Password do not match'
            })
        }
        else {
            dispatch(register(formDataToSend))
        }
    }

    return (
        <>
        <div className='flex justify-center'>
            {registerSuccessMessage && <SuccessMessage message={registerSuccessMessage} />}
            {error && <Message message={error} />}
        </div>
        
        <FormContainer>

        <div>
            
            {loading && <Loader />}
            <form id='signupForm' onSubmit={submitHandler}>
            <div className="form-control w-full  ">
                    <br />
                    <h1 className='text-3xl'>Sign Up</h1>
                    <br />
                    <label className="label">
                        <span className="label-text">Username</span>
                    </label>
                    <input  placeholder="Enter your Username" className="input input-bordered w-full max-w-xs" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-control w-full  ">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Enter your email" className="input input-bordered w-full max-w-xs" onChange={(e) => setEmail(e.target.value)} />
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
                    <button type='submit' className=' btn btn-primary w-24'>Register</button>
                </div>
                <div>

                    <h3>Already have any account?  <Link to="/login"> <strong>Sign in</strong> </Link>
                    </h3>
                </div>
            </form>
        </div>
        </FormContainer>
        
        </>
    )
}

export default RegisterScreen;