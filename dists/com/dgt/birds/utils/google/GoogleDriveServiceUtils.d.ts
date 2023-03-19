/// <reference types="node" />
import { ReadStream } from "fs";
export default class GoogleDriveServiceUtils {
    static deleteProfileImage: (fileId: string) => Promise<boolean>;
    static createUserProfileImageGetLink: (metadata: FileMetadata) => Promise<ProfilePicMetadata>;
    static createFolderAndGetId: () => Promise<string | undefined>;
    static getClientDriver: () => import("googleapis").drive_v3.Drive;
    static getClientAuthorization: () => import("google-auth-library").OAuth2Client;
    static makeFileAccessible: (fileId: string) => Promise<void>;
    static getGoogleDriveParentFolderId: () => string;
}
export interface FileMetadata {
    name: string;
    mimeType: string;
    bodyStream: ReadStream;
}
export interface ProfilePicMetadata {
    webViewLink: string;
    picId: string;
}
