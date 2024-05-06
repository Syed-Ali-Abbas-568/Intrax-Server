// //This file holds all functions related to sending mails

import nodemailer from 'nodemailer';



// export async function sendPasswordKeyDriverEmail(driverName, driverEmail, driverPassword) {


//     const transporter = nodemailer.createTransport({
//         service: "Gmail",
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true,
//         auth: {
//             user: "intraxbustracking@gmail.com",
//             pass: "uasi bxrw igvi unqy",
//         },
//     });


//     const mailOptions = {
//         from: "syedaliabbas568@gmail.com",
//         to: driverEmail,
//         subject: "Welcome to the Intrax System",
//         html: `
//         <p>Hello ${driverName},</p>
//         <p>You have been signed up as a driver in the Intrax system. Your credentials are:</p>
//         <ul>
//           <li>Email: ${driverEmail}</li>
//           <li>Password: ${driverPassword}</li>
//         </ul>
//         <p>Thank you for joining us!</p>
//         <img src="cid:busAppImage" alt="Bus App Image">
//       `,
//         attachments: [
//             {
//                 filename: 'logo.png',
//                 path: 'assets/logo.png',
//                 cid: 'busAppImage',
//             },
//         ],
//     };


//     await transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error("Error sending email: ", error);
//         } else {
//             console.log("Email sent: ", info.response);
//         }
//     });
// }


export async function sendPasswordKeyDriverEmail(driverName, driverEmail, driverPassword) {
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
                path: 'assets/',
                cid: 'busAppImage',
            },
        ],
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
}
