export declare class UpdateUserResponseData {
    newEmail: string | null;
    newMobileNumber: string | null;
    newFirstName: string | null;
    newMiddleName: string | null;
    newLastName: string | null;
    newGender: string | null;
    newPhotoLink: string;
    updatedAt: Date;
    updatedBy: string;
}
export default class UpdateUserResponseDTO {
    responseCode: string;
    responseMessage: string;
    responseData: UpdateUserResponseData;
}
