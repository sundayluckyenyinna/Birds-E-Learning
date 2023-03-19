"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationPropertyConfig_1 = require("../../config/ApplicationPropertyConfig");
const path = require("path");
const env = ApplicationPropertyConfig_1.default;
class FtpFileHandler {
    static async uploadProfilePic() {
    }
}
exports.default = FtpFileHandler;
FtpFileHandler.pathToProfilePicFolder = path.join("public_html", "blns", "public", "uploads", "demo", "team");
//# sourceMappingURL=FtpFileHandler.js.map