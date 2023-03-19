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
var UserBasicService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerFactory_1 = require("../../../config/LoggerFactory");
const UserSQLRepository_1 = require("../repository/UserSQLRepository");
const MessageSource_1 = require("../../../config/MessageSource");
const ResponseDTO_1 = require("../../../config/ResponseDTO");
const ResponseCodes_1 = require("../../../const/ResponseCodes");
const common_1 = require("@nestjs/common");
const JwtTokenUtil_1 = require("../../../security/JwtTokenUtil");
const RequestChannels_1 = require("../../../const/RequestChannels");
const User_1 = require("../model/User");
const BirdsHelper_1 = require("../../../utils/BirdsHelper");
const UserStatus_1 = require("../constants/UserStatus");
const PasswordUtil_1 = require("../../../security/PasswordUtil");
const OtpUtil_1 = require("../../../security/OtpUtil");
const OauthChannels_1 = require("../../../const/OauthChannels");
const GenericConstants_1 = require("../../../const/GenericConstants");
const LoginUserRequestDTO_1 = require("../dto/request/LoginUserRequestDTO");
const ValidateOtpData_1 = require("../dto/response/data/ValidateOtpData");
const UserService_1 = require("./UserService");
const ApplicationPropertyConfig_1 = require("../../../config/ApplicationPropertyConfig");
const TemplateHandler_1 = require("../../../config/TemplateHandler");
const EmailUtil_1 = require("../../../utils/EmailUtil");
const UserGender_1 = require("../constants/UserGender");
const Performer_1 = require("../../../const/Performer");
const UpdatePasswordResponseDTO_1 = require("../dto/response/UpdatePasswordResponseDTO");
const UserLogin_1 = require("../model/UserLogin");
const LoginSQLRepository_1 = require("../repository/LoginSQLRepository");
const UserRoles_1 = require("../constants/UserRoles");
const environment = ApplicationPropertyConfig_1.default;
let UserBasicService = UserBasicService_1 = class UserBasicService {
    constructor(userRepository, messageSource, loginRepository) {
        this.userRepository = userRepository;
        this.messageSource = messageSource;
        this.loginRepository = loginRepository;
        this.logger = LoggerFactory_1.default.createLogger(UserBasicService_1.name);
        this.getCreatorAndModifierBySigner = (signer) => {
            let result = Performer_1.Performer.SYSTEM;
            switch (signer) {
                case OauthChannels_1.OauthChannels.GOOGLE: {
                    result = Performer_1.Performer.OAUTH_PROVIDER_GOOGLE;
                    break;
                }
                case OauthChannels_1.OauthChannels.FACEBOOK: {
                    result = Performer_1.Performer.OAUTH_PROVIDER_FACEBOOK;
                    break;
                }
                case OauthChannels_1.OauthChannels.APPLE:
                    {
                        result = Performer_1.Performer.OAUTH_PROVIDER_FACEBOOK;
                        break;
                    }
                    ;
            }
            return result;
        };
        this.validateSignerAndLogger = (signer) => {
            return [
                OauthChannels_1.OauthChannels.LOCAL_DOMAIN,
                OauthChannels_1.OauthChannels.GOOGLE,
                OauthChannels_1.OauthChannels.FACEBOOK,
                OauthChannels_1.OauthChannels.APPLE
            ].includes(signer);
        };
    }
    async createUserBasic(requestUrl, requestDTO) {
        let dbResult;
        let code;
        let message = "User signup - ";
        let status = UserStatus_1.UserStatus.UNVERIFIED;
        let createdBy = Performer_1.Performer.SYSTEM;
        let modifiedBy = Performer_1.Performer.SYSTEM;
        if (requestDTO.signupBy === null || requestDTO.signupBy === undefined) {
            requestDTO.signupBy = OauthChannels_1.OauthChannels.LOCAL_DOMAIN;
        }
        if (!this.validateSignerAndLogger(requestDTO.signupBy)) {
            code = ResponseCodes_1.default.INVALID_SIGNER;
            message = this.messageSource.getMessage(code);
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        dbResult = await this.userRepository.findUserByEmail(requestDTO.emailAddress);
        if (dbResult.status) {
            if (dbResult.entity !== null) {
                code = ResponseCodes_1.default.RECORD_ALREADY_EXIST;
                message += this.messageSource.getMessage(code).concat(" by email address!");
                this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
                return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message)
                    .httpStatus(common_1.HttpStatus.OK).build();
            }
        }
        else {
            code = ResponseCodes_1.default.SYSTEM_ERROR;
            message += this.messageSource.getMessage(code);
            this.logger.error(UserService_1.default.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code)
                .httpStatus(common_1.HttpStatus.INTERNAL_SERVER_ERROR).responseMessage(message).build();
        }
        dbResult = await this.userRepository.findUserByUsername(requestDTO.username);
        if (dbResult.status) {
            if (dbResult.entity !== null) {
                code = ResponseCodes_1.default.RECORD_ALREADY_EXIST;
                message += this.messageSource.getMessage(code).concat(" by username!");
                this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
                return ResponseDTO_1.default.builder().responseCode(code)
                    .httpStatus(common_1.HttpStatus.OK).responseMessage(message).build();
            }
        }
        else {
            code = ResponseCodes_1.default.SYSTEM_ERROR;
            message += this.messageSource.getMessage(code);
            this.logger.error(UserService_1.default.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code)
                .httpStatus(common_1.HttpStatus.INTERNAL_SERVER_ERROR).responseMessage(message).build();
        }
        const isValidSignupRole = UserService_1.default.isUserRoleValid(requestDTO.userRoles);
        if (!isValidSignupRole) {
            code = ResponseCodes_1.default.INVALID_USER_ROLE;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code)
                .httpStatus(common_1.HttpStatus.OK).responseMessage(message).build();
        }
        let deviceId = requestDTO.deviceId;
        if (requestDTO.channel === RequestChannels_1.RequestChannels.MOBILE) {
            if (deviceId === null || deviceId === undefined || deviceId.length === 0) {
                code = ResponseCodes_1.default.INVALID_DEVICE_ID;
                message = this.messageSource.getMessage(code);
                this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
                return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
            }
        }
        if (requestDTO.signupBy === OauthChannels_1.OauthChannels.LOCAL_DOMAIN) {
            if (requestDTO.password === null || requestDTO.password === undefined) {
                code = ResponseCodes_1.default.INVALID_PASSWORD;
                message = this.messageSource.getMessage(code);
                return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
            }
        }
        else {
            requestDTO.password = environment.getProperty("oauth2.internalPassword");
            status = UserStatus_1.UserStatus.ACTIVE;
            createdBy = this.getCreatorAndModifierBySigner(requestDTO.signupBy.toUpperCase());
            modifiedBy = this.getCreatorAndModifierBySigner(requestDTO.signupBy.toUpperCase());
        }
        const tokenObject = {
            username: requestDTO.username,
            emailAddress: requestDTO.emailAddress,
            channel: requestDTO.channel
        };
        const authToken = JwtTokenUtil_1.default.generateToken(tokenObject);
        deviceId = requestDTO.channel.toUpperCase() === RequestChannels_1.RequestChannels.MOBILE ? requestDTO.deviceId : null;
        const otpLength = Number(environment.getProperty("birds.otp.length"));
        const otp = OtpUtil_1.default.generateToken(otpLength);
        const authCreatedDate = new Date();
        const potentialUser = User_1.default.builder()
            .userId(BirdsHelper_1.default.generateUUID())
            .firstName(requestDTO.firstName)
            .middleName(requestDTO.middleName || GenericConstants_1.default.EMPTY_STRING)
            .lastName(requestDTO.lastName)
            .address(requestDTO.address || GenericConstants_1.default.EMPTY_STRING)
            .emailAddress(requestDTO.emailAddress)
            .mobileNumber(requestDTO.mobileNumber || GenericConstants_1.default.EMPTY_STRING)
            .status(status)
            .dateOfBirth(requestDTO.dateOfBirth || GenericConstants_1.default.EMPTY_STRING)
            .userRoles(requestDTO.userRoles || [UserRoles_1.UserRoles.CUSTOMER])
            .username(requestDTO.username)
            .password(PasswordUtil_1.default.hash(requestDTO.password))
            .photoLink(requestDTO.photo || environment.getProperty("birds.user.defaultProfilePic"))
            .createdBy(createdBy)
            .createdAt(new Date())
            .modifiedBy(modifiedBy)
            .updatedAt(new Date())
            .deviceId(deviceId)
            .geoLocation(requestDTO.geoLocation || GenericConstants_1.default.EMPTY_STRING)
            .loginAttempt(0)
            .gender(requestDTO.gender || UserGender_1.UserGender.UNKNOWN)
            .locale(requestDTO.language || GenericConstants_1.default.EMPTY_STRING)
            .city(requestDTO.city || GenericConstants_1.default.EMPTY_STRING)
            .country(requestDTO.country || GenericConstants_1.default.EMPTY_STRING)
            .channel(requestDTO.channel)
            .education([])
            .experience([])
            .socialMedia({})
            .authToken(authToken)
            .authTokenCreatedDate(authCreatedDate)
            .authTokenExpirationDate(JwtTokenUtil_1.default.getExpirationDateFromCreationDate(authCreatedDate))
            .otp(PasswordUtil_1.default.hash(otp))
            .otpCreatedDate(authCreatedDate)
            .otpExpDate(OtpUtil_1.default.getTokenExpirationTime())
            .oauth2Channel(requestDTO.signupBy || OauthChannels_1.OauthChannels.LOCAL_DOMAIN)
            .oauth2AccessToken(GenericConstants_1.default.EMPTY_STRING)
            .oauth2RefreshToken(GenericConstants_1.default.EMPTY_STRING)
            .oauth2Scope(GenericConstants_1.default.EMPTY_STRING)
            .oauth2TokenType(GenericConstants_1.default.EMPTY_STRING)
            .oauth2IdToken(GenericConstants_1.default.EMPTY_STRING)
            .oauth2UserId(GenericConstants_1.default.EMPTY_STRING)
            .rememberMeActive(undefined)
            .rememberMeCreatedDate(undefined)
            .rememberMeExpDate(undefined)
            .build();
        console.log("Afetr user build: " + potentialUser.userId);
        const data = {
            emailAddress: requestDTO.emailAddress,
            username: requestDTO.username,
            createdDate: new Date(),
            deviceId: deviceId
        };
        dbResult = await this.userRepository.createUserAndAuth(potentialUser);
        if (dbResult.status) {
            if (dbResult.entity !== null) {
                code = ResponseCodes_1.default.SUCCESS;
                message += this.messageSource.getMessage(code);
                this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
                if (requestDTO.signupBy === OauthChannels_1.OauthChannels.LOCAL_DOMAIN) {
                    const emailContent = TemplateHandler_1.default.getOtpStreamMessage(otp, {
                        firstName: potentialUser.firstName, lastName: potentialUser.lastName
                    });
                    const mail = {
                        to: potentialUser.emailAddress,
                        subject: environment.getProperty("mail.otp.subject"),
                        text: GenericConstants_1.default.EMPTY_STRING,
                        html: emailContent
                    };
                    EmailUtil_1.default.send(mail).then(info => {
                        this.logger.info(info.messageId);
                        console.log("Signup OTP: ".concat(otp));
                    });
                }
                const response = ResponseDTO_1.default.builder()
                    .responseCode(code)
                    .responseMessage(message)
                    .responseData(data)
                    .httpStatus(common_1.HttpStatus.OK)
                    .build();
                return Promise.resolve(response);
            }
        }
        else {
            code = ResponseCodes_1.default.SYSTEM_ERROR;
            message += this.messageSource.getMessage(code);
            this.logger.error(UserService_1.default.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code)
                .httpStatus(common_1.HttpStatus.INTERNAL_SERVER_ERROR).responseMessage(message).build();
        }
    }
    async loginUserBasic(requestUrl, requestDTO) {
        let code = ResponseCodes_1.default.RECORD_NOT_EXIST;
        let message = "User login - ";
        let responseDto;
        let loginBy = OauthChannels_1.OauthChannels.LOCAL_DOMAIN;
        if (requestDTO.loginBy === null || requestDTO.loginBy === undefined) {
            requestDTO.loginBy = loginBy;
        }
        let dbResult = await this.userRepository.findUserByEmail(requestDTO.email);
        if (dbResult.status) {
            if (dbResult.entity === null || dbResult.entity === undefined) {
                message += this.messageSource.getMessage(code);
                responseDto = ResponseDTO_1.default.builder().responseCode(code)
                    .httpStatus(common_1.HttpStatus.OK).responseMessage(message).build();
                this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
                return Promise.resolve(responseDto);
            }
        }
        else {
            code = ResponseCodes_1.default.SYSTEM_ERROR;
            message = this.messageSource.getMessage(code);
            this.logger.error(UserService_1.default.getLogMessage(requestUrl, message, dbResult.errorMessage));
            responseDto = ResponseDTO_1.default.builder().responseCode(code).responseMessage(dbResult.errorMessage).build();
            return responseDto;
        }
        if (requestDTO.channel === RequestChannels_1.RequestChannels.MOBILE) {
            if (requestDTO.deviceId === null || requestDTO.deviceId === undefined || requestDTO.deviceId.length === 0) {
                code = ResponseCodes_1.default.INVALID_DEVICE_ID;
                message = this.messageSource.getMessage(code);
                this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
                return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
            }
        }
        if (!this.validateSignerAndLogger(requestDTO.loginBy)) {
            code = ResponseCodes_1.default.INVALID_SIGNER;
            message = this.messageSource.getMessage(code);
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        let potentialUser = dbResult.entity;
        if (requestDTO.loginBy === OauthChannels_1.OauthChannels.LOCAL_DOMAIN) {
            const internalPassword = environment.getProperty("oauth2.internalPassword");
            const rememberMePassword = environment.getProperty("birds.rememberMe.autoInternalPassword");
            const incomingPassword = requestDTO.password;
            const storedHashPassword = potentialUser.password;
            const isUserPasswordMatch = PasswordUtil_1.default.match(incomingPassword, storedHashPassword);
            if (incomingPassword !== internalPassword && incomingPassword !== rememberMePassword) {
                if (!isUserPasswordMatch) {
                    code = ResponseCodes_1.default.INVALID_PASSWORD;
                    message += this.messageSource.getMessage(code);
                    responseDto = ResponseDTO_1.default.builder().responseCode(code)
                        .httpStatus(common_1.HttpStatus.OK).responseMessage(message).build();
                    this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
                    return Promise.resolve(responseDto);
                }
            }
        }
        if (potentialUser.status.toUpperCase() === UserStatus_1.UserStatus.LOCKED) {
            code = ResponseCodes_1.default.ACCOUNT_LOCKED;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code)
                .httpStatus(common_1.HttpStatus.OK).responseMessage(message).build();
        }
        if (potentialUser.status.toUpperCase() === UserStatus_1.UserStatus.UNVERIFIED) {
            code = ResponseCodes_1.default.ACCOUNT_NOT_VERIFIED;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code)
                .httpStatus(common_1.HttpStatus.OK).responseMessage(message).build();
        }
        const tokenObject = {
            username: potentialUser.username,
            emailAddress: potentialUser.emailAddress,
            channel: potentialUser.channel
        };
        const userAuth = UserService_1.default.generateNewUserAuth(tokenObject, potentialUser.userId, requestDTO, potentialUser);
        delete userAuth.userUsername;
        delete userAuth.userEmailAddress;
        const partial = JSON.parse(JSON.stringify(userAuth));
        const lastLoginDate = potentialUser.lastLoginDate === null ? new Date() : potentialUser.lastLoginDate;
        potentialUser.lastLoginDate = lastLoginDate;
        dbResult = await this.userRepository.updateUserAndAuthAfterLogin(potentialUser, partial);
        if (!dbResult.status) {
            code = ResponseCodes_1.default.SYSTEM_ERROR;
            message += this.messageSource.getMessage(code);
            responseDto = ResponseDTO_1.default.builder().responseCode(code)
                .httpStatus(common_1.HttpStatus.INTERNAL_SERVER_ERROR).responseMessage(message).build();
            this.logger.error(UserService_1.default.getLogMessage(requestUrl, dbResult.errorMessage));
            return responseDto;
        }
        await this.userRepository.updateUser(potentialUser, { lastLoginDate: potentialUser.authTokenCreatedDate });
        potentialUser = (await this.userRepository.findUserByEmail(potentialUser.emailAddress)).entity;
        if (potentialUser === null) {
            code = ResponseCodes_1.default.SYSTEM_ERROR;
            message += this.messageSource.getMessage(code);
            responseDto = ResponseDTO_1.default.builder().responseCode(code)
                .httpStatus(common_1.HttpStatus.INTERNAL_SERVER_ERROR).responseMessage(message).build();
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return Promise.resolve(responseDto);
        }
        const login = UserLogin_1.default.builder()
            .userId(potentialUser.userId)
            .userEmail(potentialUser.emailAddress)
            .username(potentialUser.username)
            .createdDate(new Date())
            .channel(requestDTO.channel)
            .loginAuthToken(potentialUser.authToken)
            .loginAuthTokenCreatedDate(potentialUser.authTokenCreatedDate)
            .loginAuthTokenExpDate(potentialUser.authTokenExpirationDate)
            .userDeviceId(requestDTO.deviceId)
            .build();
        dbResult = await this.loginRepository.createLogin(login);
        const responseData = {
            userId: potentialUser.userId,
            username: potentialUser.username,
            email: potentialUser.emailAddress,
            firstName: potentialUser.firstName,
            lastName: potentialUser.lastName,
            middleName: potentialUser.middleName,
            fullName: [potentialUser.firstName, potentialUser.middleName, potentialUser.lastName].join(' '),
            address: potentialUser.address,
            mobileNumber: potentialUser.mobileNumber,
            status: potentialUser.status,
            dateOfBirth: BirdsHelper_1.default.formatDate(potentialUser.dateOfBirth),
            lastLoginDate: BirdsHelper_1.default.formatDate(lastLoginDate),
            photoLink: potentialUser.photoLink,
            createdDate: BirdsHelper_1.default.formatDate(potentialUser.createdAt),
            modifiedDate: BirdsHelper_1.default.formatDate(potentialUser.updatedAt),
            deviceId: potentialUser.deviceId,
            geoLocation: potentialUser.geoLocation,
            gender: potentialUser.gender,
            language: potentialUser.locale,
            city: potentialUser.city,
            country: potentialUser.country,
            authToken: potentialUser.authToken,
            rememberMeActive: potentialUser.rememberMeActive
        };
        code = ResponseCodes_1.default.SUCCESS;
        message += this.messageSource.getMessage(code);
        this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
        responseDto = ResponseDTO_1.default.builder()
            .responseCode(code)
            .responseMessage(message)
            .httpStatus(common_1.HttpStatus.OK)
            .responseData(responseData).build();
        return Promise.resolve(responseDto);
    }
    async loginUserAutomatic(requestUrl, requestDTO) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        if (requestDTO.channel !== RequestChannels_1.RequestChannels.MOBILE) {
            code = ResponseCodes_1.default.INVALID_CHANNEL;
            message = this.messageSource.getMessage(code);
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const latestLogin = await this.loginRepository.findOne({
            where: { userDeviceId: requestDTO.deviceId },
            order: { createdDate: 'DESC' },
        });
        if (latestLogin === null || latestLogin === undefined) {
            code = ResponseCodes_1.default.NO_INITIAL_LOGIN_RECORD;
            message = this.messageSource.getMessage(code);
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const userEmail = latestLogin.userEmail;
        const potentialUser = (await this.userRepository.findUserByEmail(userEmail)).entity;
        if (potentialUser === null) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        if (!potentialUser.rememberMeActive) {
            code = ResponseCodes_1.default.REMEMBER_ME_EXPIRED;
            message = this.messageSource.getMessage(code);
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const rememberMePassword = environment.getProperty("birds.rememberMe.autoInternalPassword");
        const loginRequest = new LoginUserRequestDTO_1.default(userEmail, potentialUser.password);
        loginRequest.channel = requestDTO.channel;
        loginRequest.deviceId = requestDTO.deviceId;
        loginRequest.password = rememberMePassword;
        return this.loginUserBasic(requestUrl, loginRequest);
    }
    async validateOtp(requestUrl, requestDTO) {
        let dbResult;
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        dbResult = await this.userRepository.findUserByEmail(requestDTO.userEmail);
        if (!dbResult.status) {
            this.logger.error(UserService_1.default.getLogMessage(requestUrl, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code)
                .httpStatus(common_1.HttpStatus.INTERNAL_SERVER_ERROR).responseMessage(message).build();
        }
        const user = dbResult.entity;
        if (user === null) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code)
                .httpStatus(common_1.HttpStatus.OK).responseMessage(message).build();
        }
        if (user.isOtpVerified) {
            code = ResponseCodes_1.default.OTP_ALREADY_VERIFIED;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code)
                .httpStatus(common_1.HttpStatus.OK).responseMessage(message).build();
        }
        const isOtpSame = PasswordUtil_1.default.match(requestDTO.otp, user.otp);
        if (!isOtpSame) {
            code = ResponseCodes_1.default.INVALID_OTP;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code)
                .httpStatus(common_1.HttpStatus.OK).responseMessage(message).build();
        }
        const expTimeString = environment.getProperty("birds.otp.expiresIn");
        const expirationTimeInMilsec = BirdsHelper_1.default.getMillSecFromTimeString(expTimeString);
        const isOtpExpired = new Date().getTime() - user.otpExpDate.getTime() >= expirationTimeInMilsec;
        if (isOtpExpired) {
            code = ResponseCodes_1.default.EXPIRED_OTP;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code)
                .httpStatus(common_1.HttpStatus.OK).responseMessage(message).build();
        }
        dbResult = await this.userRepository.updateUserAndAuth({
            status: UserStatus_1.UserStatus.ACTIVE, emailVerifiedAt: new Date()
        }, { isOtpVerified: true }, user);
        if (!dbResult.status) {
            code = ResponseCodes_1.default.SYSTEM_ERROR;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code)
                .httpStatus(common_1.HttpStatus.INTERNAL_SERVER_ERROR).responseMessage(message).build();
        }
        const responseData = new ValidateOtpData_1.default();
        responseData.userEmail = user.emailAddress;
        responseData.otpValidatedDate = new Date();
        responseData.userStatus = UserStatus_1.UserStatus.ACTIVE;
        code = ResponseCodes_1.default.SUCCESS;
        message = this.messageSource.getMessage(code);
        const response = ResponseDTO_1.default.builder()
            .responseCode(code)
            .responseMessage(message)
            .httpStatus(common_1.HttpStatus.OK)
            .responseData(responseData).build();
        this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
        return Promise.resolve(response);
    }
    async sendVerificationOtp(requestUrl, emailAddress) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let dbResult;
        if (emailAddress === null || emailAddress === undefined || emailAddress.length === 0) {
            code = ResponseCodes_1.default.BAD_REQUEST;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message, "No emailAddress provided"));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message.concat(": No emailAddress provided")).build();
        }
        dbResult = await this.userRepository.findUserByEmail(emailAddress);
        if (!dbResult.status) {
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const potentialUser = dbResult.entity;
        if (potentialUser === null) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        if (potentialUser.isOtpVerified || potentialUser.status.toUpperCase() !== UserStatus_1.UserStatus.UNVERIFIED) {
            code = ResponseCodes_1.default.OTP_ALREADY_VERIFIED;
            message = this.messageSource.getMessage(code);
            this.messageSource.getMessage(UserService_1.default.getLogMessage(requestUrl, message));
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const anotherOtpWaitTimeInSec = Number(environment.getProperty("birds.otp.anotherOtpWaitInSec")) * 1000;
        if ((potentialUser.otpCreatedDate.getTime() - new Date().getTime()) < anotherOtpWaitTimeInSec) {
            code = ResponseCodes_1.default.OTP_STILL_ACTIVE;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const otpLength = Number(environment.getProperty("birds.otp.length"));
        const otp = OtpUtil_1.default.generateToken(otpLength);
        const partial = { otp: PasswordUtil_1.default.hash(otp), otpCreatedDate: new Date(), otpExpDate: OtpUtil_1.default.getTokenExpirationTime() };
        dbResult = await this.userRepository.updateUser(potentialUser, partial);
        if (!dbResult.status) {
            this.logger.error(UserService_1.default.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const emailContent = TemplateHandler_1.default.getOtpStreamMessage(otp, {
            firstName: potentialUser.firstName, lastName: potentialUser.lastName
        });
        const mail = {
            to: potentialUser.emailAddress,
            subject: environment.getProperty("mail.otp.subject"),
            text: GenericConstants_1.default.EMPTY_STRING,
            html: emailContent
        };
        const info = await EmailUtil_1.default.send(mail);
        if (info && info.messageId) {
            code = ResponseCodes_1.default.SUCCESS;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
    }
    async sendResetPasswordMailForMobile(requestUrl, emailAddress) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let dbResult;
        if (emailAddress === null || emailAddress === undefined || emailAddress.length === 0) {
            code = ResponseCodes_1.default.BAD_REQUEST;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message, "No emailAddress provided"));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message.concat(": No emailAddress provided")).build();
        }
        dbResult = await this.userRepository.findUserByEmail(emailAddress);
        if (!dbResult.status) {
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const potentialUser = dbResult.entity;
        if (potentialUser === null) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const otpLength = Number(environment.getProperty("birds.otp.length"));
        const otp = OtpUtil_1.default.generateToken(otpLength);
        const partial = { otp: PasswordUtil_1.default.hash(otp), otpCreatedDate: new Date(), otpExpDate: OtpUtil_1.default.getTokenExpirationTime() };
        dbResult = await this.userRepository.updateUser(potentialUser, partial);
        if (!dbResult.status) {
            this.logger.error(UserService_1.default.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const emailContent = TemplateHandler_1.default.getForgetPasswordOtpStreamMessage(otp, {
            firstName: potentialUser.firstName, lastName: potentialUser.lastName
        });
        const mail = {
            to: potentialUser.emailAddress,
            subject: environment.getProperty("mail.otp.passwordResetSubject"),
            text: GenericConstants_1.default.EMPTY_STRING,
            html: emailContent
        };
        const info = await EmailUtil_1.default.send(mail);
        if (info && info.messageId) {
            code = ResponseCodes_1.default.SUCCESS;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message, info.messageId));
            console.log("OTP: ".concat(otp));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
    }
    async validateOtpForPasswordReset(requestUrl, requestDTO) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let dbResult;
        dbResult = await this.userRepository.findUserByEmail(requestDTO.userEmail);
        if (!dbResult.status) {
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const potentialUser = dbResult.entity;
        if (potentialUser === null) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        if (potentialUser.otpExpDate.getTime() < new Date().getTime()) {
            code = ResponseCodes_1.default.EXPIRED_OTP;
            message = this.messageSource.getMessage(code);
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        if (!PasswordUtil_1.default.match(requestDTO.otp, potentialUser.otp)) {
            code = ResponseCodes_1.default.INVALID_OTP;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        code = ResponseCodes_1.default.SUCCESS;
        message = this.messageSource.getMessage(code);
        return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
    }
    async sendResetPasswordMail(requestUrl, emailAddress) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let dbResult;
        if (emailAddress === null || emailAddress === undefined || emailAddress.length === 0) {
            code = ResponseCodes_1.default.BAD_REQUEST;
            message = this.messageSource.getMessage(code).concat(": No email address specified! ");
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        dbResult = await this.userRepository.findUserByEmail(emailAddress);
        if (!dbResult.status) {
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const potentialUser = dbResult.entity;
        if (!potentialUser) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const encodedEmail = Buffer.from(emailAddress).toString('base64');
        const linkExpirationInHrs = environment.getProperty("user.password.reset.expiresIn");
        let mailHtmlContent = TemplateHandler_1.default.getTemplate("EPWC");
        mailHtmlContent = mailHtmlContent
            .replaceAll("{firstName}", potentialUser.firstName)
            .replaceAll("{lastName}", potentialUser.lastName)
            .replaceAll("{encodedEmail}", encodedEmail)
            .replaceAll("{expiresIn}", linkExpirationInHrs);
        const mail = {
            to: emailAddress,
            text: '',
            html: mailHtmlContent,
            subject: "Password Reset request"
        };
        const emailInfo = await EmailUtil_1.default.send(mail);
        if (emailInfo) {
            code = ResponseCodes_1.default.SUCCESS;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
    }
    async getPasswordResetStreamPage(requestUrl, encodedEmail) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let dbResult;
        let errorPageStream = TemplateHandler_1.default.getTemplate("EEPWC");
        let generalFrontMessage = "Please contact administrator of theis page";
        errorPageStream = errorPageStream.replace("{message}", generalFrontMessage);
        if (encodedEmail === null || encodedEmail === undefined || encodedEmail.length === 0) {
            code = ResponseCodes_1.default.BAD_REQUEST;
            message = this.messageSource.getMessage(code).concat(": No email address specified! ");
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return errorPageStream;
        }
        const emailAddress = Buffer.from(encodedEmail, 'base64').toString('utf8');
        dbResult = await this.userRepository.findUserByEmail(emailAddress);
        if (!dbResult.status) {
            return errorPageStream;
        }
        const potentialUser = dbResult.entity;
        if (!potentialUser) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return errorPageStream;
        }
        let htmlContent = TemplateHandler_1.default.getTemplate("EPWCPage");
        const baseUrl = environment.getProperty("birds.baseUrl");
        htmlContent = htmlContent.replaceAll("{base-url}", baseUrl);
        return htmlContent;
    }
    async updateUserPassword(requestUrl, requestDTO) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let dbResult;
        dbResult = await this.userRepository.findUserByEmail(requestDTO.emailAddress);
        if (!dbResult.status) {
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const potentialUser = dbResult.entity;
        if (potentialUser === null) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        if (PasswordUtil_1.default.match(requestDTO.newPassword, potentialUser.password)) {
            code = ResponseCodes_1.default.BAD_REQUEST;
            message = this.messageSource.getMessage(code).concat(": Old password cannot be same as new password!");
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const newHashedPassword = PasswordUtil_1.default.hash(requestDTO.newPassword.trim());
        dbResult = await this.userRepository.updateUser(potentialUser, { password: newHashedPassword });
        if (!dbResult.status) {
            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        code = ResponseCodes_1.default.SUCCESS;
        message = this.messageSource.getMessage(code);
        const data = new UpdatePasswordResponseDTO_1.UpdatePasswordResponseData();
        data.newPassword = requestDTO.newPassword;
        data.dateUpdated = new Date();
        const responseDTO = new ResponseDTO_1.default();
        responseDTO.responseCode = code;
        responseDTO.responseMessage = message;
        responseDTO.responseData = data;
        return responseDTO;
    }
};
UserBasicService = UserBasicService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserSQLRepository_1.default,
        MessageSource_1.default,
        LoginSQLRepository_1.default])
], UserBasicService);
exports.default = UserBasicService;
//# sourceMappingURL=UserBasicService.js.map