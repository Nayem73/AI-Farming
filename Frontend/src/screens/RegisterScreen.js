import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import SuccessMessage from '../components/SuccessMessage';

const RegisterScreen = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMassage] = useState(null)


    const history = useNavigate();
    const redirect = window.location.search ? window.location.search.split('=')[1] : '/'
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            history(redirect)
        }
    }, [history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('userName', name);
        formDataToSend.append('email', email);
        formDataToSend.append('password', password);

        if (password !== confirmPassword)
        {
            setMassage(`Password don't match `)
        }
        else {
            dispatch(register(formDataToSend))
        }
    }


    return (
        <FormContainer>

        <div>
            {message && <SuccessMessage message={message} />}
            {error && <Message message={error} />}
            {loading && <Loader />}
            <form onSubmit={submitHandler}>
            <div className="form-control w-full  ">
                    <br />
                    <h1 className='text-3xl'>Sign Up</h1>
                    <br />
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input  placeholder="Enter your Name" className="input input-bordered w-full max-w-xs" onChange={(e) => setName(e.target.value)} />
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

                    <h3>Already have any account?  <Link to={redirect ? `/login?redirect=${redirect}` : '/register'}> <strong>Sign in</strong> </Link>
                    </h3>
                </div>
            </form>
        </div>
        </FormContainer>
    )
}

export default RegisterScreen;