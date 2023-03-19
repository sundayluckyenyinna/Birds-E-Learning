"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
const ApplicationPropertyConfig_1 = require("../config/ApplicationPropertyConfig");
const environment = ApplicationPropertyConfig_1.default;
class PasswordUtil {
}
exports.default = PasswordUtil;
PasswordUtil.saltStrength = Number(environment.getProperty("birds.hash.passwordHashStrength")) || 10;
PasswordUtil.salt = bcrypt.genSaltSync(PasswordUtil.saltStrength);
PasswordUtil.hash = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, PasswordUtil.salt);
};
PasswordUtil.match = (plainPassword, hashedPassword) => {
    return bcrypt.compareSync(plainPassword, hashedPassword);
};
//# sourceMappingURL=PasswordUtil.js.map