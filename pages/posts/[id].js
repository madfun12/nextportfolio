import Head from 'next/head';
import BlogPage from '../../components/blogPage';
import styles from '../../styles/blogPage.module.scss'

import { getAllPostIds, getPostData } from '../../lib/posts';

export async function getStaticProps({ params }) {
    // Add the "await" keyword like this:
    const postData = await getPostData(params.id);
  
    return {
      props: {
        postData,
      },
    };
  }

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
    return (
       
            <BlogPage>
                <Head>
                    <title>{postData.title}</title>
                </Head>
                 <div className={styles.post}>
                    
                    <h1>{postData.title}</h1>
                    <br />
                    <h4>{postData.date}</h4>
                    <br />
                    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} className={styles.blogContent}/>
                    
                </div>
            </BlogPage>
        
        
    );
  }