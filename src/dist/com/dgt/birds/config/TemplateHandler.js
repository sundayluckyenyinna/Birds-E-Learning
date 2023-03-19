"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const process = require("process");
const fs = require("fs");
const ZooItemKeeper_1 = require("./ZooItemKeeper");
const ApplicationPropertyConfig_1 = require("./ApplicationPropertyConfig");
class TemplateHandler {
}
exports.default = TemplateHandler;
TemplateHandler.templateFolderPath = path.join(process.cwd(), 'resources', 'templates');
TemplateHandler.pipeTemplateStream = (responseCode, response) => {
    const fullPath = TemplateHandler.getOauthSignupTemplateByResponseCode(responseCode);
    const file = fs.createReadStream(fullPath);
    return file.pipe(response);
};
TemplateHandler.storeTemplatesToZooItemKeeper = () => {
    try {
        const files = fs.readdirSync(TemplateHandler.templateFolderPath);
        ZooItemKeeper_1.default.setItem(ZooItemKeeper_1.Item.TEMPLATE, files);
    }
    catch (error) {
        throw error;
    }
};
TemplateHandler.getOauthSignupTemplateByResponseCode = (code) => {
    let defaultFile = path.join(TemplateHandler.templateFolderPath, 'index.html');
    const templateName = "E".concat(code).concat(".html");
    let templates = ZooItemKeeper_1.default.getItem(ZooItemKeeper_1.Item.TEMPLATE);
    if (templates == null || templates.length === 0) {
        templates = fs.readdirSync(TemplateHandler.templateFolderPath);
    }
    if (templates.includes(templateName))
        return path.join(TemplateHandler.templateFolderPath, templateName);
    return defaultFile;
};
TemplateHandler.getOtpStreamMessage = (otp, partial) => {
    const filePath = path.join(TemplateHandler.templateFolderPath, 'EOTP.html');
    let content = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const otpExpirationTime = ApplicationPropertyConfig_1.default.getProperty("birds.otp.expiresIn");
    const expirationNumber = otpExpirationTime.substring(0, otpExpirationTime.indexOf("*")).trim();
    if (expirationNumber === "1")
        content = content.replace("minutes", "minute");
    content = content.replace("{otp}", otp).replace("{validFor}", expirationNumber);
    const keys = Object.keys(partial);
    keys.forEach(key => {
        const value = partial[key];
        const replaceAble = "{".concat(key).concat("}");
        content = content.replace(replaceAble, value);
    });
    return content;
};
TemplateHandler.getForgetPasswordOtpStreamMessage = (otp, partial) => {
    const filePath = path.join(TemplateHandler.templateFolderPath, 'ForgetPasswordOTPMail.html');
    let content = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const otpExpirationTime = ApplicationPropertyConfig_1.default.getProperty("birds.otp.expiresIn");
    const expirationNumber = otpExpirationTime.substring(0, otpExpirationTime.indexOf("*")).trim();
    if (expirationNumber === "1")
        content = content.replace("minutes", "minute");
    content = content.replace("{otp}", otp).replace("{validFor}", expirationNumber);
    const keys = Object.keys(partial);
    keys.forEach(key => {
        const value = partial[key];
        const replaceAble = "{".concat(key).concat("}");
        content = content.replace(replaceAble, value);
    });
    return content;
};
TemplateHandler.getTemplate = (templateName) => {
    let filePath;
    if (templateName.endsWith(".html"))
        filePath = path.join(TemplateHandler.templateFolderPath, templateName);
    else
        filePath = path.join(TemplateHandler.templateFolderPath, templateName.concat(".html"));
    return fs.readFileSync(filePath, { encoding: 'utf8' });
};
//# sourceMappingURL=TemplateHandler.js.map