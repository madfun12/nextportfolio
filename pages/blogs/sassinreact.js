import styles from '../../styles/blogpost.module.scss'
import TopPage from '../../components/topPage'

export default function SassInReact(){
    return(
        <>
            <TopPage>
                <section className={styles.blogPost}>
                    <h1>Installing Sass in ReactJS</h1>
                    <p className={styles.author}>by Madison Funderburk</p>
                    <p className={styles.date}>8/13/2022</p>
                    <p className={styles.blogParagraph}>Installing Sass in React is super simple and will give you access to all of the tools necessary to start using it!</p>
                    <p className={styles.blogParagraph}>Note: To install Sass using this guide, you need to have used npx create-react-app</p>
                    <p className={styles.blogStep}>1. Install Sass in terminal using Node Package Manager</p>
                    <p className={styles.blogParagraph}>Run this command in terminal in your project directory. You will need to have npm initialized already.</p>
                    <p className={styles.codeSnippet}> ~ npm i sass</p>
                    <p className={styles.blogStep}>2. Create Sass Stylesheet</p>
                    <p className={styles.blogParagraph}>Personally, I like to leave the file as index.scss, but name it whatever you'd like. Place it in the root folder of your project alongside index.js. In more complex projects, you can create a .scss folder and place all your sass files in there.</p>
                    <p className={styles.blogStep}>3. Link Stylesheet inside of index.js</p>
                    <p className={styles.blogParagraph}>If your stylesheet is in the same directory as your index.js file, inside of index.js import your stylesheet.</p>
                    <p>At the top of index.js:</p>
                    <p className={styles.codeSnippet}>import './index.scss';</p>
                    <p className={styles.blogStep}>4. Start Styling!</p>
                    <p className={styles.blogParagraph}>That's it! Feel free to create all the nested styles you want to! Much easier than in traditional HTML & CSS files.</p>
                </section>
            </TopPage>
        </>
    )
}