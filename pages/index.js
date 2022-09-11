import Head from 'next/head'
import TopPage from '../components/topPage'
import Image from 'next/image'
import styles from '../styles/home.module.scss'
import Link from 'next/link'
import TechCard from '../components/TechCard'
import Project from '../components/Project'

export default function Home() {
  return (
    <TopPage>
        <Head>
          <title>Madison Funderburk</title>
        </Head>
      
        <div className={`${styles.hero} ${styles.flexColumnCenter}`}>
          <div className={styles.heroContent}>
            <h1>Madison Funderburk</h1>
            <h2>web developer, designer</h2>
            <p>I'm a web developer with a passion to help people expand their company's brand and to provide their customers with an unforgettable experience.</p>
            <Link href="/contact">Get in touch with me</Link>
          </div>
          <svg viewBox="0 0 558 558" width="558" height="558" fill="none" aria-hidden="true" className={styles.spinner}><defs><linearGradient id=":R3b9m:" x1="79" y1="16" x2="105" y2="237" gradientUnits="userSpaceOnUse"><stop stopColor="#13B5C8"></stop><stop offset="1" stopColor="#13B5C8" stop-opacity="0"></stop></linearGradient></defs><path opacity=".2" d="M1 279C1 125.465 125.465 1 279 1s278 124.465 278 278-124.465 278-278 278S1 432.535 1 279Z" stroke="#13B5C8"></path><path d="M1 279C1 125.465 125.465 1 279 1" stroke="url(#:R3b9m:)" strokeLinecap="round"></path></svg>
        </div>
        <section id='tech' className={`${styles.tech} ${styles.flexColumnCenter}`}>
          <h2>What I work with</h2>
          <div className={styles.flexRow}>
            
            <TechCard
              title="HTML"
              img="/HTML5_logo.png"
              desc="Hypertext Markup Language. This is the foundation of any website's content. Every bit of web development is going to use HTML in some fashion." 
            />
            <TechCard
              title="CSS"
              img="/CSS3_logo.png"
              desc="Cascading stylesheets! Love it or hate it (I'm indifferent), it's how we make our websites look reeeaaal perty. Seems like I spend the most time on this." 
            />
            <TechCard
              title="SASS"
              img="/SASS_logo.png"
              desc="A step up from regular CSS. It allows for all sorts of features to make CSS a little bit quicker and a whole lot neater." 
            />
            <TechCard
              title="JavaScript"
              img="/JS_logo.png"
              desc="Where programming meets web design. We can add logic to our websites. Today JS can be used to make anything, not just websites. It's also used to make some really awesome tools." 
            />
            <TechCard
              title="ReactJS"
              img="/REACT_logo.png"
              desc="React is an awesome Javascript library that allows you to create complex web apps. Anything from games, to e-commerce stores, to this website!" 
            />
            <TechCard
              title="NextJS"
              img="/NEXT_logo.png"
              desc="Next takes React to the next level by allowing server side rendering and adding in things like routing, static file serving, API routes, and builtin Sass support!" 
            />
          </div>
        </section>
        <section className={styles.projects}>
          <h2>Some projects</h2>
          <div className={styles.flexRow}>
          <Project 
            img="/tensiessc.png"
            title="Tensies"
            desc="This is a game I built using React. The goal is to get all of the dice to show the same number in the least amount of tries possible. Beat my score of 5!"
            location="/tensies">
              <a href="https://madisonfunderburk.com/tensies/index.html">Check it out</a>
          </Project>
          <Project 
            img="/triviasc.png"
            title="Trivia Quiz"
            desc="This is a trivia quiz that polls the Open Trivia DB for 5 random questions."
            location="/tensies">
              <a href="https://madisonfunderburk.com/trivia/index.html">Check it out</a>
          </Project>
          <Project 
            img="/terminalsc.png"
            title="Terminal Portfolio"
            desc="I enjopyed the idea of a cyber-punk terminal style portfolio website so I built this one. Predecessor to this site."
            location="/tensies">
              <Link href="https://madisonfunderburk.com/terminal/index.html">Check it out</Link>
          </Project>
          </div>
        </section>
        <section className={styles.heroSection}>
          <h2>Let's get in touch.</h2>
          <Link href='/contact'>Contact me</Link>
        </section>
    </TopPage>
  )
}
