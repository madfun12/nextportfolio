import Image from 'next/image'
import styles from '../../styles/florist.module.scss'

export default function FlowerLink(props){
return(
    <div className={styles.flowerItem}>
        <Image src={props.imagePath} width={150} height={175} alt=""/>
        <div className={styles.itemInfo}>
            <h4>{props.title}</h4>
            <span>
                <p className={styles.price}>${props.price}</p>
            </span>
            <a href={props.link} className={styles.buyNow}>Buy Now</a>
        </div>
    </div>
)
}