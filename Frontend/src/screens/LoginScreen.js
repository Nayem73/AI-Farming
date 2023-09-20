import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();
    const redirect = window.location.search ? window.location.search.split('=')[1] : '/'
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history(redirect)
        }
    }, [history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('email', email);
        formDataToSend.append('password', password);
        dispatch(login(formDataToSend))
    }


    return (
        <FormContainer>

            <div>
                {error && <Message message={error} />}
                {loading && <Loader />}
                <form onSubmit={submitHandler}>
                    <div className="form-control w-full  ">
                        <br />
                        <h1 className='text-3xl'>Sign in</h1>
                        <br />
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
                    <div className='py-4 flex justify-center items-center'>
                        <button type='submit' className=' btn btn-primary w-24'>Login</button>
                    </div>
                    <div>
                        <h3>Don't have any account?  <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}> <strong>Create account</strong> </Link>
                        </h3>
                    </div>
                </form>
            </div>
        </FormContainer>
    )
}

export default LoginScreen