import React from 'react';
import styles from '../styles/florist.module.scss'
import TopPage from '../components/telefloraTemplate/topPage'
import FlowerLink from '../components/telefloraTemplate/flowerLink';
import Head from 'next/head'
import flowerData from '../data/flowerData.json'

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
                    {flowerData.bestSellers.map((item, index) => {
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
                <div className="category">
                    
                </div>
            </div>
        </TopPage>
    </>
    )
}