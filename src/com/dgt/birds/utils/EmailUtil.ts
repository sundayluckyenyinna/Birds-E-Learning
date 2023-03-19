/* eslint-disable */
import * as nodemailer from "nodemailer";
import * as nodemailerPlugin from 'nodemailer-plugin-inline-base64';


import ApplicationPropertyConfig from "../config/ApplicationPropertyConfig";


const environment = ApplicationPropertyConfig;
export default class EmailUtil
{
    static getTransport = async () => {
        const name: string = environment.getProperty("mail.name");
        const host: string = environment.getProperty("mail.host");
        const port: number = Number(environment.getProperty("mail.smtpPort"));
        const username: string = environment.getProperty("mail.username");
        const password: string = environment.getProperty("mail.password");
        const mailOptions = {
            name: name,
            host: host,
            port: port,
            secure: true,
            auth: {
                user: username,
                pass: password
            }
        };
        const transport  = await nodemailer.createTransport(mailOptions);
        transport.use('compile', nodemailerPlugin());
        return transport;
    }

    static send = async (mailInfo: Mail) => {
        const from: string = environment.getProperty("mail.from");
        const transporter = await EmailUtil.getTransport();
        return await transporter.sendMail({
            from: from,
            to: mailInfo.to,
            subject: mailInfo.subject,
            text: mailInfo.text,
            html: mailInfo.html
        });
    }

}

export interface Mail{
    to: string;
    subject: string;
    text: string;
    html: string;
}
