import ValidateOtpData from "./data/ValidateOtpData";
export default class ValidateOtpResponseDTO {
    responseCode: string;
    responseMessage: string;
    responseData: ValidateOtpData;
}
