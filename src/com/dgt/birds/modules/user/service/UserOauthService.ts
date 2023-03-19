/* eslint-disable */
import LoggerFactory from "../../../config/LoggerFactory";
import UserSQLRepository from "../repository/UserSQLRepository";
import MessageSource from "../../../config/MessageSource";
import { HttpStatus, Injectable } from "@nestjs/common";
import ApplicationPropertyConfig from "../../../config/ApplicationPropertyConfig";
import OauthConsentUserRequestDTO from "../dto/request/OauthConsentUserRequestDTO";
import { OauthChannels } from "../../../const/OauthChannels";
import ResponseDTO from "../../../config/ResponseDTO";
import ResponseCodes from "../../../const/ResponseCodes";
import BirdsHelper from "../../../utils/BirdsHelper";
import Oauth2ValidateUserRequestDTO from "../dto/request/Oauth2ValidateUserRequestDTO";
import WebRequest from "../../../web/WebRequest";
import { WebRequestMethod } from "../../../web/WebRequestMethod";
import { WebResponse } from "../../../web/WebResponse";
import WebClient from "../../../web/WebClient";
import {
  AuthTokenObject,
  DBOperationResult,
  GoogleOauth2UserProfile
} from "../interfaces/UserModuleInterfaces";
import User from "../model/User";
import { UserStatus } from "../constants/UserStatus";
import { UserRoles } from "../constants/UserRoles";
import GenericConstants from "../../../const/GenericConstants";
import { RequestChannels } from "../../../const/RequestChannels";
import { UserGender } from "../constants/UserGender";
import UserAuth from "../model/UserAuth";
import JwtTokenUtil from "../../../security/JwtTokenUtil";
import PasswordUtil from "../../../security/PasswordUtil";
import OtpUtil from "../../../security/OtpUtil";
import UserService from "./UserService";
import { OauthValidationTypes } from "../../../const/OauthValidationTypes";
import LoginUserRequestDTO from "../dto/request/LoginUserRequestDTO";
import UserBasicService from "./UserBasicService";
import * as FormData from "form-data";
import { Performer } from "../../../const/Performer";


const environment = ApplicationPropertyConfig;

@Injectable()
export default class UserOauthService
{
  logger: LoggerFactory = LoggerFactory.createLogger(UserOauthService.name);

  constructor(private readonly userRepository: UserSQLRepository,
              private readonly messageSource: MessageSource,
              private readonly userBasicService: UserBasicService
  ) {}


  /**
   * Creates the consent url for an oauth2 provider.
   * @param requestUrl: string
   * @param requestDTO: OauthConsentUserRequestDTO
   */
    async getOauth2UserConsentUrl(requestUrl: string, requestDTO: OauthConsentUserRequestDTO): Promise<ResponseDTO>
    {
        const provider: string = requestDTO.authServiceProvider.toUpperCase();
        let responseDTO: ResponseDTO;
        let code: string = ResponseCodes.OAUTH_PROVIDER_FAILED;
        let message: string = this.messageSource.getMessage(code);
        switch (provider)
        {
            case OauthChannels.GOOGLE: { responseDTO = await this.getGoogleOauth2UserConsentUrl(requestDTO); break; }
            case OauthChannels.FACEBOOK: { responseDTO = await this.getFacebookOauth2UserConsentUrl(requestDTO); break; }
            case OauthChannels.APPLE: { responseDTO = await this.getAppleOauth2UserConsentUrl(requestDTO); break; }
            default: {
               responseDTO = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
            }
        }
        return Promise.resolve(responseDTO);
    }


