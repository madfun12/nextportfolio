import Link from 'next/link'
import styles from '../styles/blogPage.module.scss'
import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/router';

export default function BlogPage(props){
    const router = useRouter();
    const [mobileActive, setMobileActive] = React.useState(false);
    
    function toggleMobile(){
      setMobileActive(prevState => !prevState)
    }


    return(<>
        <Head>
            <meta charSet="UTF-8"></meta>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
            <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Roboto+Mono&display=swap" rel="stylesheet"/>
        </Head>
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.hamburger} onClick={toggleMobile}>
                <div className={mobileActive === false ? styles.patty : styles.pattyActive}></div>
                </div>
            </header>
            {<div className={styles.sideMenu} style={{right: mobileActive ? '0' : '-200px'}}>
            <ul className={styles.navholder}>
                <li className={styles.navitem}><Link href="/"><a style={router.pathname == "/" ? {color:'rgb(63, 156, 255)'} : {}}>Home</a></Link></li>
                <li className={styles.navitem}><Link href="/about"><a style={router.pathname == "/about" ? {color:'rgb(255, 0, 0)'} : {}}>About</a></Link></li>
                <li className={styles.navitem}><Link href="/blog"><a style={router.pathname == "/blog" ? {color:'rgb(0, 185, 77)'} : {}}>Blog</a></Link></li>
                <li className={styles.navitem}><Link href="/contact"><a style={router.pathname == "/contact" ? {color:'rgb(3, 100, 255)'} : {}}>Contact</a></Link></li>
            </ul>
            </div>}
            {props.children}
        </div>
        </>
    )
}