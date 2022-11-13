import styles from './Profile.module.css';

import placeholder from '../../placeholder.jpg';

import { useSelector } from 'react-redux'
import { useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

const Profile = () => {
  const { user, address } = useSelector(state => state.auth)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [cpf, setCpf] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [street, setStreet] = useState('')
  const [houseNumber, setHouseNumber] = useState('')
  const [complement, setComplement] = useState('')

  const [editing, setEditing] = useState(false);

  const location = useLocation();
  const changedPassword = location.state

  const handleEditing = () => {
    setEditing(!editing)

    setFirstName(user.first_name)
    setLastName(user.last_name);
    setCpf(user.cpf);
    setZipCode(address.zip_code);
    setState(address.state);
    setCity(address.city);
    setNeighborhood(address.neighborhood);
    setStreet(address.street);
    setHouseNumber(address.house_number);
    setComplement(address.complement);
  }

  return (
    <div className={styles.container}>
      {changedPassword &&
        <p className='form_message' style={{ textAlign: "center" }}>Password changed successfully!</p>
      }
      <div className={styles.section}>
        <div className={styles.image}>
          <img src={user.image ? user.image : placeholder} alt="" />
        </div>
        <div className={styles.user_info}>
          <div className={styles.info_title}>
            <p>User info</p>
          </div>
          <p>First name: {!editing ? user.first_name : <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />}</p>
          <p>Last name: {!editing ? user.last_name : <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />}</p>
          <p>CPF: {!editing ? user.cpf : <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />}</p>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.account_info}>
          <div className={styles.info_title}>
            <p>Account info</p>
          </div>
          <p>Email: {user.email}</p>
          <Link to="/change_password">Change password</Link>
        </div>
      </div>

      <div className={styles.section}>
        {address &&
          <>
            <div className={styles.address_info}>
              <div className={styles.info_title}>
                <p>Address info</p>
              </div>
              <p>Zip code: {!editing ? address.zip_code : <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />}</p>
              <p>State: {!editing ? address.state : <input type="text" value={state} onChange={(e) => setState(e.target.value)} />}</p>
              <p>City: {!editing ? address.city : <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />}</p>
              <p>Neighborhood: {!editing ? address.neighborhood : <input type="text" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />}</p>
            </div>
            <div className={styles.address_info}>
              <p>Street: {!editing ? address.street : <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />}</p>
              <p>House number: {!editing ? address.house_number : <input type="text" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} />}</p>
              <p>Complement: {!editing ? address.complement : <input type="text" value={complement} onChange={(e) => setComplement(e.target.value)} />}</p>
            </div>
          </>
        }
      </div>

      <div className={styles.section}>
        {editing
          ?
          <button className='form_submit' onClick={() => setEditing(!editing)}>Save</button>
          :
          <button className='form_submit' onClick={handleEditing}>Edit</button>
        }
      </div>
    </div >
  )
}

export default Profile