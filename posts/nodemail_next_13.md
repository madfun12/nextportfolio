---
title: "How to Use Nodemailer with NextJS 13"
date: "11-01-23"
---

Recently, I've been working on updating my site to use the app router system that was introduced in Next 13. I'm still not decided if I preferred the old page structure, but I definitely prefer the new way of getting server side data and displaying it on the page. Gone are the days of getServerSideProps() and dealing with everything that came with it and it's siblings.

I found that now would be a great time to update the structure on my contact page, and the code that sends emails along with it. Nodemailer is a very popular e-mail npm package. You can get it set up very easily, and I've found that it's very reliable and doesn't lead to a bunch of spam emails like other services.

Here are the packages that we'll be using:

-   Nodemailer
-   Axios

I'm trying to keep this article short, sweet, and unopinionated. That means I'm not going to go over creating the email contact form. I'm using [react-hook-forms](https://react-hook-form.com/) to handle my form state, because I'm lazy. In this article, I'm assuming that you:

-   Already have a NextJS 13 project using the app router
-   Have a working form to collect some contact information that will be emailed to you.

## Installing the Packages

First we need to install the packages that we'll be using for our project. To install Nodemailer and axios, run this command inside of your next project: `npm i nodemailer axios`

## Client Side Code

Once that's done, we first need to write the API call that will fire once the user clicks submit on the form. Mine looks something like this:

Example app/components/contactForm.tsx:

```
import axios from 'axios';

// function that the form uses on submit
const onSubmit = async (data) => {
    try {
        const response = await axios.post("/api/email", data);
        console.log(response.data);
    } catch (error) {
        console.error(`${error}`);
        setLoading(false);
    }
};
```

This is a pretty simple API call. Mine has more going on than this for UI purposes; but this is more or less what it's doing. `data` is the form data in the form of an object. In my case, it looks like this:

```
{
    name: "Madison",
    email: "madfun12@gmail.com",
    business: "nunya",
    subject: "Very Important Business Opportunity"
}
```

## Server Side API Code

Our API call is sending this data object as the request body to our server-side API. Now that we have our client side code written, we need to create the API path. In your project, create this directory:
`app/api/email`
And inside of it, create a file called `route.ts`. Inside of this file, we can place the following code:

```
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const bodyText = `
            <h1>New Contact Form Submission</h1>
            <h2>Name: ${body.name}</h2>
            <h2>E-mail: ${body.email}</h2>
            <h2>Subject: ${body.subject}</h2>
        `;

        const email = process.env.EMAIL;
        const pass = process.env.EMAIL_PASSWORD;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: email,
                pass: pass,
            },
        });

        const mailOptions = {
            from: email,
            to: email,
        };

        await transporter.sendMail({
            ...mailOptions,
            subject: body.subject,
            html: bodyText,
        });

        return new NextResponse("Successfully Sent", { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse("Error Sending Email", { status: 400 });
    }
}
```

This code is kind of doing a lot, so you may want to move some of the functions to a separate lib folder and just import them in the route file. In this case, I'm using a gmail account to send them to myself. If you're using a different email provider, you'll need to change the service in the nodemailer.createTransport method.

## Environment Variables

There is one thing we're missing though, and that's our environment variables. Create a file called `.env` in your projects root directory if you don't already have them, and put the following text in the file:

> **Make sure you include .env in your .gitignore file before pushing the Next project to a publically accessible git repository**

```
EMAIL=your_email@email.com
EMAIL_PASSWORD=your_super_secure_password
```

After you've done this and you update the email and password variables to your own, you should be able to now send an email from your contact form.

> _Note: If you're using gmail like I am, you'll need to create an [application specific password](https://security.google.com/settings/security/apppasswords) and use that as the email password in your .env file_
