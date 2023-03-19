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
var UserBasicServiceUtils_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const UserSQLRepository_1 = require("../repository/UserSQLRepository");
const ApplicationPropertyConfig_1 = require("../../../config/ApplicationPropertyConfig");
const MessageSource_1 = require("../../../config/MessageSource");
const ResponseCodes_1 = require("../../../const/ResponseCodes");
const GenericConstants_1 = require("../../../const/GenericConstants");
const User_1 = require("../model/User");
const LoggerFactory_1 = require("../../../config/LoggerFactory");
const UserService_1 = require("./UserService");
const ResponseDTO_1 = require("../../../config/ResponseDTO");
const UserStatus_1 = require("../constants/UserStatus");
const UserRoles_1 = require("../constants/UserRoles");
const JwtTokenUtil_1 = require("../../../security/JwtTokenUtil");
const UpdateUserResponseDTO_1 = require("../dto/response/UpdateUserResponseDTO");
const UserPreferenceSQLRepository_1 = require("../../course/repository/UserPreferenceSQLRepository");
const Performer_1 = require("../../../const/Performer");
const PasswordUtil_1 = require("../../../security/PasswordUtil");
const UpdateUserPasswordResponseDTO_1 = require("../dto/response/UpdateUserPasswordResponseDTO");
const PaymentSQLRepository_1 = require("../../payment/repository/PaymentSQLRepository");
const OauthChannels_1 = require("../../../const/OauthChannels");
const FtpService_1 = require("../../ftp/service/FtpService");
const env = ApplicationPropertyConfig_1.default;
let UserBasicServiceUtils = UserBasicServiceUtils_1 = class UserBasicServiceUtils {
    constructor(userRepository, userPreferenceRepository, paymentRepository, ftpService, messageSource) {
        this.userRepository = userRepository;
        this.userPreferenceRepository = userPreferenceRepository;
        this.paymentRepository = paymentRepository;
        this.ftpService = ftpService;
        this.messageSource = messageSource;
        this.logger = LoggerFactory_1.default.createLogger(UserBasicServiceUtils_1.name);
    }
    async fetchAllUserDetails(requestUrl, queryParams) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        if (!queryParams.status)
            queryParams.status = UserStatus_1.UserStatus.ACTIVE;
        if (!queryParams.roles || queryParams.roles.length === 0)
            queryParams.roles = [UserRoles_1.UserRoles.STUDENT, UserRoles_1.UserRoles.INSTRUCTOR, UserRoles_1.UserRoles.ADMIN, UserRoles_1.UserRoles.CUSTOMER].join(GenericConstants_1.default.SINGLE_SPACE);
        const queryRoles = this.getRolesFromQueryParams(queryParams.roles);
        let userDetailsArray = undefined;
        try {
            userDetailsArray = (await this.userRepository.find({
                where: { status: queryParams.status }
            }))
                .filter((user) => user.userRoles.includes(queryRoles[0]));
        }
        catch (error) {
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message, error));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        code = ResponseCodes_1.default.SUCCESS;
        message = this.messageSource.getMessage(ResponseCodes_1.default.SUCCESS);
        this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
        return ResponseDTO_1.default.builder()
            .responseCode(code)
            .responseMessage(message)
            .responseData(userDetailsArray).build();
    }
    async fetchSingleUser(requestUrl, userEmail) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let dbResult;
        if (userEmail === null || userEmail === undefined || userEmail.length === 0) {
            code = ResponseCodes_1.default.BAD_REQUEST;
            message = [this.messageSource.getMessage(code), "No email address specified!"].join(" => ");
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        dbResult = await this.userRepository.findUserByEmail(userEmail);
        if (!dbResult.status) {
            this.logger.error(UserService_1.default.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        code = ResponseCodes_1.default.SUCCESS;
        message = this.messageSource.getMessage(code);
        this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
        const data = dbResult.entity;
        return ResponseDTO_1.default.builder()
            .responseCode(code)
            .responseMessage(message)
            .responseData(data)
            .build();
    }
    async updateUserDetails(requestUrl, token, requestDTO) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let dbResult;
        let response = new ResponseDTO_1.default();
        const originalEmail = JwtTokenUtil_1.default.getEmailFromToken(token);
        dbResult = await this.userRepository.findUserByEmail(originalEmail);
        if (!dbResult.status) {
            this.logger.error(UserService_1.default.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const potentialUser = dbResult.entity;
        if (potentialUser === null) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code).concat(" from token!");
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        if (potentialUser.oauth2Channel !== OauthChannels_1.OauthChannels.LOCAL_DOMAIN) {
            code = ResponseCodes_1.default.FORBIDDEN_OAUTH2_CHANNEL;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const potentialAnotherUser = (await this.userRepository.findUserByEmail(requestDTO.emailAddress)).entity;
        if (potentialAnotherUser !== null) {
            if (originalEmail !== requestDTO.emailAddress) {
                code = ResponseCodes_1.default.FORBIDDEN_EMAIL_MISMATCH;
                message = this.messageSource.getMessage(code);
                this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
                return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
            }
        }
        if (requestDTO.fullName !== null && requestDTO.fullName && requestDTO.fullName.length !== 0) {
            const names = requestDTO.fullName.split(GenericConstants_1.default.SINGLE_SPACE)
                .filter((name) => name !== GenericConstants_1.default.EMPTY_STRING)
                .filter((name) => name !== GenericConstants_1.default.SINGLE_SPACE);
            if (names.length === 2) {
                potentialUser.firstName = names[0];
                potentialUser.lastName = names[1];
            }
            else if (names.length === 3) {
                potentialUser.firstName = names[0];
                potentialUser.middleName = names[1];
                potentialUser.lastName = names[2];
            }
        }
        if (requestDTO.emailAddress !== null && requestDTO.emailAddress !== undefined && requestDTO.emailAddress.length !== 0) {
            potentialUser.emailAddress = requestDTO.emailAddress;
            potentialUser.emailAddress = requestDTO.emailAddress;
        }
        if (requestDTO.mobileNumber !== null && requestDTO.mobileNumber !== undefined && requestDTO.mobileNumber.length !== 0) {
            potentialUser.mobileNumber = requestDTO.mobileNumber;
        }
        if (requestDTO.gender !== null && requestDTO.gender !== undefined && requestDTO.gender.length !== 0) {
            potentialUser.gender = requestDTO.gender;
        }
        if (requestDTO.photoLink !== null && requestDTO.photoLink !== undefined && requestDTO.photoLink.length !== 0) {
            const imageBase64 = requestDTO.photoLink;
            potentialUser.photoLink = await this.ftpService.saveOrUpdateProfilePicture(imageBase64, potentialUser);
        }
        potentialUser.updatedAt = new Date();
        potentialUser.modifiedBy = Performer_1.Performer.USER;
        const userPartial = JSON.parse(JSON.stringify(potentialUser));
        delete Object(userPartial).userAuth;
        const userAuthPartial = JSON.parse(JSON.stringify(potentialUser));
        const newUser = new User_1.default();
        newUser.emailAddress = originalEmail;
        dbResult = await this.userRepository.updateUserAndAuth(userPartial, userAuthPartial, newUser);
        if (!dbResult.status) {
            this.logger.error(UserService_1.default.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const userPreference = (await this.userPreferenceRepository.fetchUserPreferencesByEmail(originalEmail)).entity;
        const partial = { userEmail: requestDTO.emailAddress };
        if (userPreference !== null && userPreference !== undefined) {
            await this.userPreferenceRepository.updateUserPreferencePartially(userPreference, partial);
        }
        const userCards = (await this.paymentRepository.findAllCardByUserEmail(originalEmail)).entity;
        for (let i = 0; i < userCards.length; i++) {
            const userCard = userCards[i];
            const partial = { userEmail: potentialUser.emailAddress, updatedAt: new Date() };
            await this.paymentRepository.updateCard(userCard, partial);
        }
        const data = new UpdateUserResponseDTO_1.UpdateUserResponseData();
        data.newEmail = potentialUser.emailAddress;
        data.newFirstName = potentialUser.firstName;
        data.newMiddleName = potentialUser.middleName;
        data.newLastName = potentialUser.lastName;
        data.newMobileNumber = potentialUser.mobileNumber;
        data.newPhotoLink = potentialUser.photoLink;
        data.updatedAt = potentialUser.updatedAt;
        data.updatedBy = potentialUser.modifiedBy;
        response.responseCode = ResponseCodes_1.default.SUCCESS;
        response.responseMessage = this.messageSource.getMessage(ResponseCodes_1.default.SUCCESS);
        response.responseData = data;
        return Promise.resolve(response);
    }
    async updateUserPassword(requestUrl, token, requestDTO) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let dbResult;
        let response = new ResponseDTO_1.default();
        const originalEmail = JwtTokenUtil_1.default.getEmailFromToken(token);
        dbResult = await this.userRepository.findUserByEmail(originalEmail);
        if (!dbResult.status) {
            this.logger.error(UserService_1.default.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const potentialUser = dbResult.entity;
        if (potentialUser === null) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const isPasswordMatch = PasswordUtil_1.default.match(requestDTO.oldPassword, potentialUser.password);
        if (!isPasswordMatch) {
            code = ResponseCodes_1.default.INVALID_PASSWORD;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const userPartial = { password: PasswordUtil_1.default.hash(requestDTO.newPassword), updatedAt: new Date(), modifiedBy: Performer_1.Performer.USER };
        await this.userRepository.updateUser(potentialUser, userPartial);
        code = ResponseCodes_1.default.SUCCESS;
        message = this.messageSource.getMessage(code);
        const data = new UpdateUserPasswordResponseDTO_1.UpdateUserPasswordResponseData();
        data.userEmail = potentialUser.emailAddress;
        data.userId = potentialUser.userId;
        data.updatedAt = potentialUser.updatedAt;
        response.responseCode = code;
        response.responseMessage = message;
        response.responseData = data;
        return Promise.resolve(response);
    }
    async logoutUser(requestUrl, token) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let dbResult;
        const email = JwtTokenUtil_1.default.getEmailFromToken(token);
        dbResult = await this.userRepository.findUserByEmail(email);
        if (!dbResult.status) {
            this.logger.error(UserService_1.default.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const potentialUser = dbResult.entity;
        if (potentialUser === null) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const userAuthPartial = { rememberMeActive: false };
        await this.userRepository.updateUser(potentialUser, userAuthPartial);
        return ResponseDTO_1.default.builder()
            .responseCode(ResponseCodes_1.default.SUCCESS)
            .responseMessage(this.messageSource.getMessage(ResponseCodes_1.default.SUCCESS))
            .build();
    }
    getRolesFromQueryParams(queryParamString) {
        return queryParamString
            .split(GenericConstants_1.default.SINGLE_SPACE)
            .filter(value => value !== GenericConstants_1.default.SINGLE_SPACE)
            .filter(value => value !== GenericConstants_1.default.EMPTY_STRING);
    }
};
UserBasicServiceUtils = UserBasicServiceUtils_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserSQLRepository_1.default,
        UserPreferenceSQLRepository_1.default,
        PaymentSQLRepository_1.default,
        FtpService_1.default,
        MessageSource_1.default])
], UserBasicServiceUtils);
exports.default = UserBasicServiceUtils;
//# sourceMappingURL=UserBasicServiceUtils.js.map