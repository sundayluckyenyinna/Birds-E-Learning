"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const nodemailerPlugin = require("nodemailer-plugin-inline-base64");
const ApplicationPropertyConfig_1 = require("../config/ApplicationPropertyConfig");
const environment = ApplicationPropertyConfig_1.default;
class EmailUtil {
}
exports.default = EmailUtil;
_a = EmailUtil;
EmailUtil.getTransport = async () => {
    const name = environment.getProperty("mail.name");
    const host = environment.getProperty("mail.host");
    const port = Number(environment.getProperty("mail.smtpPort"));
    const username = environment.getProperty("mail.username");
    const password = environment.getProperty("mail.password");
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
    const transport = await nodemailer.createTransport(mailOptions);
    transport.use('compile', nodemailerPlugin());
    return transport;
};
EmailUtil.send = async (mailInfo) => {
    const from = environment.getProperty("mail.from");
    const transporter = await EmailUtil.getTransport();
    return await transporter.sendMail({
        from: from,
        to: mailInfo.to,
        subject: mailInfo.subject,
        text: mailInfo.text,
        html: mailInfo.html
    });
};
//# sourceMappingURL=EmailUtil.js.map