/* eslint-disable */

import LoggerFactory from "../../../config/LoggerFactory";
import UserSQLRepository from "../repository/UserSQLRepository";
import MessageSource from "../../../config/MessageSource";
import CreateUserRequestDTO from "../dto/request/CreateUserRequestDTO";
import ResponseDTO from "../../../config/ResponseDTO";
import {
  AuthTokenObject,
  CreateUserResponseData,
  DBOperationResult,
  LoginUserResponseData
} from "../interfaces/UserModuleInterfaces";
import ResponseCodes from "../../../const/ResponseCodes";
import { HttpStatus, Injectable } from "@nestjs/common";
import JwtTokenUtil from "../../../security/JwtTokenUtil";
import { RequestChannels } from "../../../const/RequestChannels";
import User from "../model/User";
import BirdsHelper from "../../../utils/BirdsHelper";
import { UserStatus } from "../constants/UserStatus";
import PasswordUtil from "../../../security/PasswordUtil";
import OtpUtil from "../../../security/OtpUtil";
import { OauthChannels } from "../../../const/OauthChannels";
import GenericConstants from "../../../const/GenericConstants";
import LoginUserRequestDTO, { AutomaticLoginRequestDTO } from "../dto/request/LoginUserRequestDTO";
import ValidateOtpRequestDTO from "../dto/request/ValidateOtpRequestDTO";
import ValidateOtpData from "../dto/response/data/ValidateOtpData";
import UserService from "./UserService";
import ApplicationPropertyConfig from "../../../config/ApplicationPropertyConfig";
import TemplateHandler from "../../../config/TemplateHandler";
import EmailUtil, { Mail } from "../../../utils/EmailUtil";
import { UserGender } from "../constants/UserGender";
import { Performer } from "../../../const/Performer";
import UpdatePasswordRequestDTO from "../dto/request/UpdatePasswordRequestDTO";
import { UpdatePasswordResponseData } from "../dto/response/UpdatePasswordResponseDTO";
import UserLogin from "../model/UserLogin";
import LoginSQLRepository from "../repository/LoginSQLRepository";
import { UserRoles } from "../constants/UserRoles";


const environment = ApplicationPropertyConfig;

/**
 * Handles all business logic for basic user services.
 */
@Injectable()
export default class UserBasicService
{
  logger: LoggerFactory = LoggerFactory.createLogger(UserBasicService.name);

  constructor(private readonly userRepository: UserSQLRepository,
              private readonly messageSource: MessageSource,
              private readonly loginRepository: LoginSQLRepository
  ) {}

