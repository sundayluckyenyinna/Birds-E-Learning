import { Response } from "express";
export default class TemplateHandler {
    static templateFolderPath: string;
    static pipeTemplateStream: (responseCode: string, response: Response) => TemplateHandler;
    static storeTemplatesToZooItemKeeper: () => void;
    static getOauthSignupTemplateByResponseCode: (code: string) => string;
    static getOtpStreamMessage: (otp: string, partial?: object) => string;
    static getForgetPasswordOtpStreamMessage: (otp: string, partial?: object) => string;
    static getTemplate: (templateName: string) => string;
}
