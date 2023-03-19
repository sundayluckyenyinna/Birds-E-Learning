export default class GoogleDriveUtil {
    static keyFilePath: string;
    static scopes: Array<string>;
    static uploadFile(): Promise<void>;
}
