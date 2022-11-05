import styles from './Products.module.css';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import ProductCard from '../../components/ProductCard';
import { getProducts } from '../../state/features/productSlice';

const Products = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get('search');
    const filter = searchParams.get('filter');
    const params = {}

    // set param only if he exist
    // that way the length of the param can be used
    search && (params.search = search)
    filter && (params.filter = filter)

    const {products, loading} = useSelector(state => state.product);

    useEffect(() => {
        dispatch(getProducts(params))
    }, [])

    return (
        <div className={styles.container}>
            {products && products.map(product => (
                <ProductCard key={product.id} image={product.image} name={product.name} desc={product.description} price={product.price} />
            ))}
            {!loading && products.length === 0 && <h1 className={styles.no_products}>Produts not found</h1>}
            {loading && <h1 className={styles.no_products}>Loading...</h1>}
        </div>
    )
}

export default Products