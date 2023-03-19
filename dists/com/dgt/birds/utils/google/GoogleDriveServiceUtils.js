"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const ApplicationPropertyConfig_1 = require("../../config/ApplicationPropertyConfig");
const environment = ApplicationPropertyConfig_1.default;
class GoogleDriveServiceUtils {
}
exports.default = GoogleDriveServiceUtils;
_a = GoogleDriveServiceUtils;
GoogleDriveServiceUtils.deleteProfileImage = async (fileId) => {
    try {
        await GoogleDriveServiceUtils.getClientDriver().files.delete({ fileId: fileId });
        return true;
    }
    catch (error) {
        return false;
    }
};
GoogleDriveServiceUtils.createUserProfileImageGetLink = async (metadata) => {
    const fileSaved = await GoogleDriveServiceUtils.getClientDriver().files.create({
        media: { mimeType: metadata.mimeType, body: metadata.bodyStream },
        requestBody: { name: metadata.name, mimeType: metadata.mimeType, parents: [GoogleDriveServiceUtils.getGoogleDriveParentFolderId()] }
    });
    await GoogleDriveServiceUtils.makeFileAccessible(fileSaved.data.id);
    try {
        const retrievedFileDriveLink = await GoogleDriveServiceUtils.getClientDriver().files.get({ fields: "id,webViewLink", fileId: fileSaved.data.id });
        const link = "https://drive.google.com/uc?export=view&id=".concat(fileSaved.data.id);
        return { webViewLink: link, picId: fileSaved.data.id };
    }
    catch (err) {
        if (err.code === 404)
            return undefined;
    }
    return undefined;
};
GoogleDriveServiceUtils.createFolderAndGetId = async () => {
    const folderFile = await GoogleDriveServiceUtils.getClientDriver().files.create({
        fields: 'id,name', requestBody: { name: 'Profiles', mimeType: "application/vnd.google-apps.folder" }
    });
    await GoogleDriveServiceUtils.makeFileAccessible(folderFile.data.id);
    return folderFile.data.id;
};
GoogleDriveServiceUtils.getClientDriver = () => {
    return googleapis_1.google.drive({ version: 'v3', auth: GoogleDriveServiceUtils.getClientAuthorization() });
};
GoogleDriveServiceUtils.getClientAuthorization = () => {
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
GoogleDriveServiceUtils.makeFileAccessible = async (fileId) => {
    await GoogleDriveServiceUtils.getClientDriver().permissions.create({
        fileId: fileId, requestBody: { role: "reader", type: "anyone" }
    });
};
GoogleDriveServiceUtils.getGoogleDriveParentFolderId = () => {
    return environment.getProperty("birds.storage.drive.parentFolderId");
};
//# sourceMappingURL=GoogleDriveServiceUtils.js.map