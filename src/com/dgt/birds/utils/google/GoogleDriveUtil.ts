/* eslint-disable */
import { google } from "googleapis";
import * as path from "path";
import * as fs from 'fs';

export default class GoogleDriveUtil
{
    static keyFilePath: string = path.join(__dirname, 'profile-drive-test-a5f2ae9e8d42.json');
    static scopes: Array<string> = ['https://www.googleapis.com/auth/drive'];

    static async uploadFile(){
       console.log("Key file path: ".concat(GoogleDriveUtil.keyFilePath));
       const auth = new google.auth.GoogleAuth({
         keyFile: GoogleDriveUtil.keyFilePath,
         scopes: GoogleDriveUtil.scopes
       });

       const driveService = google.drive({
          version: 'v3',
          auth: auth
       });

       const metadata = {
          name: 'Test image another',
         parents: ['Parent-Folder']
       }

       const media = {
          mimeType: 'image/png',
          body: fs.createReadStream(path.join(__dirname, 'Birds.png'))
       }

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

      const file = (await driveService.files.get({fileId: response.data.id, fields: 'webViewLink'}));

       console.log("Response: ".concat(JSON.stringify(file.data.webViewLink)));

    }
}