/* eslint-disable */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SaveOrRemoveUserResponseData {
   @ApiProperty() userEmail: string;
   @ApiProperty() userId: string;
   @ApiProperty() cardNo: string;
   @ApiProperty() expiryDate: string;
   @ApiProperty() cvv: string;
   @ApiProperty() cardType: string;
   @ApiProperty() createdDate: Date;
   @ApiProperty() updatedAt: Date;
}
export class SaveUserCardRequestDTO{
   @ApiProperty() @IsNotEmpty() cardNo: string;
   @ApiProperty() expiryDate: string;
   @ApiProperty() cvv: string;

}

export class SaveUserCardResponseDTO{
   @ApiProperty() responseCode: string;
   @ApiProperty() responseMessage: string;
   @ApiProperty() responseData: SaveOrRemoveUserResponseData
}

export class PaymentCardList{
    @ApiProperty() responseCode: string;
    @ApiProperty() responseMessage: string;
    @ApiProperty({ isArray: true, type: SaveOrRemoveUserResponseData }) responseData: Array<SaveOrRemoveUserResponseData>
}