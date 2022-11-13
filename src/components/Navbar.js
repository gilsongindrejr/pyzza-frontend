import styles from './Navbar.module.css';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import logo from '../pyzza.png'

// Components
import Search from './Search';
import Categories from './Categories';

// Actions
import { getCategories } from '../state/features/categorySlice';
import { logout } from '../state/features/authSlice';

import { useLogoutUser } from '../hooks/useLogoutUser';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {status, loading, logoutUser} = useLogoutUser();

    const {logged, token} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        await logoutUser(token);
        dispatch(logout());
        navigate('/')
    }

    useEffect(() => {
        dispatch(getCategories());
    }, [])

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <Link to="/"><img src={logo} alt="logo" /></Link>
                </div>
                <div className={styles.buttons}>
                    {!logged &&
                     location.pathname !== '/login' &&
                     location.pathname !== '/register' &&
                        <div className={styles.buttons_container}>
                            <Link to="/register" className='btn btn_white'>Register</Link>
                            <Link to="/login" className='btn btn_crimson'>Login</Link>
                        </div>
                    }
                    {logged && 
                        <div className={styles.buttons_container}>
                            <Link to="/profile" className='btn btn_crimson'>Profile</Link>
                            <button className={styles.logout} onClick={handleLogout}>Logout</button>
                        </div>
                    }
                </div>
                <div className={styles.search}>
                    <Search />
                </div>
            </nav>
            <div className={styles.categories}>
                <div>
                    <Categories />
                </div>
            </div>
        </>
    )
}

export default Navbar