  /**
   * Creates the consentUrl for Google Oauth2 provider.
   * @param requestDTO: OauthConsentUserRequestDTO
   * @private
   */
    private async getGoogleOauth2UserConsentUrl(requestDTO: OauthConsentUserRequestDTO): Promise<ResponseDTO>
    {
        const authUrlForAuthCode: string = environment.getProperty("oauth2.google.authUrl");
        const clientId: string = environment.getProperty("oauth2.google.clientId");
        const redirectUrl: string = environment.getProperty("oauth2.google.redirectUrl");
        const scope: string = environment.getProperty("oauth2.google.defaultScopes");
        const responseType: string =  environment.getProperty("oauth2.google.responseType");
        const accessType: string =  environment.getProperty("oauth2.google.accessType");
        const approvalPrompt: string =  environment.getProperty("oauth2.google.approvalPrompt");

        const stateObject: object = { provider: requestDTO.authServiceProvider, channel: requestDTO.channel, deviceId: requestDTO.deviceId };
        const stateString: string = JSON.stringify(stateObject);
        const queryObject: object = {
           client_id: clientId,
           redirect_uri: redirectUrl,
           scope: scope,
           response_type: responseType,
           state: Buffer.from(stateString).toString('base64'),
           access_type: accessType,
           approval_prompt: approvalPrompt
        }

        const completeAuthUrl : string = BirdsHelper.getQueryUrl(authUrlForAuthCode, queryObject);
        const responseData: object = { authorizationConsentUrl: completeAuthUrl }
        let code: string = ResponseCodes.SUCCESS;
        let message: string = this.messageSource.getMessage(code);
        let responseDTO: ResponseDTO = ResponseDTO.builder().responseCode(code)
          .responseMessage(message).responseData(responseData).build();

        return Promise.resolve(responseDTO);
    }


    /**
   * Creates the consentUrl for Facebook Oauth2 provider.
   * @param requestDTO: OauthConsentUserRequestDTO
   * @private
   */
    private async getFacebookOauth2UserConsentUrl(requestDTO: OauthConsentUserRequestDTO): Promise<ResponseDTO>{
      const authUrlForAuthCode: string = environment.getProperty("oauth2.facebook.authUrl");
      const clientId: string = environment.getProperty("oauth2.facebook.clientId");
      const redirectUrl: string = environment.getProperty("oauth2.facebook.redirectUrl");

      const stateObject: object = { provider: requestDTO.authServiceProvider, channel: requestDTO.channel, deviceId: requestDTO.deviceId };
      const stateString: string = JSON.stringify(stateObject);
      const scope: string = environment.getProperty("oauth2.facebook.defaultScopes");

      const queryObject: object = {
        client_id: clientId,
        redirect_uri: redirectUrl,
        scope: scope,
        state: Buffer.from(stateString).toString('base64'),
      }

      const completeAuthUrl : string = BirdsHelper.getQueryUrl(authUrlForAuthCode, queryObject);
      const responseData: object = { authorizationConsentUrl: completeAuthUrl }
      let code: string = ResponseCodes.SUCCESS;
      let message: string = this.messageSource.getMessage(code);
      let responseDTO: ResponseDTO = ResponseDTO.builder().responseCode(code)
        .responseMessage(message).responseData(responseData).build();

      return Promise.resolve(responseDTO);
    }


    /**
   * Creates the consentUrl for Apple Oauth2 provider.
   * @param requestDTO
   * @private
   */
    private async getAppleOauth2UserConsentUrl(requestDTO: OauthConsentUserRequestDTO): Promise<ResponseDTO>{
      return Promise.resolve(undefined);
    }


  /**
   * Perform validation of signup or login for oauth user. Each time during oauth login, for the same email
   * not changed, the details of the user is updated at the system from the latest details from the service
   * providers.
   * @param requestUrl: string
   * @param requestDTO: Oauth2ValidateUserRequestDTO
   */
    async validateOauth2User(requestUrl: string, requestDTO: Oauth2ValidateUserRequestDTO): Promise<ResponseDTO>
    {

      let code: string = ResponseCodes.SYSTEM_ERROR;
      let message: string = this.messageSource.getMessage(code);
      let responseDTO: ResponseDTO = ResponseDTO.builder().responseCode(code).responseMessage(message).build();

      // Get the deviceId and channel embedded in the state.
      const stateJson: string = Buffer.from(requestDTO.state, 'base64').toString('ascii');
      const stateObject: object = JSON.parse(stateJson);
      requestDTO.channel = stateObject['channel'];
      requestDTO.deviceId = stateObject['deviceId'];
      requestDTO.authServiceProvider = stateObject['provider'].toUpperCase();
      const provider: string = requestDTO.authServiceProvider;
      switch (provider)
      {
        case OauthChannels.GOOGLE: { responseDTO = await this.validateGoogleUser(requestUrl, requestDTO); break; }
        case OauthChannels.FACEBOOK: { responseDTO = await this.validateFacebookUser(requestUrl, requestDTO); break; }
      }
      return Promise.resolve(responseDTO);
    }


