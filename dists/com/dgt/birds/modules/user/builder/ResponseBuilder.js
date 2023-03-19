"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseDTO_1 = require("../../../config/ResponseDTO");
class ResponseBuilder {
    constructor() {
        this.responseDTO = new ResponseDTO_1.default();
        this.responseCode = (responseCode) => {
            this.responseDTO.responseCode = responseCode;
            return this;
        };
        this.responseMessage = (responseMessage) => {
            this.responseDTO.responseMessage = responseMessage;
            return this;
        };
        this.responseData = (responseData) => {
            this.responseDTO.responseData = responseData;
            return this;
        };
        this.httpStatus = (status) => {
            this.responseDTO.httpStatus = status;
            return this;
        };
        this.build = () => this.responseDTO;
    }
}
exports.default = ResponseBuilder;
//# sourceMappingURL=ResponseBuilder.js.map