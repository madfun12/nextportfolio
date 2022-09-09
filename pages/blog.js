import TopPage from "../components/topPage"
import Head from "next/head"
import styles from "../styles/blog.module.scss"
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
                        <div className={styles.blog}>
                            <h3>Installing Sass in React</h3>
                            <p>August 9th, 2022</p>
                            <p>Going over the steps to install Sass and get it working in React</p>
                        </div>
                    </div>
                </div>
            </TopPage>
        </>
    )
}