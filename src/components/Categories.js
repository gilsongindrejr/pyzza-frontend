import styles from './Categories.module.css';


import { useSelector } from 'react-redux';

const Categories = () => {

    const {categories, loading} = useSelector(state => state.category)

    return (
        <div className={styles.categories}>
            {loading && <p className={styles.loading}>Loading...</p>}
            <a href="/products" className={styles.btn_cat}>Products</a>
            {categories && categories.map(category => (
                <a href={`/products?filter=${category.name}`} key={category.id} className={styles.btn_cat}>{category.name}</a>
            ))}
        </div>
    )
}

export default Categories