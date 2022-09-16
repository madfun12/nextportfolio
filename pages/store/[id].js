import TopPage from '../../components/telefloraTemplate/topPage'
import { getAllStoreIds, getStoreData } from '../../lib/stores';
import styles from '../../styles/store.module.scss'
import Head from 'next/head'
import StoreItem from '../../components/telefloraTemplate/storeItem'


//actual jsx for the store page
export default function Store({ storeData }){
    return(
        <TopPage>
            <Head>
                <title>{storeData.store}</title>
            </Head>
            <div className={styles.storeContainer}>
                <div className={styles.pageHeader}>

                    <h1>{storeData.store}</h1>
                </div>
                <div className={styles.storeHolder}>
                    <div className={styles.storeMenu}>
                        <h2>Filter your results</h2>
                    </div>
                    <div className={styles.storeContent}>
                        {storeData.items.map((item,index) => {
                            return(
                                <StoreItem 
                                imagePath={item.imagePath}
                                title={item.title}
                                price={item.price}
                                key={index}/>
                            )
                        })}
                    </div>
                </div>
                
            </div>
        </TopPage>
    )
}

//passes the store data from stores.js as props for us to use
export function getStaticProps({ params }){
    const storeData = getStoreData(params.id)
    return {
        props: {
            storeData,
        },
    };
}

//tells the dynamic page file what the possible ids are.
export async function getStaticPaths() {
    const paths = getAllStoreIds();
    return {
      paths,
      fallback: false,
    };
}