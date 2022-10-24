import styles from './Categories.module.css';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

const Categories = () => {

    const {categories, loading} = useSelector(state => state.category)

    return (
        <div className={styles.categories}>
            {loading && <p className={styles.loading}>Loading...</p>}
            {categories && categories.map(category => (
                <Link to="#" key={category.id} className={styles.btn_cat}>{category.category}</Link>
            ))}
        </div>
    )
}

export default Categories