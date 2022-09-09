import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/topPage.module.scss'
import Head from 'next/head'
import { useRouter } from 'next/router';

export default function TopPage(props){
    const router = useRouter();
    return(<>
        <Head>
        </Head>
        <div className={styles.container}>
        <header className={styles.header}>
        <Image src='/../public/madfunlogo.png' width={150} height={25}/>
        <nav>
          <ul className={styles.navholder}>
            <li className={styles.navitem}><Link href="/"><a style={router.pathname == "/" ? {color:'rgb(63, 156, 255)'} : {}}>Home</a></Link></li>
            <li className={styles.navitem}><Link href="/about"><a style={router.pathname == "/about" ? {color:'rgb(255, 0, 0)'} : {}}>About</a></Link></li>
            <li className={styles.navitem}><Link href="/blog"><a style={router.pathname == "/blog" ? {color:'rgb(63, 156, 255)'} : {}}>Blog</a></Link></li>
            <li className={styles.navitem}><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
        </header>
        {props.children}
        </div>
        </>
    )
}