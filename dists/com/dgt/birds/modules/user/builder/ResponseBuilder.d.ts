import ResponseDTO from "../../../config/ResponseDTO";
import { HttpStatus } from "@nestjs/common";
export default class ResponseBuilder {
    private responseDTO;
    responseCode: (responseCode: string) => ResponseBuilder;
    responseMessage: (responseMessage: string) => ResponseBuilder;
    responseData: (responseData: Object) => ResponseBuilder;
    httpStatus: (status: HttpStatus) => ResponseBuilder;
    build: () => ResponseDTO;
}
