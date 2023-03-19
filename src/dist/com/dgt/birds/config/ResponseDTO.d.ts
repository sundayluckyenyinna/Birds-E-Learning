import ResponseBuilder from "../modules/user/builder/ResponseBuilder";
import { HttpStatus } from "@nestjs/common";
export default class ResponseDTO {
    responseCode: string;
    responseMessage: string;
    responseData?: Object;
    httpStatus: HttpStatus;
    static builder: () => ResponseBuilder;
}
