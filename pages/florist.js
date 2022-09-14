import React from 'react';
import styles from '../styles/florist.module.scss'
import Image from 'next/image'
import FlowerLink from '../components/telefloraTemplate/flowerLink';
import Head from 'next/head'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import flowerData from '../data/flowerData.json'

export default function Florist(){
    const [mobileActive, setMobileActive] = React.useState(false)

    const toggleMobile = () => {
        setMobileActive(prevState => (!prevState))
    }

    const getPattyStyle = () => {
        if(!mobileActive){
            return styles.patty
        }else{
            return styles.pattyactive
        }
    }

    return(
    <>
        <Head>
            <meta charSet="UTF-8"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <title>Florist Template</title>
        </Head>
        <div className={styles.body}>
            
            <header>
                <h1>Florist Shop</h1>
                <nav>
                    <ul>
                        <div className={styles.dropdown}>
                            <li><a href="">Occasions<FontAwesomeIcon icon={faAngleDown} className={styles.dropdownArrow}/></a></li>
                            <div className={styles.dropdownMenu}>
                                <div className={styles.dropdownColumn}>
                                    <ul>
                                        <li><a href="">Birthday</a></li>
                                        <li><a href="">Anniversary</a></li>
                                        <li><a href="">Get Well</a></li>
                                        <li><a href="">Just Because</a></li>
                                        <li><a href="">Thank You</a></li>
                                        <li><a href="">Shop All Occasions</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <li><a href="">Flowers<i className="fa-solid fa-angle-down"></i></a></li>
                        <li><a href="">About Us</a></li>
                        <li><a href="">Help</a></li>
                    </ul>
                </nav>
                <div className={styles.hamburger} onClick={toggleMobile}>
                    <div className={getPattyStyle()}></div>
                </div>
            </header>
            <div className={styles.sideMenu} style={{right: mobileActive ? '0' : '-1000px'}}>
                <ul>
                    <li><a href="">Occasions</a></li>
                    <li><a href="">Flowers</a></li>
                    <li><a href="">About Us</a></li>
                    <li><a href="">Help</a></li>
                </ul>
            </div>
            <div className={styles.heroContainer}>
                <div className={styles.outerEdge}>
                    <div className={styles.hero}>
                        <h2>Make a Wish</h2>
                        <p>Make their birthday one-of-a-kind with a unique bouquet just for them!</p>
                        <a href="" className={styles.buyNow}>Shop Birthday</a>
                    </div>
                </div>
            </div>
            <div className={styles.bestSellers}>
                <h2>Our Best Sellers</h2>
                <div className={styles.flowerContainer}>
                    {flowerData.bestSellers.map((item, index) => {
                        return(<FlowerLink 
                        imagePath={item.imagePath}
                        price={item.price}
                        title={item.title}/>)
                    })
                    
                    }
                </div>
            </div>
            <div className={styles.categoryHolder}>
                <div className="category">
                    
                </div>
            </div>
            <footer>
                <div className={styles.footerContent}>
                    <nav className={styles.footerNav}>
                        <ul>
                            <li><p>Shop</p></li>
                            <li><a href="">All Occasions</a></li>
                            <li><a href="">Birthday</a></li>
                            <li><a href="">Anniversary</a></li>
                            <li><a href="">Get Well</a></li>
                            <li><a href="">Sympathy</a></li>
                        </ul>
                    </nav>
                    <nav className={styles.footerNav}>
                        <ul>
                            <li><p>Learn More</p></li>
                            <li><a href="">About Us</a></li>
                            <li><a href="">Safe Shopping</a></li>
                            <li><a href="">Privacy</a></li>
                            <li><a href="">Delivery</a></li>
                            <li><a href="">Substitutions</a></li>
                            <li><a href="">Site Map</a></li>
                        </ul>
                    </nav>
                </div>
            </footer>
        </div>
    </>
    )
}