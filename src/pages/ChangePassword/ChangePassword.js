import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faLock } from '@fortawesome/free-solid-svg-icons'

import { useChangePassword } from '../../hooks/useChangePassword'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
  const { token } = useSelector(state => state.auth);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState(false)
  const [passwordMatchError, setPasswordMatchError] = useState(false)

  const { loading, changePassword } = useChangePassword();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setOldPasswordError(false);
    setPasswordMatchError(false);

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords didn't match.")
      setPasswordMatchError(true)
      return;
    }

    const response = await changePassword({ old_password: oldPassword, new_password: newPassword }, token);
    if (response.status !== 204) {
      const data = await response.json();
      if (data.old_password) {
        if (data.old_password[0] === 'Wrong password.') {
          setErrorMessage(data.old_password[0]);
          setOldPasswordError(true);
        }
      }
    }
    navigate('/profile', { state: { changedPassword: true } })
  }

  return (
    <div className="form_container">
      <p className='form_title'>Change your password!</p>
      {errorMessage && <p className='form_error'>{errorMessage}</p>}
      <form className='form' onSubmit={handleSubmit}>
        <div className={`input_container ${oldPasswordError ? 'input_error' : ''}`}>
          <span><FontAwesomeIcon icon={faLock} /></span>
          <input type="password" placeholder='Old password' autoFocus value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        </div>

        <div className={`input_container ${passwordMatchError ? 'input_error' : ''}`}>
          <span><FontAwesomeIcon icon={faLock} /></span>
          <input type="password" placeholder='New password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>

        <div className={`input_container ${passwordMatchError ? 'input_error' : ''}`}>
          <span><FontAwesomeIcon icon={faLock} /></span>
          <input type="password" placeholder='Confirm new password' value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
        </div>

        <div className='submit_container'>
          <input type="submit" className={`form_submit ${loading ? 'disabled' : ''}`} value={loading ? 'Loading' : 'Change password'} disabled={loading} />
        </div>
      </form>
    </div>
  )
}

export default ChangePassword