"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenericConstants_1 = require("../const/GenericConstants");
const ApplicationPropertyConfig_1 = require("../config/ApplicationPropertyConfig");
const BirdsHelper_1 = require("../utils/BirdsHelper");
const environment = ApplicationPropertyConfig_1.default;
class OtpUtil {
}
exports.default = OtpUtil;
OtpUtil.numerics = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
OtpUtil.expiresIn = environment.getProperty("birds.otp.expiresIn");
OtpUtil.expiresInMillSec = BirdsHelper_1.default.getMillSecFromTimeString(OtpUtil.expiresIn);
OtpUtil.generateToken = (length) => {
    let token = GenericConstants_1.default.EMPTY_STRING;
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * 10);
        token += String(OtpUtil.numerics[randomIndex]);
    }
    return token;
};
OtpUtil.getTokenExpirationTime = () => {
    const now = new Date();
    return new Date(now.getTime() + OtpUtil.expiresInMillSec);
};
//# sourceMappingURL=OtpUtil.js.map