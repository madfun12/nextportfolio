import Image from 'next/image'
import styles from '../../styles/store.module.scss'

export default function FlowerLink(props){
return(
    <a href="#">
        <div className={styles.storeItem}>
            <Image src={props.imagePath} width={150} height={175} alt=""/>
            <div className={styles.itemInfo}>
                <h4>{props.title}</h4>
                <span>
                    <p className={styles.price}>${props.price}</p>
                </span>
                
            </div>
        </div>
    </a>
)
}