import TopPage from "../components/topPage"
import Head from "next/head"
import styles from "../styles/blog.module.scss"
import Link from 'next/link'
export default function Blog(){
    return(
        <>
            <Head>
                <title>Blog</title>
            </Head>
            <TopPage>
                <div className={styles.blogHolder}>
                    <h1>Blog Posts</h1>
                        <div className={styles.blogs}>
                            <Link href="/blogs/sassinreact">
                                <div className={styles.blog}>
                                    <h3>Installing Sass in React</h3>
                                    <p>August 13th, 2022</p>
                                    <p>Going over the steps to install Sass and get it working in React.</p>
                                </div>
                            </Link>
                            <Link href="/blogs/customerportal">
                                <div className={styles.blog}>
                                    <h3>Building the GehrIC Customer Portal</h3>
                                    <p>August 9th, 2022</p>
                                    <p>Talking about challenges and the outcome of a recent project I worked on.</p>
                                </div>
                            </Link>
                        </div>
                   
                </div>
            </TopPage>
        </>
    )
}