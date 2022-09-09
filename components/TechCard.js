import styles from '../styles/home.module.scss'
import Image from 'next/image'

export default function TechCard(props){
    return(
        <div className={styles.techCard}>
              <span className={styles.flexRow}>
              <div className={`${styles.techCardPic} ${styles.flexColumnCenter}`}>
                <Image src={props.img} height={40} width={40} objectFit='contain'/>
              </div>
              <h3>{props.title}</h3>
              </span>
              <p>{props.desc}</p>
        </div>
    )
}