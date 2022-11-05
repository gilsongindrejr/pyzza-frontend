import styles from './ProductCard.module.css';

import placeholder from '../placeholder.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const ProductCard = (props) => {
    return (
        <div className={styles.card}>
            <div className={styles.product}>
                <div className={styles.image}>
                    <img src={props.image ? props.image : placeholder} alt="" />
                </div>
                <div className={styles.info}>
                    <div className={styles.product_name}>{props.name}</div>
                    <div className={styles.product_desc}>{props.desc}</div>
                </div>
            </div>
            <div className={styles.price}>
                <span>R$ {props.price}</span>
                <div className={styles.button}>
                    <a href="#" className='btn'>+ <FontAwesomeIcon icon={faCartShopping} /></a>
                </div>
            </div>
        </div>
    )
}

export default ProductCard