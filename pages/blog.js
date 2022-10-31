import TopPage from "../components/topPage"
import Head from "next/head"
import styles from "../styles/blog.module.scss"
import Link from 'next/link'

import { getSortedPostsData } from "../lib/posts"

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
      props: {
        allPostsData,
      },
    };
}

export default function Blog( {allPostsData} ){
    return(
        <>
            <Head>
                <title>Blog</title>
            </Head>
            <TopPage>
                <div className={styles.blogHolder}>
                    <h1>Blog Posts</h1>
                        <div className={styles.blogs}>
                            {allPostsData.map(({id,date,title}) => (
                                    <Link href={`/posts/${id}`} key={id}>
                                        <div className={styles.blog} >
                                            <h3>{title}</h3>
                                            <p>{date}</p>
                                        </div>
                                    </Link>
                            ))}
                        </div>
                   
                </div>
            </TopPage>
        </>
    )
}