export default class EmailUtil {
    static getTransport: () => Promise<any>;
    static send: (mailInfo: Mail) => Promise<any>;
}
export interface Mail {
    to: string;
    subject: string;
    text: string;
    html: string;
}