  /**
   * Validate Google user for login and signup in oauth2 flow.
   * @param requestUrl
   * @param requestDTO
   */
  async validateGoogleUser(requestUrl: string, requestDTO: Oauth2ValidateUserRequestDTO):Promise<ResponseDTO>
    {
        let code: string = ResponseCodes.OAUTH_PROVIDER_FAILED;
        let message: string = this.messageSource.getMessage(code);
        let responseDTO: ResponseDTO = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
        let deviceId: string = requestDTO.deviceId;
        let dbResult: DBOperationResult;

        // Check that the deviceId is provided for mobile.
       if(requestDTO.channel === RequestChannels.MOBILE)
       {
          if(requestDTO.deviceId === null || requestDTO.deviceId === undefined || requestDTO.deviceId.length === 0)
          {
              code = ResponseCodes.INVALID_DEVICE_ID;
              message = this.messageSource.getMessage(code);
              responseDTO = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
              return responseDTO;
          }
       }

        // Check if there is a CSRF attack by virtue of state comparison.
        const incomingState: string = Buffer.from(requestDTO.authServiceProvider, 'base64').toString('ascii');
        if(!incomingState)
        {
            code = ResponseCodes.CSRF_ATTACK;
            message = this.messageSource.getMessage(code);
            responseDTO = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
            return responseDTO;
        }

        // Check if the user actually consent on the Google's consent page.
       if(requestDTO.consentCode === null || requestDTO.consentCode === undefined)
       {
          code = ResponseCodes.USER_CONSENT_FAILED;
          message = this.messageSource.getMessage(code);
          responseDTO = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
          return responseDTO;
       }

       const tokenUrl: string = environment.getProperty("oauth2.google.tokenUrl");
      const clientId: string = environment.getProperty("oauth2.google.clientId");
      const clientSecret: string = environment.getProperty("oauth2.google.clientSecret");
      const redirectUrl: string = environment.getProperty("oauth2.google.redirectUrl");
      const grantType: string = environment.getProperty("oauth2.google.grantType");

       // Fetch the access and refresh tokens for the user, exchanging the authorization code with Google.
       const formData: FormData = new FormData();
       formData.append("code", requestDTO.consentCode);
       formData.append("client_id", clientId);
       formData.append("client_secret", clientSecret);
       formData.append("redirect_uri", redirectUrl);
       formData.append("grant_type", grantType);
       const webRequest: WebRequest = WebRequest.builder()
         .url(tokenUrl)
         .method(WebRequestMethod.POST)
         .body(formData)
         .headers({"Content-Type": "application/x-www-form-urlencoded"})
         .build();

       let webResponse: WebResponse;
      try{
            webResponse = await WebClient.webRequest(webRequest).connect();
      }catch (error){
         code = ResponseCodes.OAUTH_PROVIDER_FAILED;
         message = this.messageSource.getMessage(code);
         this.logger.error(UserService.getLogMessage(requestUrl, message, error));
         responseDTO = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
         return responseDTO;
      }
       if(webResponse.status === HttpStatus.OK)
       {
            // Get the currently consented user info from Google resource server.
            const userProfileBaseUrl: string = environment.getProperty("oauth2.google.userProfileUrl");
            const queryParams: object = { alt: "json", access_token: webResponse.data['access_token'] }
            const completeUrl: string = BirdsHelper.getQueryUrl(userProfileBaseUrl, queryParams);
            const userProfileRequest: WebRequest = WebRequest.builder()
              .url(completeUrl)
              .method(WebRequestMethod.GET)
              .headers({ "Content-Type": "application/json"} )
              .build();
            const userProfileResponse: WebResponse = await WebClient.webRequest(userProfileRequest).connect();

            if(userProfileResponse.status === HttpStatus.OK)
            {
                const userProfile: GoogleOauth2UserProfile = userProfileResponse.data as GoogleOauth2UserProfile;
              console.log(webResponse.data);
                // Get what the oauth validation type the client want to perform.
               const oauthValidationType: string = requestDTO.oauthValidationType;
               const internalPassword: string = environment.getProperty("oauth2.internalPassword");

               if(oauthValidationType === OauthValidationTypes.SIGNUP)
               {
                   // Check if the user already exist in the local system by virtue of the email address
                   dbResult = await this.userRepository.findUserByEmail(userProfile.email);
                   if(!dbResult.status)
                   {
                     console.log("E be like here ooo");
                     code = ResponseCodes.SYSTEM_ERROR;
                     message = this.messageSource.getMessage(code);
                     this.logger.error(UserService.getLogMessage(requestUrl, message, dbResult.errorMessage));
                     responseDTO = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
                     return responseDTO;
                   }
                   if(dbResult.entity !== null)
                   {
                     code = ResponseCodes.RECORD_ALREADY_EXIST;
                     message = this.messageSource.getMessage(code);
                     this.logger.info(UserService.getLogMessage(message));
                     responseDTO = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
                     return responseDTO;
                   }

                 // Create the user entity
                 const potentialUser: User = User.builder()
                   .userId(BirdsHelper.generateUUID())
                   .firstName(userProfile.given_name)
                   .middleName(GenericConstants.EMPTY_STRING)
                   .lastName(userProfile.family_name)
                   .address(GenericConstants.EMPTY_STRING)
                   .emailAddress(userProfile.email)
                   .mobileNumber(GenericConstants.EMPTY_STRING)
                   .status(UserStatus.ACTIVE)
                   .dateOfBirth(GenericConstants.EMPTY_STRING)
                   .userRoles([UserRoles.STUDENT, UserRoles.CUSTOMER])
                   .username(userProfile.email)
                   .password(GenericConstants.EMPTY_STRING)
                   .photoLink(userProfile.picture)
                   .createdBy(Performer.OAUTH_PROVIDER_GOOGLE)
                   .createdAt(new Date())
                   .modifiedBy(Performer.OAUTH_PROVIDER_GOOGLE)
                   .updatedAt(new Date())
                   .deviceId(deviceId)
                   .education([])
                   .experience([])
                   .socialMedia({})
                   .geoLocation(GenericConstants.EMPTY_STRING)
                   .loginAttempt(0)
                   .gender(UserGender.MALE)
                   .locale(userProfile.locale.toUpperCase())
                   .city(GenericConstants.EMPTY_STRING)
                   .country(GenericConstants.EMPTY_STRING)
                   .channel(requestDTO.channel)
                   .build();

                 // Generate the token authentication object or claims for user creation.
                 const tokenObject: AuthTokenObject = {
                   username: userProfile.email,
                   emailAddress: userProfile.email,
                   channel: requestDTO.channel
                 } as AuthTokenObject;

                 // Generate the authorization token.
                 const authToken: string = JwtTokenUtil.generateToken(tokenObject);
                 const authCreatedDate: Date = new Date();
                 const otpLength: number = Number(environment.getProperty("birds.otp.length"));
                 const otp: string = OtpUtil.generateToken(otpLength);

                 // Build the userAuth entity
                 const userAuth: UserAuth = UserAuth.builder()
                   .userId(potentialUser.userId)
                   .authToken(authToken)
                   .userEmailAddress(potentialUser.emailAddress)
                   .userUsername(userProfile.email)
                   .authTokenCreatedDate(authCreatedDate)
                   .authTokenExpirationDate(JwtTokenUtil.getExpirationDateFromCreationDate(authCreatedDate))
                   .otp(PasswordUtil.hash(otp))
                   .otpExpDate(OtpUtil.getTokenExpirationTime())
                   .oauth2Channel(OauthChannels.GOOGLE)
                   .oauth2AccessToken(webResponse.data['access_token'])
                   .oauth2RefreshToken(webResponse.data['refresh_token'])
                   .oauth2Scope(webResponse.data['scope'])
                   .oauth2TokenType(webResponse.data['token_type'])
                   .oauth2IdToken(webResponse.data['id_token'])
                   .oauth2UserId(userProfile.id)
                   .build();

                 // Automatically validate OTP verification for the verified Google user.
                 userAuth.isOtpVerified = true;

                 // Save the new user and new user auth entity.
                 dbResult = await this.userRepository.createUserAndAuth(potentialUser);
                 if(!dbResult.status)
                 {
                   code = ResponseCodes.SYSTEM_ERROR;
                   message = this.messageSource.getMessage(code);
                   this.logger.error(UserService.getLogMessage(requestUrl, message, dbResult.errorMessage))
                   responseDTO = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
                   return responseDTO;
                 }

                 // Login the user as a basic user and get login response immediately.
                 const loginUserRequest: LoginUserRequestDTO = new LoginUserRequestDTO(potentialUser.emailAddress, internalPassword);
                 loginUserRequest.channel = requestDTO.channel;
                 loginUserRequest.deviceId = requestDTO.deviceId;
                 loginUserRequest.loginBy = OauthChannels.LOCAL_DOMAIN;
                 return await this.userBasicService.loginUserBasic(requestUrl, loginUserRequest);
               } // End of signup block

                if(oauthValidationType === OauthValidationTypes.LOGIN)
                {
                  // First update the details from the oauth2 Google provider to sync with system database.
                  const user: User = (await this.userRepository.findUserByEmail(userProfile.email)).entity as User;
                  if(user !== null)
                  {
                    dbResult = await this.userRepository.updateUserAndAuth({
                      updatedAt: new Date(), locale: userProfile.locale, modifiedBy: Performer.OAUTH_PROVIDER_GOOGLE,
                      photoLink: userProfile.picture, emailVerifiedAt: new Date(), firstName: userProfile.name,
                      lastName: userProfile.family_name
                    }, {
                      oauth2UserId: userProfile.id, oauth2AccessToken: webResponse.data['access_token'],
                      oauth2RefreshToken: webResponse.data['refresh_token'], oauth2Scope: webResponse.data['scope'],
                      oauth2TokenType: webResponse.data['token_type'], oauth2IdToken: webResponse.data['id_token']
                    }, user);

                    // Check if update of the user is successful. If not, throw error.
                    if(!dbResult.status){
                      code = ResponseCodes.SYSTEM_ERROR,
                        message = this.messageSource.getMessage(code);
                      responseDTO = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
                      return responseDTO;
                    }

                    const loginRequestDTO: LoginUserRequestDTO = new LoginUserRequestDTO(userProfile.email, internalPassword);
                    loginRequestDTO.channel = requestDTO.channel;
                    loginRequestDTO.deviceId = requestDTO.deviceId;
                    return await this.userBasicService.loginUserBasic(requestUrl, loginRequestDTO);
                  }
                  else
                  {
                    code = ResponseCodes.RECORD_NOT_EXIST;
                    message = this.messageSource.getMessage(code);
                    this.logger.info(UserService.getLogMessage(requestUrl, message));
                    return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
                  }

                } // End of login block.

            } // End of block calling google server for user profile.

            return responseDTO;

       } // End of block to call the Google's server on behalf of user to get access token

       return responseDTO;
    }


