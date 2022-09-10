import TopPage from "../components/topPage"
import styles from "../styles/about.module.scss"
import Head from 'next/head'
import Image from 'next/image'

export default function About(){
    return(
        <>
        <Head>
            <title>About Me</title>
        </Head>
        <TopPage>
            <section className={styles.aboutPanel}>
            <span>
            <h1>About me</h1>
            <p>I love old movies, photography, architecture, and websites. I find design inspiration in weird places. I also have a very big head</p>
            </span>
                <div className={styles.imageHolder}>
                    <h3>Berkeley, CA</h3>
                    <Image 
                        src='/../public/madisonchill.jpeg'
                        height={400}
                        width={250}
                        alt=''
                    />
                </div>
            </section>
            <section className={styles.photography}>
                <h2>Some of my pictures</h2>
                <div className={styles.photoCarousel}>
                    <div className={styles.img}>
                        <Image
                            height={200}
                            width={300}
                            src='/SanFranPics/1.JPG'
                            alt=''
                        />
                    </div>
                    <div className={styles.img}>
                        <Image
                            height={300}
                            width={200}
                            src='/SanFranPics/2.JPG'
                            alt=''
                        />
                    </div>
                    <div className={styles.img}>
                        <Image
                            height={300}
                            width={200}
                            src='/SanFranPics/3.JPG'
                            alt=''
                        />
                    </div>
                    <div className={styles.img}>
                        <Image
                            height={300}
                            width={200}
                            src='/SanFranPics/4.JPG'
                            alt=''
                        />
                    </div><div className={styles.img}>
                        <Image
                            height={200}
                            width={300}
                            src='/SanFranPics/5.JPG'
                            alt=''
                        />
                    </div><div className={styles.img}>
                        <Image
                            height={300}
                            width={200}
                            src='/SanFranPics/6.JPG'
                            alt=''
                        />
                    </div><div className={styles.img}>
                        <Image
                            height={300}
                            width={200}
                            src='/SanFranPics/7.JPG'
                            alt=''
                        />
                    </div><div className={styles.img}>
                        <Image
                            height={300}
                            width={200}
                            src='/SanFranPics/8.JPG'
                            alt=''
                        />
                    </div><div className={styles.img}>
                        <Image
                            height={300}
                            width={200}
                            src='/SanFranPics/9.JPG'
                            alt=''
                        />
                    </div><div className={styles.img}>
                        <Image
                            height={300}
                            width={200}
                            src='/SanFranPics/10.JPG'
                            alt=''
                        />
                    </div>
                    <div className={styles.img}>
                        <Image
                            height={300}
                            width={200}
                            src='/SanFranPics/11.JPG'
                            alt=''
                        />
                    </div>
                </div>
            </section>
        </TopPage>
        </>
    )
}