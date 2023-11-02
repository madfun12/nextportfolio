import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const bodyText = `
            <h1>New Contact Form Submission</h1>
            <h2>Name: ${body.name}</h2>
            <h2>E-mail: ${body.email}</h2>
            ${body.phone && `<h2>Phone: ${body.phone}</h2>`}
            ${body.business && `<h2>business: ${body.business}</h2>`}
            ${body.subject && `<h2>Subject: ${body.subject}</h2>`}
        `;

        const email = process.env.GMAIL_EMAIL;
        const pass = process.env.GMAIL_PASSWORD;

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