  async validateFacebookUser(requestUrl: string, requestDTO: Oauth2ValidateUserRequestDTO):Promise<ResponseDTO>
  {
    let code: string = ResponseCodes.OAUTH_PROVIDER_FAILED;
    let message: string = this.messageSource.getMessage(code);
    let responseDTO: ResponseDTO = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
    let deviceId: string = GenericConstants.EMPTY_STRING;
    let dbResult: DBOperationResult;

    // Check that the deviceId is provided for mobile.
    if(requestDTO.channel === RequestChannels.MOBILE)
    {
      if(requestDTO.deviceId === null || requestDTO.deviceId === undefined || requestDTO.deviceId.length === 0)
      {
        code = ResponseCodes.INVALID_DEVICE_ID;
        message = this.messageSource.getMessage(code);
        responseDTO = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
        return responseDTO;
      }
      deviceId = requestDTO.deviceId;
    }

    // Check if there is a CSRF attack by virtue of state comparison.
    const incomingState: string = Buffer.from(requestDTO.authServiceProvider, 'base64').toString('ascii');
    if(!incomingState)
    {
      code = ResponseCodes.CSRF_ATTACK;
      message = this.messageSource.getMessage(code);
      responseDTO = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      return responseDTO;
    }

    // Check if the user actually consent on the Facebook consent page.
    if(requestDTO.consentCode === null || requestDTO.consentCode === undefined)
    {
      code = ResponseCodes.USER_CONSENT_FAILED;
      message = this.messageSource.getMessage(code);
      responseDTO = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      return responseDTO;
    }

    const tokenUrl: string = environment.getProperty("oauth2.facebook.tokenUrl");
    const clientId: string = environment.getProperty("oauth2.facebook.clientId");
    const clientSecret: string = environment.getProperty("oauth2.facebook.clientSecret");
    const redirectUrl: string = environment.getProperty("oauth2.facebook.redirectUrl");
    const grantType: string = environment.getProperty("oauth2.facebook.grantType");

    // Fetch the access and refresh tokens for the user, exchanging the authorization code with Google.
    const queryObject = {
      code: requestDTO.consentCode,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUrl,
      grant_type: grantType
    }

    const completeAccessUrl: string = BirdsHelper.getQueryUrl(tokenUrl, queryObject);
    const webRequest: WebRequest = WebRequest.builder()
      .url(completeAccessUrl)
      .method(WebRequestMethod.GET)
      .headers({"Content-Type": "application/json"})
      .build();

    let webResponse: WebResponse;
    try{
      webResponse = await WebClient.webRequest(webRequest).connect();
    }catch (error){
      code = ResponseCodes.OAUTH_PROVIDER_FAILED;
      message = this.messageSource.getMessage(code);
      this.logger.error(UserService.getLogMessage(requestUrl, message, error));
      responseDTO = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      return responseDTO;
    }

    if(webResponse.status === HttpStatus.OK)
    {
      // Make a GET request to get the userId and full name in the Facebook profile.
      const accessToken: string = webResponse.data['access_token'];
      const facebookBasicInfo: FacebookUserBasicInfo = await this.getFacebookBasicUserInfo(accessToken);
      let facebookPublicInfo: FacebookUserPublicInfo = undefined;
      if(facebookBasicInfo !== undefined )
        facebookPublicInfo = await this.getFacebookUserPublicInfo(facebookBasicInfo, accessToken);

      if(facebookPublicInfo !== undefined && Object.keys(facebookPublicInfo).length > 0)
      {
        const userProfile: FacebookUserPublicInfo = facebookPublicInfo;

        // Get what the oauth validation type the client want to perform.
        const oauthValidationType: string = requestDTO.oauthValidationType;
        const internalPassword: string = environment.getProperty("oauth2.internalPassword");

        if(oauthValidationType === OauthValidationTypes.SIGNUP)
        {
          // Check if the user already exist in the local system by virtue of the email address
          dbResult = await this.userRepository.findUserByEmail(userProfile.email);
          if(!dbResult.status)
          {
            code = ResponseCodes.SYSTEM_ERROR;
            message = this.messageSource.getMessage(code);
            this.logger.error(UserService.getLogMessage(requestUrl, message, dbResult.errorMessage));
            responseDTO = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
            return responseDTO;
          }
          if(dbResult.entity !== null)
          {
            code = ResponseCodes.RECORD_ALREADY_EXIST;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService.getLogMessage(message));
            responseDTO = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
            return responseDTO;
          }

          // Create the user entity
          const potentialUser: User = User.builder()
            .userId(BirdsHelper.generateUUID())
            .firstName(userProfile.first_name)
            .middleName(GenericConstants.EMPTY_STRING)
            .lastName(userProfile.last_name)
            .address(GenericConstants.EMPTY_STRING)
            .emailAddress(userProfile.email)
            .mobileNumber(GenericConstants.EMPTY_STRING)
            .status(UserStatus.ACTIVE)
            .dateOfBirth(GenericConstants.EMPTY_STRING)
            .userRoles([UserRoles.STUDENT, UserRoles.CUSTOMER])
            .username(userProfile.email)
            .password(GenericConstants.EMPTY_STRING)
            .photoLink(GenericConstants.EMPTY_STRING)
            .createdBy(Performer.OAUTH_PROVIDER_FACEBOOK)
            .createdAt(new Date())
            .modifiedBy(Performer.OAUTH_PROVIDER_FACEBOOK)
            .updatedAt(new Date())
            .deviceId(deviceId)
            .education([])
            .experience([])
            .socialMedia({})
            .geoLocation(GenericConstants.EMPTY_STRING)
            .loginAttempt(0)
            .gender(UserGender.MALE)
            .locale(GenericConstants.EMPTY_STRING)
            .city(GenericConstants.EMPTY_STRING)
            .country(GenericConstants.EMPTY_STRING)
            .channel(requestDTO.channel || GenericConstants.EMPTY_STRING)
            .build();

          // Generate the token authentication object or claims for user creation.
          const tokenObject: AuthTokenObject = {
            username: userProfile.email,
            emailAddress: userProfile.email,
            channel: requestDTO.channel
          } as AuthTokenObject;

          // Generate the authorization token.
          const authToken: string = JwtTokenUtil.generateToken(tokenObject);
          const authCreatedDate: Date = new Date();
          const otpLength: number = Number(environment.getProperty("birds.otp.length"));
          const otp: string = OtpUtil.generateToken(otpLength);

          // Build the userAuth entity
          const userAuth: UserAuth = UserAuth.builder()
            .userId(potentialUser.userId)
            .authToken(authToken)
            .userEmailAddress(potentialUser.emailAddress)
            .userUsername(userProfile.email)
            .authTokenCreatedDate(authCreatedDate)
            .authTokenExpirationDate(JwtTokenUtil.getExpirationDateFromCreationDate(authCreatedDate))
            .otp(PasswordUtil.hash(otp))
            .otpExpDate(OtpUtil.getTokenExpirationTime())
            .oauth2Channel(OauthChannels.FACEBOOK)
            .oauth2AccessToken(webResponse.data['access_token'])
            .oauth2RefreshToken(webResponse.data['refresh_token'])
            .oauth2Scope(webResponse.data['scope'])
            .oauth2TokenType(webResponse.data['token_type'])
            .oauth2IdToken(webResponse.data['id_token'])
            .oauth2UserId(facebookBasicInfo.id)
            .build();

          // Automatically validate OTP verification for the verified Google user.
          userAuth.isOtpVerified = true;

          // Save the new user and new user auth entity.
          dbResult = await this.userRepository.createUserAndAuth(potentialUser);
          if(!dbResult.status)
          {
            code = ResponseCodes.SYSTEM_ERROR;
            message = this.messageSource.getMessage(code);
            this.logger.error(UserService.getLogMessage(requestUrl, message, dbResult.errorMessage))
            responseDTO = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
            return responseDTO;
          }

          // Login the user as a basic user and get login response immediately.
          const loginUserRequest: LoginUserRequestDTO = new LoginUserRequestDTO(potentialUser.emailAddress, internalPassword);
          loginUserRequest.channel = requestDTO.channel;
          loginUserRequest.deviceId = requestDTO.deviceId;
          return await this.userBasicService.loginUserBasic(requestUrl, loginUserRequest);

        } // End of signup block

        if(oauthValidationType === OauthValidationTypes.LOGIN)
        {
          // First update the details from the oauth2 Google provider to sync with system database.
          const user: User = (await this.userRepository.findUserByEmail(userProfile.email)).entity as User;
          if(user !== null){
            dbResult = await this.userRepository.updateUserAndAuth({
              updatedAt: new Date(), modifiedBy: Performer.OAUTH_PROVIDER_FACEBOOK,
              emailVerifiedAt: new Date(), firstName: userProfile.first_name,
              lastName: userProfile.last_name
            }, {
              oauth2UserId: facebookBasicInfo.id, oauth2AccessToken: accessToken,
              oauth2Scope: 'public_profile', oauth2TokenType: webResponse.data['token_type']
            }, user);

            // Check if update of the user is successful. If not, throw error.
            if(!dbResult.status){
              code = ResponseCodes.SYSTEM_ERROR;
                message = this.messageSource.getMessage(code);
                this.logger.info(UserService.getLogMessage(requestUrl, message));
              responseDTO = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
              return responseDTO;
            }

            const loginRequestDTO: LoginUserRequestDTO = new LoginUserRequestDTO(userProfile.email, internalPassword);
            loginRequestDTO.channel = requestDTO.channel;
            loginRequestDTO.deviceId = requestDTO.deviceId;
            loginRequestDTO.loginBy = OauthChannels.LOCAL_DOMAIN;
            return await this.userBasicService.loginUserBasic(requestUrl, loginRequestDTO);
          }
          else {
            code = ResponseCodes.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService.getLogMessage(requestUrl, message));
            return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
          }

        } // End of login block.

      } // End of block calling google server for user profile.

