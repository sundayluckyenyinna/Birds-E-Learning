"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const ApplicationPropertyConfig_1 = require("../../config/ApplicationPropertyConfig");
const environment = ApplicationPropertyConfig_1.default;
class GoogleDriveService {
}
exports.default = GoogleDriveService;
_a = GoogleDriveService;
GoogleDriveService.deleteProfileImage = async () => {
    await GoogleDriveService.getClientDriver();
    return true;
};
GoogleDriveService.createUserProfileImageGetLink = async (metadata) => {
    const fileSaved = await GoogleDriveService.getClientDriver().files.create({
        media: { mimeType: metadata.mimeType, body: metadata.bodyStream },
        requestBody: { name: metadata.name, mimeType: metadata.mimeType, parents: [GoogleDriveService.getGoogleDriveParentFolderId()] }
    });
    await GoogleDriveService.makeFileAccessible(fileSaved.data.id);
    try {
        const retrievedFileDriveLink = await GoogleDriveService.getClientDriver().files.get({ fields: "webViewLink", fileId: fileSaved.data.id });
        const files = await GoogleDriveService.getClientDriver().files.get({ fields: 'id,name' });
        console.log("Files: " + files);
        return "https://drive.google.com/uc?export=view&id=".concat(fileSaved.data.id);
    }
    catch (err) {
        console.log("Error: ".concat("Something went wrong"));
        if (err.code === 404)
            return undefined;
    }
    return undefined;
};
GoogleDriveService.createFolderAndGetId = async () => {
    const folderFile = await GoogleDriveService.getClientDriver().files.create({
        fields: 'id,name', requestBody: { name: 'Profiles', mimeType: "application/vnd.google-apps.folder" }
    });
    await GoogleDriveService.makeFileAccessible(folderFile.data.id);
    return folderFile.data.id;
};
GoogleDriveService.getClientDriver = () => {
    return googleapis_1.google.drive({ version: 'v3', auth: GoogleDriveService.getClientAuthorization() });
};
GoogleDriveService.getClientAuthorization = () => {
    const clientId = "140771728357-i41qtj1jmat1f5s9522rtg8bkbgids9r.apps.googleusercontent.com";
    const clientSecret = "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";
    const redirectUri = "https://developers.google.com/oauthplayground";
    const refreshToken = "1//04GVR_RPg_EBMCgYIARAAGAQSNwF-L9IrziVZ40Pk1ZVe6XzGfp3x_3TFiS7u3io2HQmc-v746IABIOKUCMJqPZB2nhmMRyPmq_c";
    const googleAuth = new googleapis_1.google.auth.OAuth2({
        clientId: clientId,
        clientSecret: clientSecret,
        redirectUri: redirectUri,
        forceRefreshOnFailure: true
    });
    googleAuth.setCredentials({ refresh_token: refreshToken });
    return googleAuth;
};
GoogleDriveService.makeFileAccessible = async (fileId) => {
    await GoogleDriveService.getClientDriver().permissions.create({
        fileId: fileId, requestBody: { role: "reader", type: "anyone" }
    });
};
GoogleDriveService.getGoogleDriveParentFolderId = () => {
    return environment.getProperty("birds.storage.drive.parentFolderId");
};
//# sourceMappingURL=GoogleDriveService.js.map