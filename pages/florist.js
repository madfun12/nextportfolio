import React from 'react';
import styles from '../styles/florist.module.scss'
import TopPage from '../components/telefloraTemplate/topPage'
import FlowerLink from '../components/telefloraTemplate/flowerLink';
import Head from 'next/head'
import flowerData from '../data/flowerData.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceKissWinkHeart, faHeart, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faCakeCandles } from '@fortawesome/free-solid-svg-icons';

export default function Florist(){

    return(
    <>
        <Head>
            <title>Florist Template</title>
        </Head>
        <TopPage>
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
                    {flowerData[0].items.map((item, index) => {
                        return(<FlowerLink 
                        imagePath={item.imagePath}
                        price={item.price}
                        title={item.title}
                        key={index}/>)
                    })
                    
                    }
                </div>
            </div>
            <div className={styles.categoryHolder}>
                <h2>Our Favorite Categories</h2>
                <div className={styles.flowerContainer}>
                    <div className={styles.category}>
                        <FontAwesomeIcon icon={faCakeCandles} className={styles.categoryIcon}/>
                        <a href="" className={styles.buyNow}>Shop Birthday</a>
                    </div>
                    <div className={styles.category}>
                        <FontAwesomeIcon icon={faFaceKissWinkHeart} className={styles.categoryIcon}/>
                        <a href="" className={styles.buyNow}>Shop Anniversary</a>
                    </div>
                    <div className={styles.category}>
                        <FontAwesomeIcon icon={faHeart} className={styles.categoryIcon}/>
                        <a href="" className={styles.buyNow}>Shop Sympathy</a>
                    </div>
                    <div className={styles.category}>
                        <FontAwesomeIcon icon={faCalendar} className={styles.categoryIcon}/>
                        <a href="" className={styles.buyNow}>Shop Seasonal</a>
                    </div>
                </div>
            </div>
        </TopPage>
    </>
    )
}