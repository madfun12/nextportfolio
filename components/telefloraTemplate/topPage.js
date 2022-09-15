import React from 'react';
import styles from '../../styles/florist.module.scss'
import Head from 'next/head'
import { faAngleDown, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Florist(props){
    const [mobileActive, setMobileActive] = React.useState(false)
    const [profileActive, setProfileActive] = React.useState(false)


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
                        
                        <div className={styles.dropdown}>
                            <li><a href="">Flowers<FontAwesomeIcon icon={faAngleDown} className={styles.dropdownArrow}/></a></li>
                            <div className={styles.dropdownMenu}>
                                <div className={styles.dropdownColumn}>
                                    <ul>
                                        <li><a href="">Shop All Flowers</a></li>
                                        <li><a href="">By Color</a></li>
                                        <li><a href="">By Type</a></li>
                                        <li><a href="">By Season</a></li>
                                        <li><a href="">By Recipient</a></li>
                                        <li><a href="">Gift Baskets</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <li><a href="">About Us</a></li>
                        <div className={styles.dropdown}>
                            <li><FontAwesomeIcon icon={faUser} className={styles.headerIcon}/></li>
                            <div className={styles.profileMenu}>
                                <h3>John Doe</h3>
                                <ul>
                                    <li><a href="">Order History & Tracking</a></li>
                                    <li><a href="">Account Info</a></li>
                                    <li><a href="">Email Preferences</a></li>
                                    <li><a href="">Rewards</a></li>
                                    <li><a href="">Log Out</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.dropdown}>
                        <li><FontAwesomeIcon icon={faShoppingCart} className={styles.headerIcon}/></li>
                            <div className={styles.shoppingCart}>
                                <h3>Shopping Cart</h3>
                                <p>0 items</p>
                            </div>
                        </div>
                        
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
            {props.children}
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
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3754.3730486781133!2d-97.5179732822647!3d35.4660032598074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b217299f574e03%3A0x8fd2a7a17df9affc!2sMyriad%20Botanical%20Gardens!5e0!3m2!1sen!2sus!4v1663244112281!5m2!1sen!2sus" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    <nav className={styles.footerNav}>
                        <ul>
                            <li><p>Our Hours</p></li>
                            <li><p>Mon-Fri: 9AM-7PM</p></li>
                            <li><p>Sat: 10AM-2PM</p></li>
                            <li><p>Sun: Closed</p></li>
                        </ul>
                    </nav>
                    <nav className={styles.footerNav}>
                        <ul>
                            <li><p>Our Location</p></li>
                            <li><p>456 NW 239th St<br></br> Oklahoma City, OK</p></li>
                            <li><p>(405) 999-9999</p></li>
                            <li><p>john@doeflorist.com</p></li>
                        </ul>
                    </nav>
                </div>
            </footer>
        </div>
    </>
    )
}