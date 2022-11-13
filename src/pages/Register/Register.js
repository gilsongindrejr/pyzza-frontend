import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useRegisterUser } from '../../hooks/useRegisterUser';

const Register = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cpf, setCpf] = useState('');
  
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [data, setData] = useState(null);

  const { loading, registerUser } = useRegisterUser();

  const fieldsWithErrors = data ? Object.keys(data) : []

  const handleSubmit = async (e) => {
    e.preventDefault();

    setConfirmPasswordError(false);
    setEmailErrorMessage('')

    // Does the request without the password just to get error on other fields
    if (confirmPassword === '' || confirmPassword !== password) {
      setConfirmPasswordError(true);
      const registerData = await registerUser({ email, first_name: firstName, last_name: lastName, cpf });
      setData(registerData)
      if (!loading && registerData) {
        if (registerData.email) {
          if (registerData.email[0] === 'user with this email already exists.') setEmailErrorMessage(registerData.email[0]);
        }
      }
      return;
    }

    if (!email.includes('@')) return;

    const data = registerUser({ email, password, first_name: firstName, last_name: lastName, cpf });
    if (!loading) navigate('/login', { state: { registered: true } });
  }

  return (
    <div className='form_container'>
      <p className='form_title'>Register to use the app!</p>
      {emailErrorMessage && <p className='form_error'>{emailErrorMessage}</p>}
      <form className='form' onSubmit={handleSubmit}>
        <div className={`input_container ${fieldsWithErrors.includes('email') ? 'input_error' : ''}`}>
          <span><FontAwesomeIcon icon={faEnvelope} /></span>
          <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
        </div>

        <div className={`input_container ${fieldsWithErrors.includes('password') ? 'input_error' : ''}`}>
          <span><FontAwesomeIcon icon={faLock} /></span>
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className={`input_container ${confirmPasswordError ? 'input_error' : ''}`}>
          <span><FontAwesomeIcon icon={faLock} /></span>
          <input type="password" placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>

        <div className={`input_container ${fieldsWithErrors.includes('first_name') ? 'input_error' : ''}`}>
          <span><FontAwesomeIcon icon={faUser} /></span>
          <input type="text" placeholder='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>

        <div className={`input_container ${fieldsWithErrors.includes('last_name') ? 'input_error' : ''}`}>
          <span><FontAwesomeIcon icon={faUser} /></span>
          <input type="text" placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div className={`input_container ${fieldsWithErrors.includes('cpf') ? 'input_error' : ''}`}>
          <span><FontAwesomeIcon icon={faIdCard} /></span>
          <input type="text" placeholder='CPF' value={cpf} onChange={(e) => setCpf(e.target.value)} />
        </div>

        <div className='submit_container'>
          <input type="submit" className={`form_submit ${loading ? 'disabled' : ''}`} value={loading ? 'Loading' : 'Register'} disabled={loading} />
        </div>
        <div className='buttons_container'>
          <Link to="/login">Already has an account?</Link>
        </div>
      </form>
    </div>
  )
}

export default Register