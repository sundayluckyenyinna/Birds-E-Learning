/* eslint-disable */

import * as path from "path";
import * as process from "process";
import { Response } from "express";
import * as fs from "fs";
import { ReadStream } from "fs";
import ZooItemKeeper, { Item } from "./ZooItemKeeper";
import GenericConstants from "../const/GenericConstants";
import MessageSource from "./MessageSource";
import ApplicationPropertyConfig from "./ApplicationPropertyConfig";

export default class TemplateHandler
{
    static templateFolderPath: string = path.join(process.cwd(), 'resources', 'templates');
    static pipeTemplateStream = (responseCode: string, response: Response): TemplateHandler => {
        const fullPath: string = TemplateHandler.getOauthSignupTemplateByResponseCode(responseCode);
        const file: ReadStream = fs.createReadStream(fullPath);
        return file.pipe(response);
    }

    static storeTemplatesToZooItemKeeper = (): void => {
        try{
            const files: Array<string> = fs.readdirSync(TemplateHandler.templateFolderPath);
            ZooItemKeeper.setItem(Item.TEMPLATE, files);
        }catch (error){
            throw error;
        }
    }

    static getOauthSignupTemplateByResponseCode = (code: string) => {
        let defaultFile: string = path.join(TemplateHandler.templateFolderPath, 'index.html');
        const templateName: string = "E".concat(code).concat(".html");
        let templates: Array<string> = ZooItemKeeper.getItem(Item.TEMPLATE) as string[];
        if(templates == null || templates.length === 0){
            templates = fs.readdirSync(TemplateHandler.templateFolderPath);
        }
        if(templates.includes(templateName))
            return path.join(TemplateHandler.templateFolderPath, templateName);
        return defaultFile;
    }

    static getOtpStreamMessage = (otp: string, partial?: object):string => {
        const filePath: string = path.join(TemplateHandler.templateFolderPath, 'EOTP.html');
        let content: string = fs.readFileSync(filePath, { encoding: 'utf-8' });
        const otpExpirationTime: string = ApplicationPropertyConfig.getProperty("birds.otp.expiresIn");
        const expirationNumber: string = otpExpirationTime.substring(0, otpExpirationTime.indexOf("*")).trim();
        if(expirationNumber === "1")
            content = content.replace("minutes", "minute");
        content = content.replace("{otp}", otp).replace("{validFor}", expirationNumber);
        const keys: Array<string> = Object.keys(partial);
        keys.forEach(key => {
            const value: string = partial[key];
            const replaceAble: string = "{".concat(key).concat("}");
            content = content.replace(replaceAble, value);
        })
        return content;
    }

    static getForgetPasswordOtpStreamMessage = (otp: string, partial?: object): string => {
        const filePath: string = path.join(TemplateHandler.templateFolderPath, 'ForgetPasswordOTPMail.html');
        let content: string = fs.readFileSync(filePath, { encoding: 'utf-8' });
        const otpExpirationTime: string = ApplicationPropertyConfig.getProperty("birds.otp.expiresIn");
        const expirationNumber: string = otpExpirationTime.substring(0, otpExpirationTime.indexOf("*")).trim();
        if(expirationNumber === "1")
            content = content.replace("minutes", "minute");
        content = content.replace("{otp}", otp).replace("{validFor}", expirationNumber);
        const keys: Array<string> = Object.keys(partial);
        keys.forEach(key => {
            const value: string = partial[key];
            const replaceAble: string = "{".concat(key).concat("}");
            content = content.replace(replaceAble, value);
        })
        return content;
    }

    static getTemplate = (templateName: string): string => {
        let filePath: string;
        if(templateName.endsWith(".html"))
            filePath = path.join(TemplateHandler.templateFolderPath, templateName);
        else
            filePath = path.join(TemplateHandler.templateFolderPath, templateName.concat(".html"));
        return fs.readFileSync(filePath, { encoding: 'utf8' });
    }
}