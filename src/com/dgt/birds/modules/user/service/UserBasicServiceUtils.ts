/* eslint-disable */
import { Injectable } from "@nestjs/common";
import UserSQLRepository from "../repository/UserSQLRepository";
import ApplicationPropertyConfig from "../../../config/ApplicationPropertyConfig";
import MessageSource from "../../../config/MessageSource";
import ResponseCodes from "../../../const/ResponseCodes";
import GenericConstants from "../../../const/GenericConstants";
import User from "../model/User";
import LoggerFactory from "../../../config/LoggerFactory";
import UserService from "./UserService";
import ResponseDTO from "../../../config/ResponseDTO";
import { DBOperationResult } from "../interfaces/UserModuleInterfaces";
import { UserStatus } from "../constants/UserStatus";
import { UserRoles } from "../constants/UserRoles";
import UpdateUserDetailsRequestDTO from "../dto/request/UpdateUserDetailsRequestDTO";
import JwtTokenUtil from "../../../security/JwtTokenUtil";
import BlUserPreference from "../../course/model/BlUserPreference";
import { UpdateUserResponseData } from "../dto/response/UpdateUserResponseDTO";
import UserPreferenceSQLRepository from "../../course/repository/UserPreferenceSQLRepository";
import { Performer } from "../../../const/Performer";
import UpdateUserPasswordRequestDTO from "../dto/request/UpdateUserPasswordRequestDTO";
import PasswordUtil from "../../../security/PasswordUtil";
import { UpdateUserPasswordResponseData } from "../dto/response/UpdateUserPasswordResponseDTO";
import BlPaymentCard from "../../payment/model/BlPaymentCard";
import PaymentSQLRepository from "../../payment/repository/PaymentSQLRepository";
import { OauthChannels } from "../../../const/OauthChannels";
import FtpService from "../../ftp/service/FtpService";

const env = ApplicationPropertyConfig;

@Injectable()
export default class UserBasicServiceUtils{

   logger: LoggerFactory = LoggerFactory.createLogger(UserBasicServiceUtils.name);

   constructor(
     private readonly userRepository: UserSQLRepository,
     private readonly userPreferenceRepository: UserPreferenceSQLRepository,
     private readonly paymentRepository: PaymentSQLRepository,
     private readonly ftpService: FtpService,
     private readonly messageSource: MessageSource
   )
   {}

