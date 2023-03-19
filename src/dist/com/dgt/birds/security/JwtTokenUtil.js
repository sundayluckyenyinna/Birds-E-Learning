"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const ApplicationPropertyConfig_1 = require("../config/ApplicationPropertyConfig");
const common_1 = require("@nestjs/common");
const environment = ApplicationPropertyConfig_1.default;
class JwtTokenUtil {
}
exports.default = JwtTokenUtil;
_a = JwtTokenUtil;
JwtTokenUtil.secretKey = environment.getProperty("birds.authorization.token.secret");
JwtTokenUtil.expirationTime = environment.getProperty("birds.authorization.token.expiresIn");
JwtTokenUtil.logger = new common_1.Logger(JwtTokenUtil.name);
JwtTokenUtil.generateToken = (tokenRequestData) => {
    const requestDataJson = JSON.parse(JSON.stringify(tokenRequestData));
    return jwt.sign(requestDataJson, JwtTokenUtil.secretKey);
};
JwtTokenUtil.decodeToken = (token) => {
    let decoded = undefined;
    try {
        decoded = jwt.verify(token, JwtTokenUtil.secretKey);
    }
    catch (error) {
        JwtTokenUtil.logger.log("Expired token error: ".concat(error.message));
    }
    return decoded;
};
JwtTokenUtil.getUsernameFromToken = (token) => {
    return _a.decodeToken(token).username;
};
JwtTokenUtil.getEmailFromToken = (token) => {
    return _a.decodeToken(token).emailAddress;
};
JwtTokenUtil.getChannelFromToken = (token) => {
    return _a.decodeToken(token).channel;
};
JwtTokenUtil.getExpirationDateFromCreationDate = (creationDate) => {
    const minute = creationDate.getMinutes();
    const newMinutes = minute + Number(JwtTokenUtil.expirationTime);
    const expirationDate = new Date();
    expirationDate.setMinutes(newMinutes, 0, 0);
    return expirationDate;
};
JwtTokenUtil.isTokenExpired = (userAuth) => {
    const timeDiff = new Date().getTime() - userAuth.authTokenExpirationDate.getTime();
    return timeDiff >= 500;
};
//# sourceMappingURL=JwtTokenUtil.js.map