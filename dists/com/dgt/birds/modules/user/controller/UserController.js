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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const UserApiPaths_1 = require("../constants/UserApiPaths");
const CreateUserRequestDTO_1 = require("../dto/request/CreateUserRequestDTO");
const UserService_1 = require("../service/UserService");
const ResponseDTO_1 = require("../../../config/ResponseDTO");
const LoginUserRequestDTO_1 = require("../dto/request/LoginUserRequestDTO");
const swagger_1 = require("@nestjs/swagger");
const LoginUserResponseDTO_1 = require("../dto/response/LoginUserResponseDTO");
const LoggerFactory_1 = require("../../../config/LoggerFactory");
const CreateUserResponseDTO_1 = require("../dto/response/CreateUserResponseDTO");
const ValidateOtpRequestDTO_1 = require("../dto/request/ValidateOtpRequestDTO");
const ValidateOtpResponseDTO_1 = require("../dto/response/ValidateOtpResponseDTO");
const SwaggerDocsSchema_1 = require("../../../api-schema/SwaggerDocsSchema");
const ResponseDispatcher_1 = require("../../../config/ResponseDispatcher");
const Oauth2ValidateUserRequestDTO_1 = require("../dto/request/Oauth2ValidateUserRequestDTO");
const UpdatePasswordRequestDTO_1 = require("../dto/request/UpdatePasswordRequestDTO");
const UpdatePasswordResponseDTO_1 = require("../dto/response/UpdatePasswordResponseDTO");
const OauthConsentUserRequestDTO_1 = require("../dto/request/OauthConsentUserRequestDTO");
const UserDetailsListDTO_1 = require("../dto/response/UserDetailsListDTO");
const UpdateUserDetailsRequestDTO_1 = require("../dto/request/UpdateUserDetailsRequestDTO");
const GenericConstants_1 = require("../../../const/GenericConstants");
const UpdateUserPasswordRequestDTO_1 = require("../dto/request/UpdateUserPasswordRequestDTO");
const UpdateUserResponseDTO_1 = require("../dto/response/UpdateUserResponseDTO");
const UpdateUserPasswordResponseDTO_1 = require("../dto/response/UpdateUserPasswordResponseDTO");
const BasicResponseDTO_1 = require("../../course/dto/response/BasicResponseDTO");
const class_validator_1 = require("class-validator");
class Test {
}
__decorate([
    (0, class_validator_1.IsBase64)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Test.prototype, "image", void 0);
let UserController = UserController_1 = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.logger = LoggerFactory_1.default.createLogger(UserController_1.name);
        this.getAuthToken = (request) => {
            const authHeader = request.get(GenericConstants_1.default.AUTH_HEADER) || GenericConstants_1.default.EMPTY_STRING;
            const token = authHeader.replace("Bearer ", GenericConstants_1.default.EMPTY_STRING);
            return token.trim();
        };
    }
    async handleSignUpUserRequest(req, res, requestDTO) {
        const serviceResponse = await this.userService.createUserBasic(req.url, requestDTO);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleUserLoginRequest(req, res, loginRequest) {
        const serviceResponse = await this.userService.loginUserBasic(req.url, loginRequest);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleAutomaticUserLoginRequest(req, res, automaticLoginRequest) {
        const serviceResponse = await this.userService.loginUserAutomatic(req.url, automaticLoginRequest);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleOtpValidation(req, res, requestDTO) {
        const serviceResponse = await this.userService.validateOtp(req.url, requestDTO);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async sendPasswordEmail(req, res, email) {
        const serviceResponse = await this.userService.sendResetPasswordMail(req.url, email);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleShowResetPasswordPage(req, res, encodedEmail) {
        const encodedMailKey = Buffer.from('x-mail-id').toString('base64');
        res.cookie(encodedMailKey, encodedEmail);
        const serviceResponse = await this.userService.sendResetPasswordPage(req.url, encodedEmail);
        return res.status(200).send(serviceResponse).contentType("text/html");
    }
    async handlePasswordChangeSubmit(req, res, requestBody) {
        console.log("Request Body: " + requestBody);
        return res.status(200).json(requestBody);
    }
    async handleUserOauth2ConsentRequest(req, res, requestDTO) {
        const serviceResponse = await this.userService.getOauth2UserConsentUrl(req.url, requestDTO);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleUserOauth2ConsentValidation(req, res, requestDTO) {
        const serviceResponse = await this.userService.validateOauth2User(req.url, requestDTO);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleSendOtpRequest(req, res, email) {
        const serviceResponse = await this.userService.sendVerificationOtp(req.url, email);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleConsent(res, code, state) {
        return res.status(200).json({ code: code, state: state });
    }
    async handleMobilePasswordResetRequest(req, res, email) {
        const serviceResponse = await this.userService.sendPasswordResetMailForMobile(req.url, email);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleOtpForMobilePasswordReset(req, res, requestDTO) {
        const serviceResponse = await this.userService.validateForgetPasswordOTPForMobile(req.url, requestDTO);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleUpdateOfMobilePassword(req, res, requestDTO) {
        const serviceResponse = await this.userService.updateUserPasswordForMobile(req.url, requestDTO);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleUserDetailsRequest(req, res) {
        const [status, userRoleString] = [req.query['status'], req.query['roles']];
        const query = { status: status, roles: userRoleString };
        const serviceResponse = await this.userService.getAllUserDetails(req.url, query);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleGetSingleUserDetailsRequest(req, res, email) {
        const serviceResponse = await this.userService.getSingleUserByEmail(req.url, email);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleUserDetailsUpdate(req, res, requestDTO) {
        const token = this.getAuthToken(req);
        const serviceResponse = await this.userService.updateUserDetails(req.url, token, requestDTO);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleUserPasswordUpdate(req, res, requestDTO) {
        const authToken = this.getAuthToken(req);
        const serviceResponse = await this.userService.updateUserPassword(req.url, authToken, requestDTO);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleUserLogout(req, res) {
        const authToken = this.getAuthToken(req);
        const serviceResponse = await this.userService.logoutUser(req.url, authToken);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
};
__decorate([
    (0, common_1.Post)(UserApiPaths_1.default.USER_BASIC_SIGN_UP),
    (0, swagger_1.ApiOperation)({ description: "This API is used to sign-up a new user into the application. An OTP will be sent automatically to the user's email address for verification." }),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: CreateUserResponseDTO_1.default }),
    (0, swagger_1.ApiCreatedResponse)({ description: "Successful response", status: 201, type: CreateUserResponseDTO_1.default }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, CreateUserRequestDTO_1.default]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleSignUpUserRequest", null);
__decorate([
    (0, common_1.Post)(UserApiPaths_1.default.USER_BASIC_LOGIN),
    (0, swagger_1.ApiOperation)({ description: "This API is used to log a user into the application. The API returns the user's login response data on successful handshake. " }),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: LoginUserResponseDTO_1.default }),
    (0, swagger_1.ApiCreatedResponse)({ description: "Successful response", status: 201, type: LoginUserResponseDTO_1.default }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, LoginUserRequestDTO_1.default]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleUserLoginRequest", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "This API is used to log in a user that has enabled the 'RememberMe feature'. Here, only the deviceId is required to track the last logged-in user. WEB channel is forbidden to call this endpoint as they are obliged to use Cookies to maintain user sessions." }),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", type: LoginUserResponseDTO_1.default }),
    (0, swagger_1.ApiCreatedResponse)({ description: "Successful response", type: LoginUserResponseDTO_1.default }),
    (0, common_1.Post)(UserApiPaths_1.default.USER_BASIC_AUTOMATIC_LOGIN),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, LoginUserRequestDTO_1.AutomaticLoginRequestDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleAutomaticUserLoginRequest", null);
__decorate([
    (0, common_1.Post)(UserApiPaths_1.default.USER_VALID_OTP),
    (0, swagger_1.ApiOperation)({ description: "This API is used to validate the OTP sent to the user at sign-up stage. " }),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: ValidateOtpResponseDTO_1.default }),
    (0, swagger_1.ApiCreatedResponse)({ description: "Successful response", status: 201, type: ValidateOtpResponseDTO_1.default }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, ValidateOtpRequestDTO_1.default]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleOtpValidation", null);
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Get)(UserApiPaths_1.default.USER_PASSWORD_RESET_PAGE_REQUEST),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendPasswordEmail", null);
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Get)(UserApiPaths_1.default.USER_PASSWORD_RESET_PAGE),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('x-mail-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleShowResetPasswordPage", null);
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Post)(UserApiPaths_1.default.USER_PASSWORD_NEW_SUBMIT),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handlePasswordChangeSubmit", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "This API is used to get the Oauth2 authorization URL for a specified authorization provider. The currently supported providers are GOOGLE and FACEBOOK " }),
    (0, swagger_1.ApiOkResponse)({ description: "Successful operation", type: SwaggerDocsSchema_1.Oauth2ConsentUrlDTO }),
    (0, common_1.Post)(UserApiPaths_1.default.USER_OAUTH_CONSENT),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, OauthConsentUserRequestDTO_1.default]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleUserOauth2ConsentRequest", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "This API is called when a user has consented to an Oauth2 authorization server for access by this application. The API will provide the login response of the user for display on the user's dashboard." }),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", type: LoginUserResponseDTO_1.default }),
    (0, common_1.Post)(UserApiPaths_1.default.USER_OAUTH_CONSENT_VALIDATION),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Oauth2ValidateUserRequestDTO_1.default]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleUserOauth2ConsentValidation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "This API is used to send a sign-up OTP to a user for email verification. This APi should only be called when in the rare case, the user did not receive an OTP automatically at sign-up time." }),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", type: ResponseDTO_1.default }),
    (0, common_1.Get)(UserApiPaths_1.default.USER_SEND_OTP),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)("emailAddress")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleSendOtpRequest", null);
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Get)("/oauth2/consent-signup"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('code')),
    __param(2, (0, common_1.Query)('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleConsent", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "This API is used to request for a password reset OTP. The OTP will be sent to the user's specified email address" }),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: ResponseDTO_1.default }),
    (0, common_1.Get)(UserApiPaths_1.default.USER_PASSWORD_MOBILE_RESET_MAIL_REQUEST),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleMobilePasswordResetRequest", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "This API is used to validate the OTP sent to a user via mail for the sake of password reset." }),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: ValidateOtpResponseDTO_1.default }),
    (0, common_1.Post)(UserApiPaths_1.default.USER_PASSWORD_RESET_OTP_VALIDATION),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, ValidateOtpRequestDTO_1.default]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleOtpForMobilePasswordReset", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "This API is used to update the Password of a user that has verified Password reset otp." }),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: UpdatePasswordResponseDTO_1.default }),
    (0, common_1.Post)(UserApiPaths_1.default.USER_PASSWORD_RESET_SUBMIT_REQUEST),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, UpdatePasswordRequestDTO_1.default]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleUpdateOfMobilePassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "This API is used to fetch a list of user details" }),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: UserDetailsListDTO_1.default }),
    (0, swagger_1.ApiQuery)({ name: "status", required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: "roles", required: false, type: String }),
    (0, common_1.Get)(UserApiPaths_1.default.USER_GET_ALL),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleUserDetailsRequest", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "This API is used to fetch the details of a single user." }),
    (0, swagger_1.ApiOkResponse)({ description: "Success response", status: 200, type: UserDetailsListDTO_1.UserDetailsDTO }),
    (0, common_1.Get)(UserApiPaths_1.default.USER_GET_SINGLE),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleGetSingleUserDetailsRequest", null);
__decorate([
    (0, common_1.Post)(UserApiPaths_1.default.USER_DETAILS_UPDATE),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: UpdateUserResponseDTO_1.default }),
    (0, swagger_1.ApiHeader)({ name: "Authorization", description: "Authorization bearer token", required: true }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, UpdateUserDetailsRequestDTO_1.default]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleUserDetailsUpdate", null);
__decorate([
    (0, common_1.Post)(UserApiPaths_1.default.USER_PASSWORD_UPDATE),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: UpdateUserPasswordResponseDTO_1.default }),
    (0, swagger_1.ApiHeader)({ name: "Authorization", description: "Authorization bearer token", required: true }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, UpdateUserPasswordRequestDTO_1.default]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleUserPasswordUpdate", null);
__decorate([
    (0, common_1.Get)(UserApiPaths_1.default.USER_LOG_OUT),
    (0, swagger_1.ApiOperation)({ description: "This API is used to logout a user from the system. Also the password is no more remembered after this endpoint is called for the user." }),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: BasicResponseDTO_1.default }),
    (0, swagger_1.ApiHeader)({ name: "Authorization", description: "Authorization bearer token", required: true }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleUserLogout", null);
UserController = UserController_1 = __decorate([
    (0, swagger_1.ApiTags)('User Management'),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Bad request response", status: 400, type: SwaggerDocsSchema_1.BadRequestResponseDTO }),
    (0, swagger_1.ApiCreatedResponse)({ status: 200 }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "Server error", type: SwaggerDocsSchema_1.InternalServerErrorResponseDTO }),
    (0, common_1.Controller)(UserApiPaths_1.default.USER_BASE_API),
    __metadata("design:paramtypes", [UserService_1.default])
], UserController);
exports.default = UserController;
//# sourceMappingURL=UserController.js.map