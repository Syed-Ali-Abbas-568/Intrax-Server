//This file holds all functions related to sending mails

import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "intraxbustracking@gmail.com",
        pass: "uasi bxrw igvi unqy",
    },
});

export function sendPasswordKeyDriverEmail(driverName, driverEmail, driverPassword) {
    const mailOptions = {
        from: "syedaliabbas568@gmail.com",
        to: driverEmail,
        subject: "Welcome to the Intrax System",
        html: `
        <p>Hello ${driverName},</p>
        <p>You have been signed up as a driver in the Intrax system. Your credentials are:</p>
        <ul>
          <li>Email: ${driverEmail}</li>
          <li>Password: ${driverPassword}</li>
        </ul>
        <p>Thank you for joining us!</p>
        <img src="cid:busAppImage" alt="Bus App Image">
      `,
        attachments: [
            {
                filename: 'logo.png',
                path: 'assets/logo.png',
                cid: 'busAppImage',
            },
        ],
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });
}