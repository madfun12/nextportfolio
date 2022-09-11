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
            <Link href="/contact">Get in touch</Link>
          </div>
          <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 453.44 459.89" className={styles.spinner}><defs></defs><g id="Layer_2-2"><circle class="cls-1" cx="226.74" cy="14.61" r="14.61"/><circle class="cls-1" cx="300.37" cy="27.59" r="14.61"/><circle class="cls-1" cx="365.12" cy="64.96" r="14.61"/><circle class="cls-1" cx="413.19" cy="122.21" r="14.61"/><circle class="cls-1" cx="438.79" cy="192.45" r="14.61"/><circle class="cls-1" cx="438.83" cy="267.21" r="14.61"/><circle class="cls-1" cx="413.31" cy="337.47" r="14.61"/><circle class="cls-1" cx="365.3" cy="394.78" r="14.61"/><circle class="cls-1" cx="300.6" cy="432.22" r="14.61"/><circle class="cls-1" cx="226.99" cy="445.28" r="14.61"/><circle class="cls-1" cx="153.35" cy="432.39" r="14.61"/><circle class="cls-1" cx="88.56" cy="395.09" r="14.61"/><circle class="cls-1" cx="40.42" cy="337.9" r="14.61"/><circle class="cls-1" cx="14.74" cy="267.69" r="14.61"/><circle class="cls-1" cx="14.62" cy="192.93" r="14.61"/><circle class="cls-1" cx="40.06" cy="122.63" r="14.61"/><circle class="cls-1" cx="88" cy="65.27" r="14.61"/><circle class="cls-1" cx="152.66" cy="27.76" r="14.61"/></g></svg>
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
