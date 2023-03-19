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
var UserOauthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerFactory_1 = require("../../../config/LoggerFactory");
const UserSQLRepository_1 = require("../repository/UserSQLRepository");
const MessageSource_1 = require("../../../config/MessageSource");
const common_1 = require("@nestjs/common");
const ApplicationPropertyConfig_1 = require("../../../config/ApplicationPropertyConfig");
const OauthChannels_1 = require("../../../const/OauthChannels");
const ResponseDTO_1 = require("../../../config/ResponseDTO");
const ResponseCodes_1 = require("../../../const/ResponseCodes");
const BirdsHelper_1 = require("../../../utils/BirdsHelper");
const WebRequest_1 = require("../../../web/WebRequest");
const WebRequestMethod_1 = require("../../../web/WebRequestMethod");
const WebClient_1 = require("../../../web/WebClient");
const User_1 = require("../model/User");
const UserStatus_1 = require("../constants/UserStatus");
const UserRoles_1 = require("../constants/UserRoles");
const GenericConstants_1 = require("../../../const/GenericConstants");
const RequestChannels_1 = require("../../../const/RequestChannels");
const UserGender_1 = require("../constants/UserGender");
const UserAuth_1 = require("../model/UserAuth");
const JwtTokenUtil_1 = require("../../../security/JwtTokenUtil");
const PasswordUtil_1 = require("../../../security/PasswordUtil");
const OtpUtil_1 = require("../../../security/OtpUtil");
const UserService_1 = require("./UserService");
const OauthValidationTypes_1 = require("../../../const/OauthValidationTypes");
const LoginUserRequestDTO_1 = require("../dto/request/LoginUserRequestDTO");
const UserBasicService_1 = require("./UserBasicService");
const FormData = require("form-data");
const Performer_1 = require("../../../const/Performer");
const environment = ApplicationPropertyConfig_1.default;
let UserOauthService = UserOauthService_1 = class UserOauthService {
    constructor(userRepository, messageSource, userBasicService) {
        this.userRepository = userRepository;
        this.messageSource = messageSource;
        this.userBasicService = userBasicService;
        this.logger = LoggerFactory_1.default.createLogger(UserOauthService_1.name);
    }
    async getOauth2UserConsentUrl(requestUrl, requestDTO) {
        const provider = requestDTO.authServiceProvider.toUpperCase();
        let responseDTO;
        let code = ResponseCodes_1.default.OAUTH_PROVIDER_FAILED;
        let message = this.messageSource.getMessage(code);
        switch (provider) {
            case OauthChannels_1.OauthChannels.GOOGLE: {
                responseDTO = await this.getGoogleOauth2UserConsentUrl(requestDTO);
                break;
            }
            case OauthChannels_1.OauthChannels.FACEBOOK: {
                responseDTO = await this.getFacebookOauth2UserConsentUrl(requestDTO);
                break;
            }
            case OauthChannels_1.OauthChannels.APPLE: {
                responseDTO = await this.getAppleOauth2UserConsentUrl(requestDTO);
                break;
            }
            default: {
                responseDTO = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
            }
        }
        return Promise.resolve(responseDTO);
    }
    async getGoogleOauth2UserConsentUrl(requestDTO) {
        const authUrlForAuthCode = environment.getProperty("oauth2.google.authUrl");
        const clientId = environment.getProperty("oauth2.google.clientId");
        const redirectUrl = environment.getProperty("oauth2.google.redirectUrl");
        const scope = environment.getProperty("oauth2.google.defaultScopes");
        const responseType = environment.getProperty("oauth2.google.responseType");
        const accessType = environment.getProperty("oauth2.google.accessType");
        const approvalPrompt = environment.getProperty("oauth2.google.approvalPrompt");
        const stateObject = { provider: requestDTO.authServiceProvider, channel: requestDTO.channel, deviceId: requestDTO.deviceId };
        const stateString = JSON.stringify(stateObject);
        const queryObject = {
            client_id: clientId,
            redirect_uri: redirectUrl,
            scope: scope,
            response_type: responseType,
            state: Buffer.from(stateString).toString('base64'),
            access_type: accessType,
            approval_prompt: approvalPrompt
        };
        const completeAuthUrl = BirdsHelper_1.default.getQueryUrl(authUrlForAuthCode, queryObject);
        const responseData = { authorizationConsentUrl: completeAuthUrl };
        let code = ResponseCodes_1.default.SUCCESS;
        let message = this.messageSource.getMessage(code);
        let responseDTO = ResponseDTO_1.default.builder().responseCode(code)
            .responseMessage(message).responseData(responseData).build();
        return Promise.resolve(responseDTO);
    }
    async getFacebookOauth2UserConsentUrl(requestDTO) {
        const authUrlForAuthCode = environment.getProperty("oauth2.facebook.authUrl");
        const clientId = environment.getProperty("oauth2.facebook.clientId");
        const redirectUrl = environment.getProperty("oauth2.facebook.redirectUrl");
        const stateObject = { provider: requestDTO.authServiceProvider, channel: requestDTO.channel, deviceId: requestDTO.deviceId };
        const stateString = JSON.stringify(stateObject);
        const scope = environment.getProperty("oauth2.facebook.defaultScopes");
        const queryObject = {
            client_id: clientId,
            redirect_uri: redirectUrl,
            scope: scope,
            state: Buffer.from(stateString).toString('base64'),
        };
        const completeAuthUrl = BirdsHelper_1.default.getQueryUrl(authUrlForAuthCode, queryObject);
        const responseData = { authorizationConsentUrl: completeAuthUrl };
        let code = ResponseCodes_1.default.SUCCESS;
        let message = this.messageSource.getMessage(code);
        let responseDTO = ResponseDTO_1.default.builder().responseCode(code)
            .responseMessage(message).responseData(responseData).build();
        return Promise.resolve(responseDTO);
    }
    async getAppleOauth2UserConsentUrl(requestDTO) {
        return Promise.resolve(undefined);
    }
    async validateOauth2User(requestUrl, requestDTO) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let responseDTO = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        const stateJson = Buffer.from(requestDTO.state, 'base64').toString('ascii');
        const stateObject = JSON.parse(stateJson);
        requestDTO.channel = stateObject['channel'];
        requestDTO.deviceId = stateObject['deviceId'];
        requestDTO.authServiceProvider = stateObject['provider'].toUpperCase();
        const provider = requestDTO.authServiceProvider;
        switch (provider) {
            case OauthChannels_1.OauthChannels.GOOGLE: {
                responseDTO = await this.validateGoogleUser(requestUrl, requestDTO);
                break;
            }
            case OauthChannels_1.OauthChannels.FACEBOOK: {
                responseDTO = await this.validateFacebookUser(requestUrl, requestDTO);
                break;
            }
        }
        return Promise.resolve(responseDTO);
    }
    async validateGoogleUser(requestUrl, requestDTO) {
        let code = ResponseCodes_1.default.OAUTH_PROVIDER_FAILED;
        let message = this.messageSource.getMessage(code);
        let responseDTO = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        let deviceId = requestDTO.deviceId;
        let dbResult;
        if (requestDTO.channel === RequestChannels_1.RequestChannels.MOBILE) {
            if (requestDTO.deviceId === null || requestDTO.deviceId === undefined || requestDTO.deviceId.length === 0) {
                code = ResponseCodes_1.default.INVALID_DEVICE_ID;
                message = this.messageSource.getMessage(code);
                responseDTO = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
                return responseDTO;
            }
        }
        const incomingState = Buffer.from(requestDTO.authServiceProvider, 'base64').toString('ascii');
        if (!incomingState) {
            code = ResponseCodes_1.default.CSRF_ATTACK;
            message = this.messageSource.getMessage(code);
            responseDTO = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
            return responseDTO;
        }
        if (requestDTO.consentCode === null || requestDTO.consentCode === undefined) {
            code = ResponseCodes_1.default.USER_CONSENT_FAILED;
            message = this.messageSource.getMessage(code);
            responseDTO = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
            return responseDTO;
        }
        const tokenUrl = environment.getProperty("oauth2.google.tokenUrl");
        const clientId = environment.getProperty("oauth2.google.clientId");
        const clientSecret = environment.getProperty("oauth2.google.clientSecret");
        const redirectUrl = environment.getProperty("oauth2.google.redirectUrl");
        const grantType = environment.getProperty("oauth2.google.grantType");
        const formData = new FormData();
        formData.append("code", requestDTO.consentCode);
        formData.append("client_id", clientId);
        formData.append("client_secret", clientSecret);
        formData.append("redirect_uri", redirectUrl);
        formData.append("grant_type", grantType);
        const webRequest = WebRequest_1.default.builder()
            .url(tokenUrl)
            .method(WebRequestMethod_1.WebRequestMethod.POST)
            .body(formData)
            .headers({ "Content-Type": "application/x-www-form-urlencoded" })
            .build();
        let webResponse;
        try {
            webResponse = await WebClient_1.default.webRequest(webRequest).connect();
        }
        catch (error) {
            code = ResponseCodes_1.default.OAUTH_PROVIDER_FAILED;
            message = this.messageSource.getMessage(code);
            this.logger.error(UserService_1.default.getLogMessage(requestUrl, message, error));
            responseDTO = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
            return responseDTO;
        }
        if (webResponse.status === common_1.HttpStatus.OK) {
            const userProfileBaseUrl = environment.getProperty("oauth2.google.userProfileUrl");
            const queryParams = { alt: "json", access_token: webResponse.data['access_token'] };
            const completeUrl = BirdsHelper_1.default.getQueryUrl(userProfileBaseUrl, queryParams);
            const userProfileRequest = WebRequest_1.default.builder()
                .url(completeUrl)
                .method(WebRequestMethod_1.WebRequestMethod.GET)
                .headers({ "Content-Type": "application/json" })
                .build();
            const userProfileResponse = await WebClient_1.default.webRequest(userProfileRequest).connect();
            if (userProfileResponse.status === common_1.HttpStatus.OK) {
                const userProfile = userProfileResponse.data;
                console.log(webResponse.data);
                const oauthValidationType = requestDTO.oauthValidationType;
                const internalPassword = environment.getProperty("oauth2.internalPassword");
                if (oauthValidationType === OauthValidationTypes_1.OauthValidationTypes.SIGNUP) {
                    dbResult = await this.userRepository.findUserByEmail(userProfile.email);
                    if (!dbResult.status) {
                        console.log("E be like here ooo");
                        code = ResponseCodes_1.default.SYSTEM_ERROR;
                        message = this.messageSource.getMessage(code);
                        this.logger.error(UserService_1.default.getLogMessage(requestUrl, message, dbResult.errorMessage));
                        responseDTO = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
                        return responseDTO;
                    }
                    if (dbResult.entity !== null) {
                        code = ResponseCodes_1.default.RECORD_ALREADY_EXIST;
                        message = this.messageSource.getMessage(code);
                        this.logger.info(UserService_1.default.getLogMessage(message));
                        responseDTO = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
                        return responseDTO;
                    }
                    const potentialUser = User_1.default.builder()
                        .userId(BirdsHelper_1.default.generateUUID())
                        .firstName(userProfile.given_name)
                        .middleName(GenericConstants_1.default.EMPTY_STRING)
                        .lastName(userProfile.family_name)
                        .address(GenericConstants_1.default.EMPTY_STRING)
                        .emailAddress(userProfile.email)
                        .mobileNumber(GenericConstants_1.default.EMPTY_STRING)
                        .status(UserStatus_1.UserStatus.ACTIVE)
                        .dateOfBirth(GenericConstants_1.default.EMPTY_STRING)
                        .userRoles([UserRoles_1.UserRoles.STUDENT, UserRoles_1.UserRoles.CUSTOMER])
                        .username(userProfile.email)
                        .password(GenericConstants_1.default.EMPTY_STRING)
                        .photoLink(userProfile.picture)
                        .createdBy(Performer_1.Performer.OAUTH_PROVIDER_GOOGLE)
                        .createdAt(new Date())
                        .modifiedBy(Performer_1.Performer.OAUTH_PROVIDER_GOOGLE)
                        .updatedAt(new Date())
                        .deviceId(deviceId)
                        .education([])
                        .experience([])
                        .socialMedia({})
                        .geoLocation(GenericConstants_1.default.EMPTY_STRING)
                        .loginAttempt(0)
                        .gender(UserGender_1.UserGender.MALE)
                        .locale(userProfile.locale.toUpperCase())
                        .city(GenericConstants_1.default.EMPTY_STRING)
                        .country(GenericConstants_1.default.EMPTY_STRING)
                        .channel(requestDTO.channel)
                        .build();
                    const tokenObject = {
                        username: userProfile.email,
                        emailAddress: userProfile.email,
                        channel: requestDTO.channel
                    };
                    const authToken = JwtTokenUtil_1.default.generateToken(tokenObject);
                    const authCreatedDate = new Date();
                    const otpLength = Number(environment.getProperty("birds.otp.length"));
                    const otp = OtpUtil_1.default.generateToken(otpLength);
                    const userAuth = UserAuth_1.default.builder()
                        .userId(potentialUser.userId)
                        .authToken(authToken)
                        .userEmailAddress(potentialUser.emailAddress)
                        .userUsername(userProfile.email)
                        .authTokenCreatedDate(authCreatedDate)
                        .authTokenExpirationDate(JwtTokenUtil_1.default.getExpirationDateFromCreationDate(authCreatedDate))
                        .otp(PasswordUtil_1.default.hash(otp))
                        .otpExpDate(OtpUtil_1.default.getTokenExpirationTime())
                        .oauth2Channel(OauthChannels_1.OauthChannels.GOOGLE)
                        .oauth2AccessToken(webResponse.data['access_token'])
                        .oauth2RefreshToken(webResponse.data['refresh_token'])
                        .oauth2Scope(webResponse.data['scope'])
                        .oauth2TokenType(webResponse.data['token_type'])
                        .oauth2IdToken(webResponse.data['id_token'])
                        .oauth2UserId(userProfile.id)
                        .build();
                    userAuth.isOtpVerified = true;
                    dbResult = await this.userRepository.createUserAndAuth(potentialUser);
                    if (!dbResult.status) {
                        code = ResponseCodes_1.default.SYSTEM_ERROR;
                        message = this.messageSource.getMessage(code);
                        this.logger.error(UserService_1.default.getLogMessage(requestUrl, message, dbResult.errorMessage));
                        responseDTO = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
                        return responseDTO;
                    }
                    const loginUserRequest = new LoginUserRequestDTO_1.default(potentialUser.emailAddress, internalPassword);
                    loginUserRequest.channel = requestDTO.channel;
                    loginUserRequest.deviceId = requestDTO.deviceId;
                    loginUserRequest.loginBy = OauthChannels_1.OauthChannels.LOCAL_DOMAIN;
                    return await this.userBasicService.loginUserBasic(requestUrl, loginUserRequest);
                }
                if (oauthValidationType === OauthValidationTypes_1.OauthValidationTypes.LOGIN) {
                    const user = (await this.userRepository.findUserByEmail(userProfile.email)).entity;
                    if (user !== null) {
                        dbResult = await this.userRepository.updateUserAndAuth({
                            updatedAt: new Date(), locale: userProfile.locale, modifiedBy: Performer_1.Performer.OAUTH_PROVIDER_GOOGLE,
                            photoLink: userProfile.picture, emailVerifiedAt: new Date(), firstName: userProfile.name,
                            lastName: userProfile.family_name
                        }, {
                            oauth2UserId: userProfile.id, oauth2AccessToken: webResponse.data['access_token'],
                            oauth2RefreshToken: webResponse.data['refresh_token'], oauth2Scope: webResponse.data['scope'],
                            oauth2TokenType: webResponse.data['token_type'], oauth2IdToken: webResponse.data['id_token']
                        }, user);
                        if (!dbResult.status) {
                            code = ResponseCodes_1.default.SYSTEM_ERROR,
                                message = this.messageSource.getMessage(code);
                            responseDTO = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
                            return responseDTO;
                        }
                        const loginRequestDTO = new LoginUserRequestDTO_1.default(userProfile.email, internalPassword);
                        loginRequestDTO.channel = requestDTO.channel;
                        loginRequestDTO.deviceId = requestDTO.deviceId;
                        return await this.userBasicService.loginUserBasic(requestUrl, loginRequestDTO);
                    }
                    else {
                        code = ResponseCodes_1.default.RECORD_NOT_EXIST;
                        message = this.messageSource.getMessage(code);
                        this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
                        return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
                    }
                }
            }
            return responseDTO;
        }
        return responseDTO;
    }
    async validateFacebookUser(requestUrl, requestDTO) {
        let code = ResponseCodes_1.default.OAUTH_PROVIDER_FAILED;
        let message = this.messageSource.getMessage(code);
        let responseDTO = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        let deviceId = GenericConstants_1.default.EMPTY_STRING;
        let dbResult;
        if (requestDTO.channel === RequestChannels_1.RequestChannels.MOBILE) {
            if (requestDTO.deviceId === null || requestDTO.deviceId === undefined || requestDTO.deviceId.length === 0) {
                code = ResponseCodes_1.default.INVALID_DEVICE_ID;
                message = this.messageSource.getMessage(code);
                responseDTO = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
                return responseDTO;
            }
            deviceId = requestDTO.deviceId;
        }
        const incomingState = Buffer.from(requestDTO.authServiceProvider, 'base64').toString('ascii');
        if (!incomingState) {
            code = ResponseCodes_1.default.CSRF_ATTACK;
            message = this.messageSource.getMessage(code);
            responseDTO = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
            return responseDTO;
        }
        if (requestDTO.consentCode === null || requestDTO.consentCode === undefined) {
            code = ResponseCodes_1.default.USER_CONSENT_FAILED;
            message = this.messageSource.getMessage(code);
            responseDTO = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
            return responseDTO;
        }
        const tokenUrl = environment.getProperty("oauth2.facebook.tokenUrl");
        const clientId = environment.getProperty("oauth2.facebook.clientId");
        const clientSecret = environment.getProperty("oauth2.facebook.clientSecret");
        const redirectUrl = environment.getProperty("oauth2.facebook.redirectUrl");
        const grantType = environment.getProperty("oauth2.facebook.grantType");
        const queryObject = {
            code: requestDTO.consentCode,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUrl,
            grant_type: grantType
        };
        const completeAccessUrl = BirdsHelper_1.default.getQueryUrl(tokenUrl, queryObject);
        const webRequest = WebRequest_1.default.builder()
            .url(completeAccessUrl)
            .method(WebRequestMethod_1.WebRequestMethod.GET)
            .headers({ "Content-Type": "application/json" })
            .build();
        let webResponse;
        try {
            webResponse = await WebClient_1.default.webRequest(webRequest).connect();
        }
        catch (error) {
            code = ResponseCodes_1.default.OAUTH_PROVIDER_FAILED;
            message = this.messageSource.getMessage(code);
            this.logger.error(UserService_1.default.getLogMessage(requestUrl, message, error));
            responseDTO = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
            return responseDTO;
        }
        if (webResponse.status === common_1.HttpStatus.OK) {
            const accessToken = webResponse.data['access_token'];
            const facebookBasicInfo = await this.getFacebookBasicUserInfo(accessToken);
            let facebookPublicInfo = undefined;
            if (facebookBasicInfo !== undefined)
                facebookPublicInfo = await this.getFacebookUserPublicInfo(facebookBasicInfo, accessToken);
            if (facebookPublicInfo !== undefined && Object.keys(facebookPublicInfo).length > 0) {
                const userProfile = facebookPublicInfo;
                const oauthValidationType = requestDTO.oauthValidationType;
                const internalPassword = environment.getProperty("oauth2.internalPassword");
                if (oauthValidationType === OauthValidationTypes_1.OauthValidationTypes.SIGNUP) {
                    dbResult = await this.userRepository.findUserByEmail(userProfile.email);
                    if (!dbResult.status) {
                        code = ResponseCodes_1.default.SYSTEM_ERROR;
                        message = this.messageSource.getMessage(code);
                        this.logger.error(UserService_1.default.getLogMessage(requestUrl, message, dbResult.errorMessage));
                        responseDTO = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
                        return responseDTO;
                    }
                    if (dbResult.entity !== null) {
                        code = ResponseCodes_1.default.RECORD_ALREADY_EXIST;
                        message = this.messageSource.getMessage(code);
                        this.logger.info(UserService_1.default.getLogMessage(message));
                        responseDTO = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
                        return responseDTO;
                    }
                    const potentialUser = User_1.default.builder()
                        .userId(BirdsHelper_1.default.generateUUID())
                        .firstName(userProfile.first_name)
                        .middleName(GenericConstants_1.default.EMPTY_STRING)
                        .lastName(userProfile.last_name)
                        .address(GenericConstants_1.default.EMPTY_STRING)
                        .emailAddress(userProfile.email)
                        .mobileNumber(GenericConstants_1.default.EMPTY_STRING)
                        .status(UserStatus_1.UserStatus.ACTIVE)
                        .dateOfBirth(GenericConstants_1.default.EMPTY_STRING)
                        .userRoles([UserRoles_1.UserRoles.STUDENT, UserRoles_1.UserRoles.CUSTOMER])
                        .username(userProfile.email)
                        .password(GenericConstants_1.default.EMPTY_STRING)
                        .photoLink(GenericConstants_1.default.EMPTY_STRING)
                        .createdBy(Performer_1.Performer.OAUTH_PROVIDER_FACEBOOK)
                        .createdAt(new Date())
                        .modifiedBy(Performer_1.Performer.OAUTH_PROVIDER_FACEBOOK)
                        .updatedAt(new Date())
                        .deviceId(deviceId)
                        .education([])
                        .experience([])
                        .socialMedia({})
                        .geoLocation(GenericConstants_1.default.EMPTY_STRING)
                        .loginAttempt(0)
                        .gender(UserGender_1.UserGender.MALE)
                        .locale(GenericConstants_1.default.EMPTY_STRING)
                        .city(GenericConstants_1.default.EMPTY_STRING)
                        .country(GenericConstants_1.default.EMPTY_STRING)
                        .channel(requestDTO.channel || GenericConstants_1.default.EMPTY_STRING)
                        .build();
                    const tokenObject = {
                        username: userProfile.email,
                        emailAddress: userProfile.email,
                        channel: requestDTO.channel
                    };
                    const authToken = JwtTokenUtil_1.default.generateToken(tokenObject);
                    const authCreatedDate = new Date();
                    const otpLength = Number(environment.getProperty("birds.otp.length"));
                    const otp = OtpUtil_1.default.generateToken(otpLength);
                    const userAuth = UserAuth_1.default.builder()
                        .userId(potentialUser.userId)
                        .authToken(authToken)
                        .userEmailAddress(potentialUser.emailAddress)
                        .userUsername(userProfile.email)
                        .authTokenCreatedDate(authCreatedDate)
                        .authTokenExpirationDate(JwtTokenUtil_1.default.getExpirationDateFromCreationDate(authCreatedDate))
                        .otp(PasswordUtil_1.default.hash(otp))
                        .otpExpDate(OtpUtil_1.default.getTokenExpirationTime())
                        .oauth2Channel(OauthChannels_1.OauthChannels.FACEBOOK)
                        .oauth2AccessToken(webResponse.data['access_token'])
                        .oauth2RefreshToken(webResponse.data['refresh_token'])
                        .oauth2Scope(webResponse.data['scope'])
                        .oauth2TokenType(webResponse.data['token_type'])
                        .oauth2IdToken(webResponse.data['id_token'])
                        .oauth2UserId(facebookBasicInfo.id)
                        .build();
                    userAuth.isOtpVerified = true;
                    dbResult = await this.userRepository.createUserAndAuth(potentialUser);
                    if (!dbResult.status) {
                        code = ResponseCodes_1.default.SYSTEM_ERROR;
                        message = this.messageSource.getMessage(code);
                        this.logger.error(UserService_1.default.getLogMessage(requestUrl, message, dbResult.errorMessage));
                        responseDTO = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
                        return responseDTO;
                    }
                    const loginUserRequest = new LoginUserRequestDTO_1.default(potentialUser.emailAddress, internalPassword);
                    loginUserRequest.channel = requestDTO.channel;
                    loginUserRequest.deviceId = requestDTO.deviceId;
                    return await this.userBasicService.loginUserBasic(requestUrl, loginUserRequest);
                }
                if (oauthValidationType === OauthValidationTypes_1.OauthValidationTypes.LOGIN) {
                    const user = (await this.userRepository.findUserByEmail(userProfile.email)).entity;
                    if (user !== null) {
                        dbResult = await this.userRepository.updateUserAndAuth({
                            updatedAt: new Date(), modifiedBy: Performer_1.Performer.OAUTH_PROVIDER_FACEBOOK,
                            emailVerifiedAt: new Date(), firstName: userProfile.first_name,
                            lastName: userProfile.last_name
                        }, {
                            oauth2UserId: facebookBasicInfo.id, oauth2AccessToken: accessToken,
                            oauth2Scope: 'public_profile', oauth2TokenType: webResponse.data['token_type']
                        }, user);
                        if (!dbResult.status) {
                            code = ResponseCodes_1.default.SYSTEM_ERROR;
                            message = this.messageSource.getMessage(code);
                            this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
                            responseDTO = ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
                            return responseDTO;
                        }
                        const loginRequestDTO = new LoginUserRequestDTO_1.default(userProfile.email, internalPassword);
                        loginRequestDTO.channel = requestDTO.channel;
                        loginRequestDTO.deviceId = requestDTO.deviceId;
                        loginRequestDTO.loginBy = OauthChannels_1.OauthChannels.LOCAL_DOMAIN;
                        return await this.userBasicService.loginUserBasic(requestUrl, loginRequestDTO);
                    }
                    else {
                        code = ResponseCodes_1.default.RECORD_NOT_EXIST;
                        message = this.messageSource.getMessage(code);
                        this.logger.info(UserService_1.default.getLogMessage(requestUrl, message));
                        return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
                    }
                }
            }
            return responseDTO;
        }
        return responseDTO;
    }
    async getFacebookBasicUserInfo(accessToken) {
        const meUrl = environment.getProperty("oauth2.facebook.meUrl");
        const paramObject = { access_token: accessToken };
        const completeUrl = BirdsHelper_1.default.getQueryUrl(meUrl, paramObject);
        const webRequest = WebRequest_1.default.builder().url(completeUrl)
            .method(WebRequestMethod_1.WebRequestMethod.GET).headers({ "Content-Type": "application/json" }).build();
        const webResponse = await WebClient_1.default.webRequest(webRequest).connect();
        console.log("User basic info: " + JSON.stringify(webResponse.data));
        if (webResponse.status === common_1.HttpStatus.OK)
            return Promise.resolve(webResponse.data);
        return undefined;
    }
    async getFacebookUserPublicInfo(basicInfo, accessToken) {
        const url = environment.getProperty("oauth2.facebook.baseApiUrl");
        const completeBaseUrl = url.concat(basicInfo.id);
        const paramObject = { fields: "email,name,first_name,last_name", access_token: accessToken };
        const completeUrl = BirdsHelper_1.default.getQueryUrl(completeBaseUrl, paramObject);
        const webRequest = WebRequest_1.default.builder().url(completeUrl).method(WebRequestMethod_1.WebRequestMethod.GET)
            .headers({ "Content-Type": "application/json" }).build();
        const webResponse = await WebClient_1.default.webRequest(webRequest).connect();
        console.log("Public Info: " + JSON.stringify(webResponse.data));
        return webResponse.status === common_1.HttpStatus.OK ? webResponse.data : undefined;
    }
};
UserOauthService = UserOauthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserSQLRepository_1.default,
        MessageSource_1.default,
        UserBasicService_1.default])
], UserOauthService);
exports.default = UserOauthService;
//# sourceMappingURL=UserOauthService.js.map