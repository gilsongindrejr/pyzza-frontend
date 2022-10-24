import styles from './Search.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';
import { useFetchCategories } from '../hooks/useFetchCategories';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

const Search = () => {
    const { categories, loading } = useSelector(state => state.category)

    const [selectedCategory, setSelectedCategory] = useState('Category');

    const [isActive, setIsActive] = useState(false);

    const handleDropdown = (e) => {
        e.preventDefault();
        setIsActive(!isActive);
    }

    const handleSelectedCategory = (e) => {
        e.preventDefault();
        setSelectedCategory(e.target.value);
        setIsActive(!isActive);
    }

    return (
        <div className={styles.wrap}>
            <form action="" className={styles.form}>
                <div className={styles.form_container}>
                    <div className={styles.form_category}>
                        <div className={styles.dropdown}>
                            <button className={styles.dropdown_btn} onClick={handleDropdown}>{selectedCategory} <FontAwesomeIcon icon={faCaretDown} /></button>
                            <div className={isActive ? styles.dropdown_content : ''}>
                                {isActive && loading && <input type="button" className={styles.dropdown_link} value="Loading..." />}
                                {isActive && !loading && <input type="button" className={styles.dropdown_link} onClick={handleSelectedCategory} value="All" />}
                                {isActive && !loading &&
                                    categories.map(category =>
                                        <input key={category.id} className={styles.dropdown_link} onClick={handleSelectedCategory} value={category.category} />
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.form_input}>
                        <input type="text" placeholder='Search' />
                    </div>
                    <div className={styles.form_btn}>
                        <button type='submit' className={styles.search_btn}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Search