   async fetchAllUserDetails(requestUrl: string, queryParams: UserDetailsQueryParams): Promise<ResponseDTO>{
      let code: string = ResponseCodes.SYSTEM_ERROR;
      let message: string = this.messageSource.getMessage(code);

      // Find those users that matches those queries.
      if(!queryParams.status)
         queryParams.status = UserStatus.ACTIVE;
      if(!queryParams.roles || queryParams.roles.length === 0)
         queryParams.roles = [UserRoles.STUDENT, UserRoles.INSTRUCTOR, UserRoles.ADMIN, UserRoles.CUSTOMER].join(GenericConstants.SINGLE_SPACE);

      const queryRoles: Array<string> = this.getRolesFromQueryParams(queryParams.roles);
      let userDetailsArray: Array<User> = undefined;
      try{
         userDetailsArray = (await this.userRepository.find({
            where: { status: queryParams.status }
         }))
           .filter((user: User) => user.userRoles.includes(queryRoles[0]));
      }catch (error){
         this.logger.info(UserService.getLogMessage(requestUrl, message, error));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      code = ResponseCodes.SUCCESS;
      message = this.messageSource.getMessage(ResponseCodes.SUCCESS);
      this.logger.info(UserService.getLogMessage(requestUrl, message));
      return ResponseDTO.builder()
        .responseCode(code)
        .responseMessage(message)
        .responseData(userDetailsArray).build();
   }

   async fetchSingleUser(requestUrl: string, userEmail: string): Promise<ResponseDTO> {
       let code: string = ResponseCodes.SYSTEM_ERROR;
       let message: string = this.messageSource.getMessage(code);
       let dbResult: DBOperationResult;

       // First confirm that the email is supplied in the query parameter.
      if(userEmail === null || userEmail === undefined || userEmail.length === 0){
         code = ResponseCodes.BAD_REQUEST;
         message = [this.messageSource.getMessage(code), "No email address specified!"].join(" => ");
         return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

       dbResult = await this.userRepository.findUserByEmail(userEmail);
      if(!dbResult.status){
         this.logger.error(UserService.getLogMessage(requestUrl, message, dbResult.errorMessage));
         return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      code = ResponseCodes.SUCCESS;
      message = this.messageSource.getMessage(code);
      this.logger.info(UserService.getLogMessage(requestUrl, message));
      const data = dbResult.entity;
      return ResponseDTO.builder()
        .responseCode(code)
        .responseMessage(message)
        .responseData(data)
        .build();
   }

   async updateUserDetails(requestUrl: string, token: string, requestDTO: UpdateUserDetailsRequestDTO): Promise<ResponseDTO> {
      let code = ResponseCodes.SYSTEM_ERROR;
      let message = this.messageSource.getMessage(code);
      let dbResult: DBOperationResult;
      let response: ResponseDTO = new ResponseDTO();

      // First confirm that the user exist in the system.
      const originalEmail: string = JwtTokenUtil.getEmailFromToken(token);
      dbResult = await this.userRepository.findUserByEmail(originalEmail);
      if(!dbResult.status){
         this.logger.error(UserService.getLogMessage(requestUrl, message, dbResult.errorMessage));
         return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }
      const potentialUser: User = dbResult.entity as User;
      if(potentialUser === null){
         code = ResponseCodes.RECORD_NOT_EXIST;
         message = this.messageSource.getMessage(code).concat(" from token!");
         this.logger.info(UserService.getLogMessage(requestUrl, message));
         return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      // Ensure that Oauth guys should not be allowed to edit profile as it is managed by oauth.
      if(potentialUser.oauth2Channel !== OauthChannels.LOCAL_DOMAIN){
         code = ResponseCodes.FORBIDDEN_OAUTH2_CHANNEL;
         message = this.messageSource.getMessage(code);
         this.logger.info(UserService.getLogMessage(requestUrl, message));
         return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      // Next confirm that the person is not trying to edit someone's else profile
      const potentialAnotherUser: User = (await this.userRepository.findUserByEmail(requestDTO.emailAddress)).entity as User;
      if(potentialAnotherUser !== null){
         if(originalEmail !== requestDTO.emailAddress){
            code = ResponseCodes.FORBIDDEN_EMAIL_MISMATCH;
            message = this.messageSource.getMessage(code);
            this.logger.info(UserService.getLogMessage(requestUrl, message));
            return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
         }
      }

      // Split up the full name into different parts and update the name.
      if(requestDTO.fullName !== null &&  requestDTO.fullName && requestDTO.fullName.length !== 0){
         const names: Array<string> = requestDTO.fullName.split(GenericConstants.SINGLE_SPACE)
           .filter((name: string) => name !== GenericConstants.EMPTY_STRING)
           .filter((name: string) => name !== GenericConstants.SINGLE_SPACE);
         if(names.length === 2){
            potentialUser.firstName = names[0];
            potentialUser.lastName = names[1];
         }
         else if(names.length === 3){
            potentialUser.firstName = names[0];
            potentialUser.middleName = names[1];
            potentialUser.lastName = names[2];
         }
      }

      // Check and update the email
      if(requestDTO.emailAddress !== null && requestDTO.emailAddress !== undefined && requestDTO.emailAddress.length !== 0){
         potentialUser.emailAddress = requestDTO.emailAddress;
         potentialUser.emailAddress = requestDTO.emailAddress;
      }

      // Check and update the phone number
      if(requestDTO.mobileNumber !== null && requestDTO.mobileNumber !== undefined && requestDTO.mobileNumber.length !== 0){
         potentialUser.mobileNumber = requestDTO.mobileNumber;
      }

      // Check and update the gender
      if(requestDTO.gender !== null && requestDTO.gender !== undefined && requestDTO.gender.length !== 0){
         potentialUser.gender = requestDTO.gender;
      }

      // Check and update the photo link
      if(requestDTO.photoLink !== null && requestDTO.photoLink !== undefined && requestDTO.photoLink.length !== 0){
         // Save or Update the profile image from the Base64 data.
         const imageBase64: string = requestDTO.photoLink;
         potentialUser.photoLink = await this.ftpService.saveOrUpdateProfilePicture(imageBase64, potentialUser);
      }

      potentialUser.updatedAt = new Date();
      potentialUser.modifiedBy = Performer.USER;

      const userPartial: object = JSON.parse(JSON.stringify(potentialUser));
      delete Object(userPartial).userAuth;
      const userAuthPartial: object = JSON.parse(JSON.stringify(potentialUser));

      const newUser: User = new User();
      newUser.emailAddress = originalEmail;
      dbResult = await this.userRepository.updateUserAndAuth(userPartial, userAuthPartial, newUser);
      if(!dbResult.status){
         this.logger.error(UserService.getLogMessage(requestUrl, message, dbResult.errorMessage));
         return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      // Update the user preference
      const userPreference: BlUserPreference = (await this.userPreferenceRepository.fetchUserPreferencesByEmail(originalEmail)).entity as BlUserPreference;
      const partial: object = { userEmail: requestDTO.emailAddress };

      if(userPreference !== null && userPreference !== undefined){
         await this.userPreferenceRepository.updateUserPreferencePartially(userPreference, partial);
      }

      // Update the user card
      const userCards: Array<BlPaymentCard> = (await this.paymentRepository.findAllCardByUserEmail(originalEmail)).entity as Array<BlPaymentCard>;
      for(let i = 0; i <userCards.length; i++){
         const userCard: BlPaymentCard = userCards[i];
         const partial: object = { userEmail: potentialUser.emailAddress, updatedAt: new Date() };
         await this.paymentRepository.updateCard(userCard, partial);
      }

      const data: UpdateUserResponseData = new UpdateUserResponseData();
      data.newEmail = potentialUser.emailAddress;
      data.newFirstName = potentialUser.firstName;
      data.newMiddleName = potentialUser.middleName;
      data.newLastName = potentialUser.lastName;
      data.newMobileNumber = potentialUser.mobileNumber;
      data.newPhotoLink = potentialUser.photoLink;
      data.updatedAt = potentialUser.updatedAt;
      data.updatedBy = potentialUser.modifiedBy;

      response.responseCode = ResponseCodes.SUCCESS;
      response.responseMessage = this.messageSource.getMessage(ResponseCodes.SUCCESS);
      response.responseData = data;
      return Promise.resolve(response);
   }

   async updateUserPassword(requestUrl: string, token: string, requestDTO: UpdateUserPasswordRequestDTO): Promise<ResponseDTO> {
      let code = ResponseCodes.SYSTEM_ERROR;
      let message = this.messageSource.getMessage(code);
      let dbResult: DBOperationResult;
      let response: ResponseDTO = new ResponseDTO();

      // First check that the user is in our system
      const originalEmail: string = JwtTokenUtil.getEmailFromToken(token);
      dbResult = await this.userRepository.findUserByEmail(originalEmail);
      if(!dbResult.status){
         this.logger.error(UserService.getLogMessage(requestUrl, message, dbResult.errorMessage));
         return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      const potentialUser: User = dbResult.entity as User;
      if(potentialUser === null){
         code = ResponseCodes.RECORD_NOT_EXIST;
         message = this.messageSource.getMessage(code);
         return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      // Check that the old password matches the new password
      const isPasswordMatch: boolean = PasswordUtil.match(requestDTO.oldPassword, potentialUser.password);
      if(!isPasswordMatch){
         code = ResponseCodes.INVALID_PASSWORD;
         message = this.messageSource.getMessage(code);
         this.logger.info(UserService.getLogMessage(requestUrl, message));
         return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      // Update the password
       const userPartial: object = { password: PasswordUtil.hash(requestDTO.newPassword), updatedAt: new Date(), modifiedBy: Performer.USER };
       await this.userRepository.updateUser(potentialUser, userPartial);

      code = ResponseCodes.SUCCESS;
      message = this.messageSource.getMessage(code);
      const data: UpdateUserPasswordResponseData = new UpdateUserPasswordResponseData();
      data.userEmail = potentialUser.emailAddress;
      data.userId = potentialUser.userId;
      data.updatedAt = potentialUser.updatedAt;
      response.responseCode = code;
      response.responseMessage = message;
      response.responseData = data;
      return Promise.resolve(response);
   }

   async logoutUser(requestUrl: string, token: string): Promise<ResponseDTO>{
       let code: string = ResponseCodes.SYSTEM_ERROR;
       let message: string = this.messageSource.getMessage(code);
       let dbResult: DBOperationResult;

       const email: string = JwtTokenUtil.getEmailFromToken(token);
       dbResult = await this.userRepository.findUserByEmail(email);
       if(!dbResult.status){
          this.logger.error(UserService.getLogMessage(requestUrl, message, dbResult.errorMessage));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
       }

       // Deactivate the rememberMe
      const potentialUser: User = dbResult.entity as User;
       if(potentialUser === null){
          code = ResponseCodes.RECORD_NOT_EXIST;
          message = this.messageSource.getMessage(code);
          this.logger.info(UserService.getLogMessage(requestUrl, message));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
       }

       const userAuthPartial: object = { rememberMeActive: false };
       await this.userRepository.updateUser(potentialUser, userAuthPartial);
       return ResponseDTO.builder()
         .responseCode(ResponseCodes.SUCCESS)
         .responseMessage(this.messageSource.getMessage(ResponseCodes.SUCCESS))
         .build();
   }

   private getRolesFromQueryParams(queryParamString: string): Array<string> {
      return queryParamString
        .split(GenericConstants.SINGLE_SPACE)
        .filter(value => value !== GenericConstants.SINGLE_SPACE)
        .filter(value => value !== GenericConstants.EMPTY_STRING);
   }


}

export interface UserDetailsQueryParams{
   status: string;
   roles: string;
}