  /**
   * Creates a new user into the system through the basic process.
   * @param requestUrl: string
   * @param requestDTO: CreateUserRequestDTO
   */
  async createUserBasic(requestUrl: string, requestDTO: CreateUserRequestDTO): Promise<ResponseDTO>
  {

    let dbResult: DBOperationResult;
    let code;
    let message = "User signup - ";
    let status: string = UserStatus.UNVERIFIED;
    let createdBy: string = Performer.SYSTEM;
    let modifiedBy: string = Performer.SYSTEM;

    if(requestDTO.signupBy === null || requestDTO.signupBy === undefined){
       requestDTO.signupBy = OauthChannels.LOCAL_DOMAIN;
    }

    // Validate the signer if it is present
    if(!this.validateSignerAndLogger(requestDTO.signupBy)){
      code = ResponseCodes.INVALID_SIGNER;
      message = this.messageSource.getMessage(code);
      return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
    }

    // Validate that the user does not already exist by email.
    dbResult = await this.userRepository.findUserByEmail(requestDTO.emailAddress);
    if(dbResult.status){
      if(dbResult.entity !== null){
        code = ResponseCodes.RECORD_ALREADY_EXIST;
        message += this.messageSource.getMessage(code).concat(" by email address!");
        this.logger.info(UserService.getLogMessage(requestUrl, message));
        return ResponseDTO.builder().responseCode(code).responseMessage(message)
          .httpStatus(HttpStatus.OK).build();
      }
    }
    else{
      code = ResponseCodes.SYSTEM_ERROR;
      message += this.messageSource.getMessage(code);
      this.logger.error(UserService.getLogMessage(requestUrl, message, dbResult.errorMessage));
      return ResponseDTO.builder().responseCode(code)
        .httpStatus(HttpStatus.INTERNAL_SERVER_ERROR).responseMessage(message).build();
    }

    // Validate that the user does not yet exist by username.
    dbResult = await this.userRepository.findUserByUsername(requestDTO.username);
    if(dbResult.status){
      if(dbResult.entity !== null){
        code = ResponseCodes.RECORD_ALREADY_EXIST;
        message += this.messageSource.getMessage(code).concat(" by username!");
        this.logger.info(UserService.getLogMessage(requestUrl, message));
        return ResponseDTO.builder().responseCode(code)
          .httpStatus(HttpStatus.OK).responseMessage(message).build();
      }
    }else{
      code = ResponseCodes.SYSTEM_ERROR;
      message += this.messageSource.getMessage(code);
      this.logger.error(UserService.getLogMessage(requestUrl, message, dbResult.errorMessage));
      return ResponseDTO.builder().responseCode(code)
        .httpStatus(HttpStatus.INTERNAL_SERVER_ERROR).responseMessage(message).build();
    }

    // Validate the role of the user.
    const isValidSignupRole: boolean = UserService.isUserRoleValid(requestDTO.userRoles);
    if(!isValidSignupRole){
      code = ResponseCodes.INVALID_USER_ROLE;
      message = this.messageSource.getMessage(code);
      this.logger.info(UserService.getLogMessage(requestUrl, message));
      return ResponseDTO.builder().responseCode(code)
        .httpStatus(HttpStatus.OK).responseMessage(message).build();
    }

    // Validate the deviceId for a MOBILE channel
    let deviceId = requestDTO.deviceId;
    if(requestDTO.channel === RequestChannels.MOBILE){
        if( deviceId === null || deviceId === undefined || deviceId.length === 0) {
           code = ResponseCodes.INVALID_DEVICE_ID;
           message = this.messageSource.getMessage(code);
           this.logger.info(UserService.getLogMessage(requestUrl, message));
           return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
        }
    }

    // Validate that password field is passed for local domain.
    if(requestDTO.signupBy === OauthChannels.LOCAL_DOMAIN){
      if(requestDTO.password === null || requestDTO.password === undefined){
         code = ResponseCodes.INVALID_PASSWORD;
         message = this.messageSource.getMessage(code);
         return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }
    }
    else{
      requestDTO.password = environment.getProperty("oauth2.internalPassword");
      status = UserStatus.ACTIVE;
      createdBy = this.getCreatorAndModifierBySigner(requestDTO.signupBy.toUpperCase());
      modifiedBy = this.getCreatorAndModifierBySigner(requestDTO.signupBy.toUpperCase());
    }

    // Generate the token authentication object or claims for user creation.
    const tokenObject: AuthTokenObject = {
      username: requestDTO.username,
      emailAddress: requestDTO.emailAddress,
      channel: requestDTO.channel
    } as AuthTokenObject;

    // Generate the authorization token.
    const authToken: string = JwtTokenUtil.generateToken(tokenObject);
    deviceId = requestDTO.channel.toUpperCase() === RequestChannels.MOBILE ? requestDTO.deviceId : null;

    // Create the auth entity for the new user.
    const otpLength: number = Number(environment.getProperty("birds.otp.length"));
    const otp: string = OtpUtil.generateToken(otpLength);
    const authCreatedDate: Date = new Date();

    //Create the user entity
    const potentialUser: User = User.builder()
      .userId(BirdsHelper.generateUUID())
      .firstName(requestDTO.firstName)
      .middleName(requestDTO.middleName || GenericConstants.EMPTY_STRING)
      .lastName(requestDTO.lastName)
      .address(requestDTO.address || GenericConstants.EMPTY_STRING)
      .emailAddress(requestDTO.emailAddress)
      .mobileNumber(requestDTO.mobileNumber || GenericConstants.EMPTY_STRING)
      .status(status)
      .dateOfBirth(requestDTO.dateOfBirth || GenericConstants.EMPTY_STRING)
      .userRoles(requestDTO.userRoles || [UserRoles.CUSTOMER])
      .username(requestDTO.username)
      .password(PasswordUtil.hash(requestDTO.password))
      .photoLink(requestDTO.photo || environment.getProperty("birds.user.defaultProfilePic"))
      .createdBy(createdBy)
      .createdAt(new Date())
      .modifiedBy(modifiedBy)
      .updatedAt(new Date())
      .deviceId(deviceId)
      .geoLocation(requestDTO.geoLocation || GenericConstants.EMPTY_STRING)
      .loginAttempt(0)
      .gender(requestDTO.gender || UserGender.UNKNOWN)
      .locale(requestDTO.language || GenericConstants.EMPTY_STRING)
      .city(requestDTO.city || GenericConstants.EMPTY_STRING)
      .country(requestDTO.country || GenericConstants.EMPTY_STRING)
      .channel(requestDTO.channel)
      .education([])
      .experience([])
      .socialMedia({})
      .authToken(authToken)
      .authTokenCreatedDate(authCreatedDate)
      .authTokenExpirationDate(JwtTokenUtil.getExpirationDateFromCreationDate(authCreatedDate))
      .otp(PasswordUtil.hash(otp))
      .otpCreatedDate(authCreatedDate)
      .otpExpDate(OtpUtil.getTokenExpirationTime())
      .oauth2Channel(requestDTO.signupBy || OauthChannels.LOCAL_DOMAIN)
      .oauth2AccessToken(GenericConstants.EMPTY_STRING)
      .oauth2RefreshToken(GenericConstants.EMPTY_STRING)
      .oauth2Scope(GenericConstants.EMPTY_STRING)
      .oauth2TokenType(GenericConstants.EMPTY_STRING)
      .oauth2IdToken(GenericConstants.EMPTY_STRING)
      .oauth2UserId(GenericConstants.EMPTY_STRING)
      .rememberMeActive(undefined)
      .rememberMeCreatedDate(undefined)
      .rememberMeExpDate(undefined)
      .build();

    console.log("Afetr user build: " + potentialUser.userId)
    // Prepare the response payload to the client.
    const data: CreateUserResponseData = {
      emailAddress: requestDTO.emailAddress,
      username: requestDTO.username,
      createdDate: new Date(),
      deviceId: deviceId
    }

    dbResult = await this.userRepository.createUserAndAuth(potentialUser);
    if(dbResult.status){
      if(dbResult.entity !== null){
        code = ResponseCodes.SUCCESS;
        message += this.messageSource.getMessage(code);
        this.logger.info(UserService.getLogMessage(requestUrl, message));

        // Asynchronously send otp to user's email address. This is done if signup by local domain.
        if(requestDTO.signupBy === OauthChannels.LOCAL_DOMAIN){
          const emailContent: string = TemplateHandler.getOtpStreamMessage(otp, {
            firstName: potentialUser.firstName, lastName: potentialUser.lastName
          });
          const mail: Mail = {
            to: potentialUser.emailAddress,
            subject: environment.getProperty("mail.otp.subject"),
            text: GenericConstants.EMPTY_STRING,
            html: emailContent
          }
          EmailUtil.send(mail).then(info => {
            this.logger.info(info.messageId);
            console.log("Signup OTP: ".concat(otp));
          });
        }

        const response: ResponseDTO = ResponseDTO.builder()
          .responseCode(code)
          .responseMessage(message)
          .responseData(data)
          .httpStatus(HttpStatus.OK)
          .build();
        return Promise.resolve(response);
      }
    }else {
      code = ResponseCodes.SYSTEM_ERROR;
      message += this.messageSource.getMessage(code);
      this.logger.error(UserService.getLogMessage(requestUrl, message, dbResult.errorMessage));
      return ResponseDTO.builder().responseCode(code)
        .httpStatus(HttpStatus.INTERNAL_SERVER_ERROR).responseMessage(message).build();
    }

  }


