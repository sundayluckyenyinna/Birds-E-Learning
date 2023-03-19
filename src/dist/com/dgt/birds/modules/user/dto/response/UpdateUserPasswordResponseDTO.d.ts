export declare class UpdateUserPasswordResponseData {
    userEmail: string;
    userId: string;
    updatedAt: Date;
}
export default class UpdateUserPasswordResponseDTO {
    responseCode: string;
    responseMessage: string;
    responseData: UpdateUserPasswordResponseData;
}