      return responseDTO;

    } // End of block to call the Google's server on behalf of user to get access token

    return responseDTO;

  }

  private async getFacebookBasicUserInfo(accessToken: string): Promise<FacebookUserBasicInfo | undefined> {
      const meUrl: string = environment.getProperty("oauth2.facebook.meUrl");
      const paramObject: object = {access_token: accessToken};
      const completeUrl: string = BirdsHelper.getQueryUrl(meUrl, paramObject);
      const webRequest: WebRequest = WebRequest.builder().url(completeUrl)
              .method(WebRequestMethod.GET).headers({"Content-Type": "application/json"}).build();
      const webResponse: WebResponse = await WebClient.webRequest(webRequest).connect();
      console.log("User basic info: " + JSON.stringify(webResponse.data));

      if(webResponse.status === HttpStatus.OK)
        return Promise.resolve(webResponse.data as FacebookUserBasicInfo);
      return undefined;
  }

  private async getFacebookUserPublicInfo(basicInfo: FacebookUserBasicInfo, accessToken: string): Promise<FacebookUserPublicInfo>{
      const url: string = environment.getProperty("oauth2.facebook.baseApiUrl");
      const completeBaseUrl: string = url.concat(basicInfo.id);
      const paramObject: object = { fields: "email,name,first_name,last_name", access_token: accessToken };
      const completeUrl: string = BirdsHelper.getQueryUrl(completeBaseUrl, paramObject);
      const webRequest: WebRequest = WebRequest.builder().url(completeUrl).method(WebRequestMethod.GET)
        .headers({ "Content-Type": "application/json" }).build();
      const webResponse: WebResponse = await WebClient.webRequest(webRequest).connect();
      console.log("Public Info: " + JSON.stringify(webResponse.data));
      return webResponse.status === HttpStatus.OK ? webResponse.data as FacebookUserPublicInfo : undefined;
  }


}

interface FacebookUserBasicInfo{
    name: string, id: string
}

interface FacebookUserPublicInfo{
   email: string, first_name: string, last_name: string, name: string;
}