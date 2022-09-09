import TopPage from "../components/topPage"
import Head from "next/head"
import styles from "../styles/contact.module.scss"
export default function Contact(){
    return(
        <>
            <Head>
                <title>Contact</title>
            </Head>
            <TopPage>
                <div className={styles.contactHolder}>
                    <div className={styles.contactInfo}>
                        <h1>Contact me</h1>
                        <a href="tel:4057579875">(405)757-9875</a>
                        <a href="mailto:madfun12@gmail.com">madfun12@gmail.com</a>

                    </div>
                    <form action="https://formsubmit.co/madfun12@gmail.com" method="POST">
                        <label for="name">Full Name</label>
                        <input id="name" type="text" name="name" placeholder="Required" required/>
                        <label for="email">E-mail</label>
                        <input type="email" name="email" placeholder="Required" required/>
                        <label for="phone">Phone Number</label>
                        <input type="phone" name="phone"/>
                        <label for="message">Message</label>
                        <textarea name="message" required/>
                        <button type="submit">Let's talk</button>
                    </form>    
                </div>
            </TopPage>
        </>
    )
}