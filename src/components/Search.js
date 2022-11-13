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

    const [filter, setFilter] = useState('Category');

    const [search, setSearch] = useState('');

    const [isActive, setIsActive] = useState(false);

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleDropdown = (e) => {
        e.preventDefault();
        setIsActive(!isActive);
    }

    const handleFilter = (e) => {
        e.preventDefault();
        setFilter(e.target.value);
        setIsActive(!isActive);
    }

    const handleSubmit = () => {
        if(filter === 'Category' || filter === 'All'){
            setFilter('')
        }
    }

    return (
        <div className={styles.wrap}>
                <div className={styles.container}>
                    <div className={styles.category}>
                        <div className={styles.dropdown}>
                            <button className={styles.dropdown_btn} onClick={handleDropdown}>{filter ? filter : 'All'} <FontAwesomeIcon icon={faCaretDown} /></button>
                            <div className={isActive ? styles.dropdown_content : ''}>
                                {isActive && loading && <input type="button" className={styles.dropdown_link} value="Loading..." />}
                                {isActive && !loading && <input type="button" className={styles.dropdown_link} onClick={handleFilter} value="All" />}
                                {isActive && !loading &&
                                    categories.map(category =>
                                        <input key={category.id} className={styles.dropdown_link} onClick={handleFilter} defaultValue={category.name} />
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.input_container}>
                        <input type="text" placeholder='Search' value={search} onChange={handleSearch} />
                    </div>
                    <div className={styles.btn_container}>
                        <a href={filter ? `products?search=${search}&filter=${filter}` : `products?search=${search}`} className={styles.search_btn} onClick={handleSubmit}><FontAwesomeIcon icon={faMagnifyingGlass} /></a>
                    </div>
                </div>
        </div>
    )
}

export default Search