"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const path = require("path");
const fs = require("fs");
class GoogleDriveUtil {
    static async uploadFile() {
        console.log("Key file path: ".concat(GoogleDriveUtil.keyFilePath));
        const auth = new googleapis_1.google.auth.GoogleAuth({
            keyFile: GoogleDriveUtil.keyFilePath,
            scopes: GoogleDriveUtil.scopes
        });
        const driveService = googleapis_1.google.drive({
            version: 'v3',
            auth: auth
        });
        const metadata = {
            name: 'Test image another',
            parents: ['Parent-Folder']
        };
        const media = {
            mimeType: 'image/png',
            body: fs.createReadStream(path.join(__dirname, 'Birds.png'))
        };
        const response = await driveService.files.create({
            media: media, requestBody: metadata
        });
        await driveService.permissions.create({
            fileId: response.data.id,
            requestBody: {
                role: "reader",
                type: "anyone"
            }
        });
        const file = (await driveService.files.get({ fileId: response.data.id, fields: 'webViewLink' }));
        console.log("Response: ".concat(JSON.stringify(file.data.webViewLink)));
    }
}
exports.default = GoogleDriveUtil;
GoogleDriveUtil.keyFilePath = path.join(__dirname, 'profile-drive-test-a5f2ae9e8d42.json');
GoogleDriveUtil.scopes = ['https://www.googleapis.com/auth/drive'];
//# sourceMappingURL=GoogleDriveUtil.js.map