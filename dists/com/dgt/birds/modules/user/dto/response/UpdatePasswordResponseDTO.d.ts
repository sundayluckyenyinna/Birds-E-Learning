export declare class UpdatePasswordResponseData {
    newPassword: string;
    dateUpdated: Date;
}
export default class UpdatePasswordResponseDTO {
    responseCode: string;
    responseMessage: string;
    responseData: UpdatePasswordResponseData;
}
