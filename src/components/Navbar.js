import styles from './Navbar.module.css';

import { Link, useLocation } from 'react-router-dom';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import logo from '../pyzza.png'

// Components
import Search from './Search';
import Categories from './Categories';

// Actions
import { getCategories } from '../state/features/categorySlice';

const Navbar = () => {
    const location = useLocation()

    const {logged} = useSelector(state => state.auth)

    const dispatch = useDispatch()

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
                            <Link to="#" className='btn btn_white'>Register</Link>
                            <Link to="/login" className='btn btn_crimson'>Login</Link>
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