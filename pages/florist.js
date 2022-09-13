import styles from '../styles/florist.module.scss'
import Image from 'next/image'
import Head from 'next/head'
export default function Florist(){
    return(
    <div className={styles.body}>
        <Head>
            <title>Florist Template</title>
            <link rel="stylesheet" href="https://use.typekit.net/svm7tba.css"></link>
        </Head>
        <header>
            <h1>Florist Shop</h1>
            <nav>
                <ul>
                    <div className={styles.dropdown}>
                        <li><a href="">Occasions<i className="fa-solid fa-angle-down"></i></a></li>
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
        </header>
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
                <a href="">
                    <div className={styles.flowerItem}>
                        <Image src="/template1/assets/flowers1.webp" width={175} height={200} alt=""/>
                        <div className={styles.itemInfo}>
                            <h4>Flower Title</h4>
                            <span>
                                <p className={styles.price}>$54.99</p>
                            </span>
                            <a href="" className={styles.buyNow}>Buy Now</a>
                        </div>
                    </div>
                </a>
                <a href="">
                    <div className={styles.flowerItem}>
                        <Image src="/template1/assets/flowers1.webp" width={175} height={200} alt=""/>
                        <div className={styles.itemInfo}>
                            <h4>Flower Title</h4>
                            <span>
                                <p className={styles.price}>$54.99</p>
                            </span>
                            <a href="" className={styles.buyNow}>Buy Now</a>
                        </div>
                    </div>
                </a>
                <a href="">
                    <div className={styles.flowerItem}>
                        <Image src="/template1/assets/flowers1.webp" width={175} height={200} alt=""/>
                        <div className={styles.itemInfo}>
                            <h4>Flower Title</h4>
                            <span>
                                <p className={styles.price}>$54.99</p>
                            </span>
                            <a href="" className={styles.buyNow}>Buy Now</a>
                        </div>
                    </div>
                </a>
                <a href="">
                    <div className={styles.flowerItem}>
                        <Image src="/template1/assets/flowers1.webp" width={175} height={200} alt=""/>
                        <div className={styles.itemInfo}>
                            <h4>Flower Title</h4>
                            <span>
                                <p className={styles.price}>$54.99</p>
                            </span>
                            <a href="" className={styles.buyNow}>Buy Now</a>
                        </div>
                    </div>
                </a>
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
            </div>
        </footer>
    </div>
    )
}