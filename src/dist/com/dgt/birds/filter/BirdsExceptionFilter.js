"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const MessageSource_1 = require("../config/MessageSource");
const ResponseCodes_1 = require("../const/ResponseCodes");
const ResponseDTO_1 = require("../config/ResponseDTO");
let BirdsExceptionFilter = class BirdsExceptionFilter {
    constructor() {
        this.messageSource = new MessageSource_1.default();
    }
    catch(exception, host) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const status = exception.getStatus();
        let errorMessage = "Bad request";
        const message = exception.getResponse()['message'];
        if (typeof message === 'string')
            errorMessage = message;
        else if (typeof message === 'object')
            errorMessage = message.join(', ');
        const errorResponse = ResponseDTO_1.default.builder()
            .responseCode(ResponseCodes_1.default.BAD_REQUEST)
            .responseMessage(errorMessage).build();
        response.status(status).json(errorResponse);
    }
};
BirdsExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.BadRequestException)
], BirdsExceptionFilter);
exports.default = BirdsExceptionFilter;
//# sourceMappingURL=BirdsExceptionFilter.js.map