  /**
   *  Logs in a user by the use of password and email that was originally signed into the
   *  system through the basic signup process.
   * @param requestUrl: string
   * @param requestDTO: LoginRequestDTO
   */
  async loginUserBasic(requestUrl: string, requestDTO: LoginUserRequestDTO): Promise<ResponseDTO> {
    let code = ResponseCodes.RECORD_NOT_EXIST;
    let message = "User login - ";
    let responseDto: ResponseDTO;
    let loginBy: string = OauthChannels.LOCAL_DOMAIN;

    if(requestDTO.loginBy === null || requestDTO.loginBy === undefined){
        requestDTO.loginBy = loginBy;
    }

    // Check that a user exists by virtue of email. If not, throw an error.
    let dbResult: DBOperationResult = await this.userRepository.findUserByEmail(requestDTO.email);
    if(dbResult.status){
      if(dbResult.entity === null || dbResult.entity === undefined){
        message += this.messageSource.getMessage(code);
        responseDto = ResponseDTO.builder().responseCode(code)
          .httpStatus(HttpStatus.OK).responseMessage(message).build();
        this.logger.info(UserService.getLogMessage(requestUrl, message));
        return Promise.resolve(responseDto);
      }
    }else {
      code = ResponseCodes.SYSTEM_ERROR;
      message = this.messageSource.getMessage(code);
      this.logger.error(UserService.getLogMessage(requestUrl, message, dbResult.errorMessage));
      responseDto = ResponseDTO.builder().responseCode(code).responseMessage(dbResult.errorMessage).build();
      return responseDto;
    }

    // Check the channel and possible deviceId violation
    if(requestDTO.channel === RequestChannels.MOBILE){
        if(requestDTO.deviceId === null || requestDTO.deviceId === undefined || requestDTO.deviceId.length === 0){
           code = ResponseCodes.INVALID_DEVICE_ID;
           message = this.messageSource.getMessage(code);
           this.logger.info(UserService.getLogMessage(requestUrl, message));
           return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
        }
    }

    // Validate the signer if it exists
    if(!this.validateSignerAndLogger(requestDTO.loginBy)){
      code = ResponseCodes.INVALID_SIGNER;
      message = this.messageSource.getMessage(code);
      return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
    }

    // Grab the valid user in the system.
    let potentialUser: User = dbResult.entity as User;

    /**
     * Authenticate the user by virtue of password matching. By this, we check to see if the
     * request to log in a user into the system is a user initiated or initiated by an Oauth2
     * provider who do not care for a password.
     */
    if(requestDTO.loginBy === OauthChannels.LOCAL_DOMAIN){
      const internalPassword: string = environment.getProperty("oauth2.internalPassword");
      const rememberMePassword: string = environment.getProperty("birds.rememberMe.autoInternalPassword");
      const incomingPassword: string = requestDTO.password;
      const storedHashPassword: string = potentialUser.password;
      const isUserPasswordMatch: boolean = PasswordUtil.match(incomingPassword, storedHashPassword);

      if(incomingPassword !== internalPassword && incomingPassword !== rememberMePassword) // This is not an internal-oauth login request.
      {
        if(!isUserPasswordMatch){
          code = ResponseCodes.INVALID_PASSWORD;
          message += this.messageSource.getMessage(code);
          responseDto = ResponseDTO.builder().responseCode(code)
            .httpStatus(HttpStatus.OK).responseMessage(message).build();
          this.logger.info(UserService.getLogMessage(requestUrl, message));
          return Promise.resolve(responseDto);
        }
      }
    }

    // Verify that the user is not locked. If not, throw an error.
    if(potentialUser.status.toUpperCase() === UserStatus.LOCKED){
      code = ResponseCodes.ACCOUNT_LOCKED;
      message = this.messageSource.getMessage(code);
      this.logger.info(UserService.getLogMessage(requestUrl, message));
      return ResponseDTO.builder().responseCode(code)
        .httpStatus(HttpStatus.OK).responseMessage(message).build();
    }

    // Verify that the user status is verified. If not, throw an error.
    if(potentialUser.status.toUpperCase() === UserStatus.UNVERIFIED){
      code = ResponseCodes.ACCOUNT_NOT_VERIFIED;
      message = this.messageSource.getMessage(code);
      this.logger.info(UserService.getLogMessage(requestUrl, message));
      return ResponseDTO.builder().responseCode(code)
        .httpStatus(HttpStatus.OK).responseMessage(message).build();
    }

    // Generate fresh token.
    const tokenObject: AuthTokenObject = {
      username: potentialUser.username,
      emailAddress: potentialUser.emailAddress,
      channel: potentialUser.channel
    } as AuthTokenObject;

    const userAuth = UserService.generateNewUserAuth(tokenObject, potentialUser.userId, requestDTO, potentialUser);
    delete userAuth.userUsername;
    delete userAuth.userEmailAddress;
    const partial: object = JSON.parse(JSON.stringify(userAuth));

    // Update both the user entity and the auth entity and get the last login date.
    const lastLoginDate: Date = potentialUser.lastLoginDate === null ? new Date() : potentialUser.lastLoginDate;
    potentialUser.lastLoginDate = lastLoginDate;
    dbResult = await this.userRepository.updateUserAndAuthAfterLogin(potentialUser, partial);
    if(!dbResult.status){
      code = ResponseCodes.SYSTEM_ERROR;
      message += this.messageSource.getMessage(code);
      responseDto = ResponseDTO.builder().responseCode(code)
        .httpStatus(HttpStatus.INTERNAL_SERVER_ERROR).responseMessage(message).build();
      this.logger.error(UserService.getLogMessage(requestUrl, dbResult.errorMessage));
      return responseDto;
    }

    // Update the last login date
    await this.userRepository.updateUser(potentialUser, {lastLoginDate: potentialUser.authTokenCreatedDate});

    // Update the user with new credentials.
    potentialUser = (await this.userRepository.findUserByEmail(potentialUser.emailAddress)).entity as User;
    if(potentialUser === null){
      code = ResponseCodes.SYSTEM_ERROR;
      message += this.messageSource.getMessage(code);
      responseDto = ResponseDTO.builder().responseCode(code)
        .httpStatus(HttpStatus.INTERNAL_SERVER_ERROR).responseMessage(message).build();
      this.logger.info(UserService.getLogMessage(requestUrl, message));
      return Promise.resolve(responseDto);
    }

    // At this stage, all is well. Save the user login details to database.
    const login: UserLogin = UserLogin.builder()
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

    // Generate the Login response dto to client side.
    const responseData: LoginUserResponseData = {
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
      dateOfBirth: BirdsHelper.formatDate(potentialUser.dateOfBirth),
      lastLoginDate: BirdsHelper.formatDate(lastLoginDate),
      photoLink: potentialUser.photoLink,
      createdDate: BirdsHelper.formatDate(potentialUser.createdAt),
      modifiedDate: BirdsHelper.formatDate(potentialUser.updatedAt),
      deviceId: potentialUser.deviceId,
      geoLocation: potentialUser.geoLocation,
      gender: potentialUser.gender,
      language: potentialUser.locale,
      city: potentialUser.city,
      country: potentialUser.country,
      authToken: potentialUser.authToken,
      rememberMeActive: potentialUser.rememberMeActive
    }

    code = ResponseCodes.SUCCESS;
    message += this.messageSource.getMessage(code);
    this.logger.info(UserService.getLogMessage(requestUrl, message));
    responseDto = ResponseDTO.builder()
      .responseCode(code)
      .responseMessage(message)
      .httpStatus(HttpStatus.OK)
      .responseData(responseData).build();
    return Promise.resolve(responseDto);
  }


