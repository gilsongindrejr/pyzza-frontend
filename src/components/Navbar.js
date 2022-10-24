import styles from './Navbar.module.css';

import { Link } from 'react-router-dom';

import logo from '../pyzza.png'

import Search from './Search';
import Categories from './Categories';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCategories } from '../state/features/categorySlice';

const Navbar = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories());
    }, [])

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <Link to="#"><img src={logo} alt="logo" /></Link>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.buttons_container}>
                        <Link to="#" className='btn btn_white'>Register</Link>
                        <Link to="#" className='btn btn_crimson'>Login</Link>
                    </div>
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