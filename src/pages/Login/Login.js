import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link, useLocation } from 'react-router-dom';

// Actions
import { postLogin, resetError } from '../../state/features/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {error, loading} = useSelector(state => state.auth)

    const location = useLocation();
    const registered = location.state

    const dispatch = useDispatch();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postLogin({email, password}))
        if (!error) dispatch(resetError());
    }

    useEffect(() => {
        dispatch(resetError());
    }, [location])

    return (
        <div className='form_container'>
            <p className='form_title'>Login to your account!</p>
            {error && <p className='form_error'>Invalid email or password</p>}
            {registered && <p className='form_message'>Account created successfully!</p>}
            <form className='form' onSubmit={handleSubmit}>
                <div className='input_container'>
                    <span><FontAwesomeIcon icon={faEnvelope} /></span>
                    <input type="text" placeholder='Email' autoFocus value={email} onChange={handleEmail} />
                </div>
                <div className='input_container'>
                    <span><FontAwesomeIcon icon={faLock} /></span>
                    <input type="password" placeholder='Password' value={password} onChange={handlePassword} />
                </div>
                <div className='submit_container'>
                    <input type="submit" className={`form_submit ${loading ? 'disabled' : ''}`} value={loading ? 'Loading' : 'Login'} disabled={loading}/>
                </div>
                <div className='buttons_container'>
                    <Link to="/register">Register</Link>
                    <a href="#">Forgot password</a>
                </div>
            </form>
        </div>
    )
}

export default Login