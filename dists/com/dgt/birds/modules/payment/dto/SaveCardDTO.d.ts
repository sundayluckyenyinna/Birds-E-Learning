export declare class SaveOrRemoveUserResponseData {
    userEmail: string;
    userId: string;
    cardNo: string;
    expiryDate: string;
    cvv: string;
    cardType: string;
    createdDate: Date;
    updatedAt: Date;
}
export declare class SaveUserCardRequestDTO {
    cardNo: string;
    expiryDate: string;
    cvv: string;
}
export declare class SaveUserCardResponseDTO {
    responseCode: string;
    responseMessage: string;
    responseData: SaveOrRemoveUserResponseData;
}
export declare class PaymentCardList {
    responseCode: string;
    responseMessage: string;
    responseData: Array<SaveOrRemoveUserResponseData>;
}
