import styles from '../styles/project.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function Project(props){
    
    return(
        <div className={styles.project}>
            <div className={styles.imageHolder}>
                <Image src={props.img}
                    width={290}
                    height={150}
                    alt=''
                />
            </div>
            <h2>{props.title}</h2>
            <p>{props.desc}</p>
            {props.children}
        </div>
    )
}