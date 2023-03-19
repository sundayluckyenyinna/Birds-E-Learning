"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthenticationMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const UserSQLRepository_1 = require("../modules/user/repository/UserSQLRepository");
const ResponseCodes_1 = require("../const/ResponseCodes");
const ResponseDTO_1 = require("../config/ResponseDTO");
const JwtTokenUtil_1 = require("../security/JwtTokenUtil");
const MessageSource_1 = require("../config/MessageSource");
const GenericConstants_1 = require("../const/GenericConstants");
const LoggerFactory_1 = require("../config/LoggerFactory");
let AuthenticationMiddleware = AuthenticationMiddleware_1 = class AuthenticationMiddleware {
    constructor(userRepository, messageSource) {
        this.userRepository = userRepository;
        this.messageSource = messageSource;
        this.logger = LoggerFactory_1.default.createLogger(AuthenticationMiddleware_1.name);
    }
    async use(req, res, next) {
        const requestUrl = req.originalUrl;
        this.logger.info("Endpoint: ".concat(requestUrl));
        if (!requestUrl.startsWith("/user") && !requestUrl.startsWith("/img")) {
            const authorizationHeader = req.get(GenericConstants_1.default.AUTH_HEADER);
            let code = ResponseCodes_1.default.FAILED_AUTHENTICATION;
            let message;
            let dbResult;
            let response;
            let failureOrSuccessPrefix = "Authorization status: ";
            let reasonString = ", Reason: ";
            if (authorizationHeader === null || authorizationHeader === undefined) {
                message = this.messageSource.getRawMessage("security.auth.noAuthProvided");
                response = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
                this.logger.info(failureOrSuccessPrefix.concat("Failed").concat(reasonString).concat(message));
                return res.status(401).json(response);
            }
            if (!authorizationHeader.startsWith("Bearer ")) {
                message = this.messageSource.getRawMessage('security.auth.invalidFormatAuthHeader');
                response = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
                this.logger.info(failureOrSuccessPrefix.concat("Failed").concat(reasonString).concat(message));
                return res.status(403).json(response);
            }
            if (authorizationHeader.length === 0) {
                message = this.messageSource.getRawMessage("security.auth.blankAuth");
                response = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
                this.logger.info(failureOrSuccessPrefix.concat("Failed").concat(reasonString).concat(message));
                return res.status(401).json(response);
            }
            const token = authorizationHeader.replace(GenericConstants_1.default.AUTH_PREFIX, GenericConstants_1.default.EMPTY_STRING);
            const email = JwtTokenUtil_1.default.getEmailFromToken(token);
            dbResult = await this.userRepository.findUserByEmail(email);
            if (dbResult.status) {
                if (dbResult.entity === null) {
                    message = this.messageSource.getRawMessage("security.auth.noRecord");
                    response = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
                    this.logger.info(failureOrSuccessPrefix.concat("Failed").concat(reasonString).concat(message));
                    return res.status(401).json(response);
                }
            }
            dbResult = await this.userRepository.findUserByEmail(email);
            if (dbResult) {
                if (dbResult.entity !== null) {
                    const isExpiredToken = JwtTokenUtil_1.default.isTokenExpired(dbResult.entity);
                    if (isExpiredToken) {
                        message = this.messageSource.getRawMessage("security.auth.tokenExpired");
                        response = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
                        this.logger.info(failureOrSuccessPrefix.concat("Failed").concat(reasonString).concat(message));
                        return res.status(401).json(response);
                    }
                }
            }
            this.logger.info(failureOrSuccessPrefix.concat("Success").concat(reasonString).concat("All criteria passed!"));
        }
        next();
    }
};
AuthenticationMiddleware = AuthenticationMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserSQLRepository_1.default,
        MessageSource_1.default])
], AuthenticationMiddleware);
exports.default = AuthenticationMiddleware;
//# sourceMappingURL=AuthenticationMiddleware.js.map