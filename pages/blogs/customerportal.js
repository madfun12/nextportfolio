import styles from '../../styles/blogpost.module.scss'
import TopPage from '../../components/topPage'

export default function CustomerPortal(){
    return(
        <>
            <TopPage>
                <section className={styles.blogPost}>
                    <h1>Building the GehrIC Customer Portal</h1>
                    <p className={styles.author}>by Madison Funderburk</p>
                    <p className={styles.date}>8/9/2022</p>
                    <p className={styles.blogParagraph}>At GehrIC, we needed a better way to share time entries and billing and ticket info with our clients. At the end of each month every technician was spending 4 hours to prepare and send a PDF report to each client with the time entries from the last month. We found a 3rd party customer portal solution that worked fairly well but included a lot of things we don't use. I asked to develop a "custom" customer portal.</p>
                    <p className={styles.blogParagraph}>I got started with seeing what I could get as far as client data, just to know the possible scope of the project. We had access to the ConnectWise Manage API, which allows us to make requests to their REST server and get all of our existing client data. The documenation on how to use it wasn't perfect, so Postman API was invaluable for troubleshooting requests and examining the format of responses.</p>
                    <p className={styles.blogParagraph}>With the API figured out I could start to plan out the web app. I built it using React and the plan was to integrate it with our wordpress website. The development of the app itself was fairly straight-forward. I wanted to have a nav menu on the left with the different page options: a home to view live monthly time entries, a list of open tickets and their priorites, a page to submit new tickets, and a tab to view closed tickets and generate reports for a given time period.</p>
                    <p className={styles.blogParagraph}>The hard part was figuring out how to authenticate users and only allow content pertaining to that user's company, and if they don't have admin access, only the tickets tied to them. I looked into Auth0, which was free and had all of the bells and whistles we needed in order to ensure secure access to the page. We could create users and have them authenticate through their Office365 account or Azure AD account, which was tremendously helpful to us. The issue then was: how do we get company info tied to the user in Auth0 so that they can only see the right stuff? In Connectwise, we can create a contact and assign that contact tickets which solves the issue of filtering tickets down to an individual. I found that when we create a user, we can assign them "app metada" in the Auth0 admin console. Here I could assign a user their company ID and pass that dynamically in the HTTP request. This made it to where we could filter by company and by contact ID if necessary.</p>
                    <p className={styles.blogParagraph}>This is where the sad news comes in: we couldn't go with my solution. It turns out that Auth0 charges quite a bit per month to get security specifications that we need for some of our clients to meet standards. This made it so that the 3rd party customer portal was the more economic decison. I learned so much on this project and was really proud of the work I did over the course of a week.</p>
                    <p className={styles.blogParagraph}> Right now I'm looking into hosting the app on Azure and ways to authenticate through that instead. In the meantime, this project is on the shelf while I learn some more and work on other apps.</p>
                </section>
            </TopPage>
        </>
    )
}