  async loginUserAutomatic(requestUrl: string, requestDTO: AutomaticLoginRequestDTO): Promise<ResponseDTO>{
      let code: string = ResponseCodes.SYSTEM_ERROR;
      let message: string = this.messageSource.getMessage(code);

      // Check the channel
      if(requestDTO.channel !== RequestChannels.MOBILE){
         code = ResponseCodes.INVALID_CHANNEL;
         message = this.messageSource.getMessage(code);
         return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      // Fetch the latest login record by the deviceId.
      const latestLogin: UserLogin = await this.loginRepository.findOne({
        where: { userDeviceId: requestDTO.deviceId },
        order: { createdDate: 'DESC' },
      });

      // Check if there is a login record before (that is whether the user has login before or not)
      if(latestLogin === null || latestLogin === undefined){
         code = ResponseCodes.NO_INITIAL_LOGIN_RECORD;
         message = this.messageSource.getMessage(code);
         return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      // Get the last login user and the userAuth object.
      const userEmail: string = latestLogin.userEmail;
      const potentialUser: User = (await this.userRepository.findUserByEmail(userEmail)).entity as User;
      if(potentialUser === null){
         code = ResponseCodes.RECORD_NOT_EXIST;
         message = this.messageSource.getMessage(code);
         return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      // Check if the user remember me is active.
      if(!potentialUser.rememberMeActive){
          code = ResponseCodes.REMEMBER_ME_EXPIRED;
          message = this.messageSource.getMessage(code);
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      // Login the user basically.
    const rememberMePassword: string = environment.getProperty("birds.rememberMe.autoInternalPassword")
      const loginRequest: LoginUserRequestDTO = new LoginUserRequestDTO(userEmail, potentialUser.password);
      loginRequest.channel = requestDTO.channel;
      loginRequest.deviceId = requestDTO.deviceId;
      loginRequest.password = rememberMePassword;
      return this.loginUserBasic(requestUrl, loginRequest);
  }


  /**
   * Validates the OTP sent to the User as at signup.
   * @param requestUrl: string
   * @param requestDTO: ValidateOtpRequestDTO
   */
  async validateOtp(requestUrl: string, requestDTO: ValidateOtpRequestDTO): Promise<ResponseDTO>{

    let dbResult: DBOperationResult;
    let code: string = ResponseCodes.SYSTEM_ERROR;
    let message: string = this.messageSource.getMessage(code);

    // Validate that the user exists by user email.
    dbResult = await this.userRepository.findUserByEmail(requestDTO.userEmail);
    if(!dbResult.status){
      this.logger.error(UserService.getLogMessage(requestUrl, dbResult.errorMessage));
      return ResponseDTO.builder().responseCode(code)
        .httpStatus(HttpStatus.INTERNAL_SERVER_ERROR).responseMessage(message).build();
    }

    const user: User = dbResult.entity as User;
    if(user === null){
      code = ResponseCodes.RECORD_NOT_EXIST;
      message = this.messageSource.getMessage(code);
      this.logger.info(UserService.getLogMessage(requestUrl, message));
      return ResponseDTO.builder().responseCode(code)
        .httpStatus(HttpStatus.OK).responseMessage(message).build();
    }

    // Check if the otp is already validated. If so, throw an error.
    if(user.isOtpVerified){
      code = ResponseCodes.OTP_ALREADY_VERIFIED;
      message = this.messageSource.getMessage(code);
      this.logger.info(UserService.getLogMessage(requestUrl, message));
      return ResponseDTO.builder().responseCode(code)
        .httpStatus(HttpStatus.OK).responseMessage(message).build();
    }

    // Check if the otp is the same as saved during signup.
    const isOtpSame: boolean = PasswordUtil.match(requestDTO.otp, user.otp);
    if(!isOtpSame){
      code = ResponseCodes.INVALID_OTP;
      message = this.messageSource.getMessage(code);
      this.logger.info(UserService.getLogMessage(requestUrl, message));
      return ResponseDTO.builder().responseCode(code)
        .httpStatus(HttpStatus.OK).responseMessage(message).build();
    }

    // Check if the otp has not expired.
    const expTimeString: string = environment.getProperty("birds.otp.expiresIn");
    const expirationTimeInMilsec: number = BirdsHelper.getMillSecFromTimeString(expTimeString);
    const isOtpExpired: boolean = new Date().getTime() - user.otpExpDate.getTime() >= expirationTimeInMilsec;
    if(isOtpExpired){
      code = ResponseCodes.EXPIRED_OTP;
      message = this.messageSource.getMessage(code);
      this.logger.info(UserService.getLogMessage(requestUrl, message));
      return ResponseDTO.builder().responseCode(code)
        .httpStatus(HttpStatus.OK).responseMessage(message).build();
    }

    // Update the status of the user, emailVerifiedAt and corresponding userAuth.
    dbResult = await this.userRepository.updateUserAndAuth({
      status: UserStatus.ACTIVE, emailVerifiedAt: new Date()
    }, { isOtpVerified: true }, user);
    if(!dbResult.status){
      code = ResponseCodes.SYSTEM_ERROR;
      message = this.messageSource.getMessage(code);
      this.logger.info(UserService.getLogMessage(requestUrl, dbResult.errorMessage));
      return ResponseDTO.builder().responseCode(code)
        .httpStatus(HttpStatus.INTERNAL_SERVER_ERROR).responseMessage(message).build();
    }

    // Prepare the response payload to the client.
    const responseData: ValidateOtpData = new ValidateOtpData();
    responseData.userEmail = user.emailAddress;
    responseData.otpValidatedDate = new Date();
    responseData.userStatus = UserStatus.ACTIVE;
    code = ResponseCodes.SUCCESS;
    message = this.messageSource.getMessage(code);

    const response:ResponseDTO = ResponseDTO.builder()
      .responseCode(code)
      .responseMessage(message)
      .httpStatus(HttpStatus.OK)
      .responseData(responseData).build();
    this.logger.info(UserService.getLogMessage(requestUrl, message));
    return Promise.resolve(response);
  }


  /**
   * Sends an OTP to a particular registered email address that has not been verified.
   * @param requestUrl: string
   * @param emailAddress: string
   */
  async sendVerificationOtp(requestUrl: string, emailAddress: string): Promise<ResponseDTO>{

      let code: string = ResponseCodes.SYSTEM_ERROR;
      let message: string = this.messageSource.getMessage(code);
      let dbResult: DBOperationResult;

      // First ensure that the email address was passed.
      if(emailAddress === null || emailAddress === undefined || emailAddress.length === 0)
      {
        code = ResponseCodes.BAD_REQUEST;
        message = this.messageSource.getMessage(code);
        this.logger.info(UserService.getLogMessage(requestUrl, message, "No emailAddress provided"));
        return ResponseDTO.builder().responseCode(code).responseMessage(message.concat(": No emailAddress provided")).build();
      }

      // Ensure that the user exists in the system.
      dbResult = await this.userRepository.findUserByEmail(emailAddress);
      if(!dbResult.status)
      {
        this.logger.info(UserService.getLogMessage(requestUrl, message, dbResult.errorMessage));
        return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      const potentialUser: User = dbResult.entity as User;

      if(potentialUser === null)
      {
        code = ResponseCodes.RECORD_NOT_EXIST;
        message = this.messageSource.getMessage(code);
        this.logger.info(UserService.getLogMessage(requestUrl, message));
        return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      // Check that the otp is not yet verified.
     if(potentialUser.isOtpVerified || potentialUser.status.toUpperCase() !== UserStatus.UNVERIFIED)
     {
       code = ResponseCodes.OTP_ALREADY_VERIFIED;
       message = this.messageSource.getMessage(code);
       this.messageSource.getMessage(UserService.getLogMessage(requestUrl, message));
       this.logger.info(UserService.getLogMessage(requestUrl, message));
       return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
     }

     // Check that OTP sent initially to the user has not yet expired. If not, tell them to wait till expiration time.
    const anotherOtpWaitTimeInSec: number = Number(environment.getProperty("birds.otp.anotherOtpWaitInSec")) * 1000;
    if((potentialUser.otpCreatedDate.getTime() - new Date().getTime()) < anotherOtpWaitTimeInSec)
     {
        code = ResponseCodes.OTP_STILL_ACTIVE;
        message = this.messageSource.getMessage(code);
        this.logger.info(UserService.getLogMessage(requestUrl, message));
        return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
     }

    // Create the auth entity for the new user.
    const otpLength: number = Number(environment.getProperty("birds.otp.length"));
    const otp: string = OtpUtil.generateToken(otpLength);
    const partial: object = { otp: PasswordUtil.hash(otp), otpCreatedDate: new Date(), otpExpDate: OtpUtil.getTokenExpirationTime() };
     dbResult = await this.userRepository.updateUser(potentialUser, partial);
     if(!dbResult.status)
     {
        this.logger.error(UserService.getLogMessage(requestUrl, message, dbResult.errorMessage));
        return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
     }

     // Send the email and wait for the result.
    const emailContent: string = TemplateHandler.getOtpStreamMessage(otp, {
      firstName: potentialUser.firstName, lastName: potentialUser.lastName
    });
    const mail: Mail = {
      to: potentialUser.emailAddress,
      subject: environment.getProperty("mail.otp.subject"),
      text: GenericConstants.EMPTY_STRING,
      html: emailContent
    }

    const info = await EmailUtil.send(mail);
    if(info && info.messageId){
       code = ResponseCodes.SUCCESS;
       message = this.messageSource.getMessage(code);
       this.logger.info(UserService.getLogMessage(requestUrl, message));
       return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
    }

    return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
  }

  async sendResetPasswordMailForMobile(requestUrl: string, emailAddress: string)
  {
    let code: string = ResponseCodes.SYSTEM_ERROR;
    let message: string = this.messageSource.getMessage(code);
    let dbResult: DBOperationResult;

    // First ensure that the email address was passed.
    if(emailAddress === null || emailAddress === undefined || emailAddress.length === 0)
    {
      code = ResponseCodes.BAD_REQUEST;
      message = this.messageSource.getMessage(code);
      this.logger.info(UserService.getLogMessage(requestUrl, message, "No emailAddress provided"));
      return ResponseDTO.builder().responseCode(code).responseMessage(message.concat(": No emailAddress provided")).build();
    }

    // Ensure that the user exists in the system.
    dbResult = await this.userRepository.findUserByEmail(emailAddress);
    if(!dbResult.status)
    {
      this.logger.info(UserService.getLogMessage(requestUrl, message, dbResult.errorMessage));
      return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
    }

    const potentialUser: User = dbResult.entity as User;

    if(potentialUser === null)
    {
      code = ResponseCodes.RECORD_NOT_EXIST;
      message = this.messageSource.getMessage(code);
      this.logger.info(UserService.getLogMessage(requestUrl, message));
      return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
    }

    // Create the auth entity for the new user.
    const otpLength: number = Number(environment.getProperty("birds.otp.length"));
    const otp: string = OtpUtil.generateToken(otpLength);
    const partial: object = { otp: PasswordUtil.hash(otp), otpCreatedDate: new Date(), otpExpDate: OtpUtil.getTokenExpirationTime() };
    dbResult = await this.userRepository.updateUser(potentialUser, partial);
    if(!dbResult.status)
    {
      this.logger.error(UserService.getLogMessage(requestUrl, message, dbResult.errorMessage));
      return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
    }

    // Send the email and wait for the result.
    const emailContent: string = TemplateHandler.getForgetPasswordOtpStreamMessage(otp, {
      firstName: potentialUser.firstName, lastName: potentialUser.lastName
    });
    const mail: Mail = {
      to: potentialUser.emailAddress,
      subject: environment.getProperty("mail.otp.passwordResetSubject"),
      text: GenericConstants.EMPTY_STRING,
      html: emailContent
    }

    const info = await EmailUtil.send(mail);
    if(info && info.messageId){
      code = ResponseCodes.SUCCESS;
      message = this.messageSource.getMessage(code);
      this.logger.info(UserService.getLogMessage(requestUrl, message, info.messageId));
      console.log("OTP: ".concat(otp))
      return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
    }

    return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
  }

  async validateOtpForPasswordReset(requestUrl: string, requestDTO: ValidateOtpRequestDTO): Promise<ResponseDTO>
  {
      let code = ResponseCodes.SYSTEM_ERROR;
      let message = this.messageSource.getMessage(code);
      let dbResult: DBOperationResult;

      dbResult = await this.userRepository.findUserByEmail(requestDTO.userEmail);
      if(!dbResult.status){
        this.logger.info(UserService.getLogMessage(requestUrl, message, dbResult.errorMessage));
         return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      const potentialUser: User = dbResult.entity as User;
      if(potentialUser === null){
        code = ResponseCodes.RECORD_NOT_EXIST;
        message = this.messageSource.getMessage(code);
        return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      if(potentialUser.otpExpDate.getTime() < new Date().getTime()){
         code = ResponseCodes.EXPIRED_OTP;
         message = this.messageSource.getMessage(code);
         return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      if(!PasswordUtil.match(requestDTO.otp, potentialUser.otp)){
         code = ResponseCodes.INVALID_OTP;
         message = this.messageSource.getMessage(code);
         this.logger.info(UserService.getLogMessage(requestUrl, message));
         return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      code = ResponseCodes.SUCCESS;
      message = this.messageSource.getMessage(code);
      return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
  }

  async sendResetPasswordMail(requestUrl: string, emailAddress: string): Promise<ResponseDTO>{
     let code: string = ResponseCodes.SYSTEM_ERROR;
     let message: string = this.messageSource.getMessage(code);
     let dbResult: DBOperationResult;

     // Confirm that the user that made the request is a valid user
    if(emailAddress === null || emailAddress === undefined || emailAddress.length === 0)
    {
       code = ResponseCodes.BAD_REQUEST;
       message = this.messageSource.getMessage(code).concat(": No email address specified! ");
       this.logger.info(UserService.getLogMessage(requestUrl, message));
       return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
    }

    dbResult = await this.userRepository.findUserByEmail(emailAddress);
    if(!dbResult.status) {
       return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
    }
     const potentialUser: User = dbResult.entity as User;
     if(!potentialUser)
     {
        code = ResponseCodes.RECORD_NOT_EXIST;
        message = this.messageSource.getMessage(code);
        this.logger.info(UserService.getLogMessage(requestUrl, message));
        return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
     }

     // Get the mail content from template and customize it.
    const encodedEmail: string = Buffer.from(emailAddress).toString('base64');
     const linkExpirationInHrs: string = environment.getProperty("user.password.reset.expiresIn");
    let mailHtmlContent: string = TemplateHandler.getTemplate("EPWC");
     mailHtmlContent = mailHtmlContent
                       .replaceAll("{firstName}", potentialUser.firstName)
                       .replaceAll("{lastName}", potentialUser.lastName)
                       .replaceAll("{encodedEmail}", encodedEmail)
                       .replaceAll("{expiresIn}", linkExpirationInHrs);
     const mail: Mail = {
        to: emailAddress,
        text: '',
        html: mailHtmlContent,
        subject: "Password Reset request"
     }

     // Send the mail and wait to complete.
     const emailInfo = await EmailUtil.send(mail);
     if(emailInfo)
     {
        code = ResponseCodes.SUCCESS;
        message = this.messageSource.getMessage(code);
        this.logger.info(UserService.getLogMessage(message));
        return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
     }

     return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
  }

  async getPasswordResetStreamPage(requestUrl: string, encodedEmail: string): Promise<string>{
    let code = ResponseCodes.SYSTEM_ERROR;
    let message = this.messageSource.getMessage(code);
    let dbResult: DBOperationResult;
    let errorPageStream : string = TemplateHandler.getTemplate("EEPWC");
    let generalFrontMessage: string = "Please contact administrator of theis page";
    errorPageStream = errorPageStream.replace("{message}", generalFrontMessage);

    if(encodedEmail === null || encodedEmail === undefined || encodedEmail.length === 0)
     {
       code = ResponseCodes.BAD_REQUEST;
       message = this.messageSource.getMessage(code).concat(": No email address specified! ");
       this.logger.info(UserService.getLogMessage(requestUrl, message));
       return errorPageStream;
     }

     const emailAddress: string = Buffer.from(encodedEmail, 'base64').toString('utf8');
     dbResult = await this.userRepository.findUserByEmail(emailAddress);
      if(!dbResult.status) {
        return  errorPageStream;
      }
      const potentialUser: User = dbResult.entity as User;
      if(!potentialUser)
      {
        code = ResponseCodes.RECORD_NOT_EXIST;
        message = this.messageSource.getMessage(code);
        this.logger.info(UserService.getLogMessage(requestUrl, message));
        return errorPageStream;
      }

      // Get the email content as a string stream.
      let htmlContent: string = TemplateHandler.getTemplate("EPWCPage");
      const baseUrl: string = environment.getProperty("birds.baseUrl");
      htmlContent = htmlContent.replaceAll("{base-url}", baseUrl);
      return htmlContent;
  }

  async updateUserPassword(requestUrl: string, requestDTO: UpdatePasswordRequestDTO): Promise<ResponseDTO> {
      let code = ResponseCodes.SYSTEM_ERROR;
      let message = this.messageSource.getMessage(code);
      let dbResult: DBOperationResult;

      // User is already verified before now through OTP.
      dbResult = await this.userRepository.findUserByEmail(requestDTO.emailAddress);
      if(!dbResult.status){
        this.logger.info(UserService.getLogMessage(requestUrl, message, dbResult.errorMessage));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      const potentialUser: User = dbResult.entity as User;
      if(potentialUser === null){
        code = ResponseCodes.RECORD_NOT_EXIST;
        message = this.messageSource.getMessage(code);
        this.logger.info(UserService.getLogMessage(requestUrl, message));
        return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      if(PasswordUtil.match(requestDTO.newPassword, potentialUser.password)){
         code = ResponseCodes.BAD_REQUEST;
         message = this.messageSource.getMessage(code).concat(": Old password cannot be same as new password!");
         this.logger.info(UserService.getLogMessage(requestUrl, message));
         return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      const newHashedPassword: string = PasswordUtil.hash(requestDTO.newPassword.trim());
      dbResult = await this.userRepository.updateUser(potentialUser, { password: newHashedPassword });
      if(!dbResult.status){
         this.logger.info(UserService.getLogMessage(requestUrl, message));
         return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      code = ResponseCodes.SUCCESS;
      message = this.messageSource.getMessage(code);
      const data: UpdatePasswordResponseData = new UpdatePasswordResponseData();
      data.newPassword = requestDTO.newPassword;
      data.dateUpdated = new Date();
      const responseDTO: ResponseDTO = new ResponseDTO();
      responseDTO.responseCode = code;
      responseDTO.responseMessage = message;
      responseDTO.responseData = data;
      return responseDTO;
  }


  private getCreatorAndModifierBySigner = (signer: string): string => {
      let result: string = Performer.SYSTEM;
      switch (signer){
        case OauthChannels.GOOGLE : { result = Performer.OAUTH_PROVIDER_GOOGLE; break; }
        case OauthChannels.FACEBOOK: { result = Performer.OAUTH_PROVIDER_FACEBOOK; break; }
        case OauthChannels.APPLE: { result = Performer.OAUTH_PROVIDER_FACEBOOK; break; };
      }
      return result;
  }

  private validateSignerAndLogger = (signer: string): boolean => {
     return [
              OauthChannels.LOCAL_DOMAIN as string,
              OauthChannels.GOOGLE as string,
              OauthChannels.FACEBOOK as string,
              OauthChannels.APPLE as string
     ].includes(signer);
  }

}

