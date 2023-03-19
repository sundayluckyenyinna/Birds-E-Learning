/*eslint-disable*/

import { google } from "googleapis";
import { ReadStream } from "fs";
import ApplicationPropertyConfig from "../../config/ApplicationPropertyConfig";


const environment = ApplicationPropertyConfig;
export default class GoogleDriveServiceUtils
{

     static deleteProfileImage = async (fileId: string): Promise<boolean> => {
       try {
         await GoogleDriveServiceUtils.getClientDriver().files.delete({fileId: fileId});
         return true;
       }catch (error){
          return false;
       }
     }

     static createUserProfileImageGetLink = async (metadata: FileMetadata): Promise<ProfilePicMetadata> => {
       // Create the file
       const fileSaved = await GoogleDriveServiceUtils.getClientDriver().files.create({
         media: { mimeType: metadata.mimeType, body: metadata.bodyStream },
         requestBody: { name: metadata.name, mimeType: metadata.mimeType, parents: [GoogleDriveServiceUtils.getGoogleDriveParentFolderId()] }
       });

       // Make the folder accessible
       await GoogleDriveServiceUtils.makeFileAccessible(fileSaved.data.id);

       // Return the public link to the image.
       try{
          const retrievedFileDriveLink = await GoogleDriveServiceUtils.getClientDriver().files.get({ fields: "id,webViewLink", fileId: fileSaved.data.id });
          const link: string =  "https://drive.google.com/uc?export=view&id=".concat(fileSaved.data.id);
          return { webViewLink: link, picId: fileSaved.data.id };
        }catch (err){
          if(err.code === 404)
            return undefined;
        }
       return undefined;
     }

     static createFolderAndGetId = async (): Promise<string | undefined> => {
       // Create the folder
       const folderFile = await GoogleDriveServiceUtils.getClientDriver().files.create({
            fields: 'id,name', requestBody: { name: 'Profiles', mimeType: "application/vnd.google-apps.folder" }
        });

       // Make the folder accessible
       await GoogleDriveServiceUtils.makeFileAccessible(folderFile.data.id);
       return folderFile.data.id;
     }

     static getClientDriver = () => {
          return google.drive({ version: 'v3', auth: GoogleDriveServiceUtils.getClientAuthorization() });
     }
     static getClientAuthorization = () => {
         const clientId: string = "140771728357-i41qtj1jmat1f5s9522rtg8bkbgids9r.apps.googleusercontent.com";
         const clientSecret: string = "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";
         const redirectUri: string = "https://developers.google.com/oauthplayground";
         const refreshToken: string = "1//04GVR_RPg_EBMCgYIARAAGAQSNwF-L9IrziVZ40Pk1ZVe6XzGfp3x_3TFiS7u3io2HQmc-v746IABIOKUCMJqPZB2nhmMRyPmq_c";

         const googleAuth = new google.auth.OAuth2({
            clientId: clientId,
            clientSecret: clientSecret,
            redirectUri: redirectUri,
            forceRefreshOnFailure: true
         });

         googleAuth.setCredentials({ refresh_token: refreshToken });

         return googleAuth;
     }

     static makeFileAccessible = async (fileId: string): Promise<void> => {
         await GoogleDriveServiceUtils.getClientDriver().permissions.create({
           fileId: fileId, requestBody: { role: "reader", type: "anyone" }
         });
     }

     static getGoogleDriveParentFolderId = (): string => {
        return environment.getProperty("birds.storage.drive.parentFolderId");
     }

}

export interface FileMetadata {
   name: string,
   mimeType: string,
   bodyStream: ReadStream
}

export interface ProfilePicMetadata{
   webViewLink: string;
   picId: string;
}