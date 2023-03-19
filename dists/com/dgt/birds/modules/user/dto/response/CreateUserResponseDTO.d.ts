import CreateUserResData from "./data/CreateUserResData";
export default class CreateUserResponseDTO {
    responseCode: string;
    responseMessage: string;
    responseData: CreateUserResData;
}
