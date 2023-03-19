/* eslint-disable*/
import { ICourseService } from "./ICourseService";
import CreateUserPreferenceRequestDTO from "../dto/request/CreateUserPreferenceRequestDTO";
import ResponseDTO from "../../../config/ResponseDTO";
import { Injectable } from "@nestjs/common";
import ResponseCodes from "../../../const/ResponseCodes";
import UserSQLRepository from "../../user/repository/UserSQLRepository";
import UserPreferenceSQLRepository from "../repository/UserPreferenceSQLRepository";
import MessageSource from "../../../config/MessageSource";
import { DBOperationResult } from "../../user/interfaces/UserModuleInterfaces";
import User from "../../user/model/User";
import LoggerFactory from "../../../config/LoggerFactory";
import { UserStatus } from "../../user/constants/UserStatus";
import { RequestChannels } from "../../../const/RequestChannels";
import BlUserPreference from "../model/BlUserPreference";
import JwtTokenUtil from "../../../security/JwtTokenUtil";
import { CourseCategoryData } from "../dto/response/CourseCategoryListResponseDTO";
import BravoCourseCategory from "../model/BravoCourseCategory";
import CourseCategorySQLRepository from "../repository/CourseCategorySQLRepository";
import { CompactCourseGraphResponseData, CourseGraphResponseData } from "../dto/response/CourseGraphResponse";

@Injectable()
export default class CourseService implements ICourseService
{

    logger: LoggerFactory = LoggerFactory.createLogger(CourseService.name);

    constructor(
      private readonly userRepository: UserSQLRepository,
      private readonly userPreferenceRepository: UserPreferenceSQLRepository,
      private readonly courseCategoryRepository: CourseCategorySQLRepository,
      private readonly messageSource: MessageSource
    ) {}

    async saveOrUpdateUserPreferences(requestUrl: string, token: string, requestDTO: CreateUserPreferenceRequestDTO): Promise<ResponseDTO> {
       let code: string = ResponseCodes.SYSTEM_ERROR;
       let message: string = this.messageSource.getMessage(code);
       let dbResult: DBOperationResult;
       let response: ResponseDTO = new ResponseDTO();

       const userEmail: string = JwtTokenUtil.getEmailFromToken(token);
       dbResult = await this.userRepository.findUserByEmail(userEmail);
       if(!dbResult.status){
         this.logger.error(CourseService.getLogMessage(requestUrl, message, dbResult.errorMessage));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
       }

       // Check that the user exist in system.
       const potentialUser: User = dbResult.entity as User;
       if(potentialUser === null || potentialUser === undefined){
          code = ResponseCodes.RECORD_NOT_EXIST;
          message = this.messageSource.getMessage(code);
          this.logger.info(CourseService.getLogMessage(requestUrl, message));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
       }

       // Check that the user profile is not locked.
       if(potentialUser.status === UserStatus.LOCKED){
          code = ResponseCodes.ACCOUNT_LOCKED;
          message = this.messageSource.getMessage(code);
          this.logger.info(CourseService.getLogMessage(requestUrl, message));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
       }

       // Check that deviceId is passed in the request for a mobile channel.
      if(requestDTO.channel === RequestChannels.MOBILE){
         if(requestDTO.deviceId === null || requestDTO.deviceId === undefined || requestDTO.deviceId.length === 0){
            code = ResponseCodes.INVALID_DEVICE_ID;
            message = this.messageSource.getMessage(code);
            this.logger.info(CourseService.getLogMessage(requestUrl, message));
            return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
         }
      }

      // Check that the client is permitted to make this request.
      const emailInAuth: string = JwtTokenUtil.getEmailFromToken(token);
      if(emailInAuth !== userEmail){
        code = ResponseCodes.FORBIDDEN_CROSS_TOKEN_USAGE;
        message = this.messageSource.getMessage(code);
        this.logger.info(CourseService.getLogMessage(requestUrl, message));
        return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      // Check if the user preference already exist
        let potentialPreference: BlUserPreference;
        dbResult = await this.userPreferenceRepository.fetchUserPreferencesByEmail(userEmail);
        if(!dbResult.status){
          this.logger.error(CourseService.getLogMessage(requestUrl, message, dbResult.errorMessage));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
        }

        potentialPreference = dbResult.entity as BlUserPreference;
        const userPreference: BlUserPreference = new BlUserPreference();

        if(potentialPreference === null){
          userPreference.userEmail = userEmail;
          userPreference.userId = potentialUser.userId;
          userPreference.createdDate = new Date();
          userPreference.updatedDate = new Date();
          userPreference.preferenceNames = requestDTO.preferenceList;
          potentialPreference = userPreference;
        }else{
           potentialPreference.updatedDate = new Date();
           potentialPreference.preferenceNames = requestDTO.preferenceList;
        }

        // Try to save or update the new user preference.
        dbResult = await this.userPreferenceRepository.saveOrUpdateUserPreferences(potentialPreference);

        if(!dbResult.status){
           this.logger.error(CourseService.getLogMessage(requestUrl, message, dbResult.errorMessage));
           return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
        }

        code = ResponseCodes.SUCCESS;
        message = this.messageSource.getMessage(code);
        response.responseCode = code;
        response.responseMessage = message;
        response.responseData = dbResult.entity;
        return Promise.resolve(response);
    }

    async fetchUserPreferences(requestUrl: string, token: string): Promise<ResponseDTO> {
       let code: string = ResponseCodes.SYSTEM_ERROR;
       let message: string = this.messageSource.getMessage(code);
       let response: ResponseDTO = new ResponseDTO();
       let dbResult: DBOperationResult;

       const userEmail: string = JwtTokenUtil.getEmailFromToken(token);
      // Check that the user exist
       dbResult = await this.userRepository.findUserByEmail(userEmail);
       if(!dbResult.status){
          this.logger.error(CourseService.getLogMessage(requestUrl, message));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
       }

       const potentialUser: User = dbResult.entity as User;
       if(potentialUser === null || potentialUser === undefined){
          code = ResponseCodes.RECORD_NOT_EXIST;
          message = this.messageSource.getMessage(code);
          this.logger.info(CourseService.getLogMessage(requestUrl, message));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
       }

      // Check that the client is permitted to make this request.
      const emailInAuth: string = JwtTokenUtil.getEmailFromToken(token);
      if(emailInAuth !== userEmail){
        code = ResponseCodes.FORBIDDEN_CROSS_TOKEN_USAGE;
        message = this.messageSource.getMessage(code);
        this.logger.info(CourseService.getLogMessage(requestUrl, message));
        return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      // Fetch the user preferences.
       dbResult = await this.userPreferenceRepository.fetchUserPreferencesByEmail(userEmail);
       if(!dbResult.status){
          this.logger.error(CourseService.getLogMessage(requestUrl, message, dbResult.errorMessage));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
       }

       const potentialPreference: BlUserPreference = dbResult.entity as BlUserPreference;
       if(potentialPreference === null){
          code = ResponseCodes.NO_USER_PREFERENCE_FOUND;
          message = this.messageSource.getMessage(code);
          this.logger.info(CourseService.getLogMessage(requestUrl, message));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
       }

       code = ResponseCodes.SUCCESS;
       message = this.messageSource.getMessage(code);
       response.responseCode = code;
       response.responseMessage = message;
       response.responseData = potentialPreference;
       return Promise.resolve(response);
    }

  async getAllCourseCategories(requestUrl: string): Promise<ResponseDTO>{
    let code: string = ResponseCodes.SYSTEM_ERROR;
    let message: string = this.messageSource.getMessage(code);

    let dbResult: DBOperationResult;
    dbResult = await this.courseCategoryRepository.fetchAllCourseCategories();
    if(!dbResult.status){
      this.logger.error(CourseService.getLogMessage(requestUrl, message, dbResult.errorMessage));
      return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
    }

    const dataArray: Array<CourseCategoryData> = [];
    const allCourses: Array<BravoCourseCategory> = dbResult.entity as Array<BravoCourseCategory>;
    allCourses.forEach((course: BravoCourseCategory) => {
      const data: CourseCategoryData = new CourseCategoryData();
      data.name = course.name;
      data.updatedAt = course.updatedAt;
      data.status = course.status;
      data.content = course.content;
      data.imageId = course.imageId;
      data.language = course.lang;
      data.slug = course.slug;
      dataArray.push(data);
    });

    return ResponseDTO.builder()
      .responseCode(ResponseCodes.SUCCESS)
      .responseMessage(this.messageSource.getMessage(ResponseCodes.SUCCESS))
      .responseData(dataArray)
      .build();
  }

    async getAllCourseCategoriesGraph(requestUrl: string, token: string): Promise<ResponseDTO>{
        let code: string = ResponseCodes.SYSTEM_ERROR;
        let message: string = this.messageSource.getMessage(code);
        let dbResult: DBOperationResult;

        // Check first that the user exists
        const email: string = JwtTokenUtil.getEmailFromToken(token);
        dbResult = await this.userRepository.findUserByEmail(email);
        if(!dbResult.status){
          this.logger.error(CourseService.getLogMessage(requestUrl, message, dbResult.errorMessage));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
        }

        const potentialUser: User = dbResult.entity as User;
        if(potentialUser === null){
          code = ResponseCodes.RECORD_NOT_EXIST;
          message = this.messageSource.getMessage(code);
          this.logger.info(CourseService.getLogMessage(requestUrl, message));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
        }

        dbResult = await this.courseCategoryRepository.fetchAllCourseCategoriesNestedGraph();
        if(!dbResult.status){
          this.logger.error(CourseService.getLogMessage(requestUrl, message, dbResult.errorMessage));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
        }

        const allCourseGraph: Array<BravoCourseCategory> = dbResult.entity as Array<BravoCourseCategory>;
        const data: CourseGraphResponseData = new CourseGraphResponseData();
        data.categories = allCourseGraph;
        return ResponseDTO.builder()
          .responseCode(ResponseCodes.SUCCESS)
          .responseMessage(this.messageSource.getMessage(ResponseCodes.SUCCESS))
          .responseData(data)
          .build();
    }

    async getAllCourseCategoriesGraphByPreference(requestUrl: string, token: string, limit?: number): Promise<ResponseDTO>{
      let code: string = ResponseCodes.SYSTEM_ERROR;
      let message: string = this.messageSource.getMessage(code);
      let dbResult: DBOperationResult;

      // Check first that the user exists
      const email: string = JwtTokenUtil.getEmailFromToken(token);
      dbResult = await this.userRepository.findUserByEmail(email);
      if(!dbResult.status){
        this.logger.error(CourseService.getLogMessage(requestUrl, message, dbResult.errorMessage));
        return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      const potentialUser: User = dbResult.entity as User;
      if(potentialUser === null){
        code = ResponseCodes.RECORD_NOT_EXIST;
        message = this.messageSource.getMessage(code);
        this.logger.info(CourseService.getLogMessage(requestUrl, message));
        return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      let preferenceNames: Array<string> = []
      const preference: BlUserPreference = (await this.userPreferenceRepository.fetchUserPreferencesByEmail(email)).entity as BlUserPreference;
      if(preference !== null)
        preferenceNames = preference.preferenceNames;

      dbResult = await this.courseCategoryRepository.fetchAllCourseCategoriesNestedGraphByPreferenceNames(preferenceNames, limit);
      if(!dbResult.status){
        this.logger.error(CourseService.getLogMessage(requestUrl, message, dbResult.errorMessage));
        return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      const allCourseGraph: Array<BravoCourseCategory> = dbResult.entity as Array<BravoCourseCategory>;
      const data: CourseGraphResponseData = new CourseGraphResponseData();
      data.categories = allCourseGraph;
      return ResponseDTO.builder()
        .responseCode(ResponseCodes.SUCCESS)
        .responseMessage(this.messageSource.getMessage(ResponseCodes.SUCCESS))
        .responseData(data)
        .build();
    }

  async getAllTrendingCourseCategoriesGraph(requestUrl: string, token: string, limit?: number): Promise<ResponseDTO>{
    let code: string = ResponseCodes.SYSTEM_ERROR;
    let message: string = this.messageSource.getMessage(code);
    let dbResult: DBOperationResult;

    // Check first that the user exists
    const email: string = JwtTokenUtil.getEmailFromToken(token);
    dbResult = await this.userRepository.findUserByEmail(email);
    if(!dbResult.status){
      this.logger.error(CourseService.getLogMessage(requestUrl, message, dbResult.errorMessage));
      return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
    }

    const potentialUser: User = dbResult.entity as User;
    if(potentialUser === null){
      code = ResponseCodes.RECORD_NOT_EXIST;
      message = this.messageSource.getMessage(code);
      this.logger.info(CourseService.getLogMessage(requestUrl, message));
      return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
    }

    dbResult = await this.courseCategoryRepository.fetchTrendingCategoriesNested(limit);
    if(!dbResult.status){
      this.logger.error(CourseService.getLogMessage(requestUrl, message, dbResult.errorMessage));
      return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
    }

    const allCourseGraph: Array<BravoCourseCategory> = dbResult.entity as Array<BravoCourseCategory>;
    const data: CourseGraphResponseData = new CourseGraphResponseData();
    data.categories = allCourseGraph;
    return ResponseDTO.builder()
      .responseCode(ResponseCodes.SUCCESS)
      .responseMessage(this.messageSource.getMessage(ResponseCodes.SUCCESS))
      .responseData(data)
      .build();
  }
    async getQuickCourseCategoriesGraph(requestUrl: string, token: string, size?: number):Promise<ResponseDTO>{
        let code: string = ResponseCodes.SYSTEM_ERROR;
        let message: string = this.messageSource.getMessage(code);
        let dbResult: DBOperationResult;

        // Check first that the user exists
        const email: string = JwtTokenUtil.getEmailFromToken(token);
        dbResult = await this.userRepository.findUserByEmail(email);
        if(!dbResult.status){
          this.logger.error(CourseService.getLogMessage(requestUrl, message, dbResult.errorMessage));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
        }

        const potentialUser: User = dbResult.entity as User;
        if(potentialUser === null){
          code = ResponseCodes.RECORD_NOT_EXIST;
          message = this.messageSource.getMessage(code);
          this.logger.info(CourseService.getLogMessage(requestUrl, message));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
        }

        dbResult = await this.courseCategoryRepository.fetchAllQuickCourseNestedCategories(size);
        if(!dbResult.status){
           this.logger.error(CourseService.getLogMessage(requestUrl, message, dbResult.errorMessage));
           return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
        }

      const quickCourseGraph: Array<BravoCourseCategory> = dbResult.entity as Array<BravoCourseCategory>;
      const data: CourseGraphResponseData = new CourseGraphResponseData();
      data.categories = quickCourseGraph;
      return ResponseDTO.builder()
        .responseCode(ResponseCodes.SUCCESS)
        .responseMessage(this.messageSource.getMessage(ResponseCodes.SUCCESS))
        .responseData(data)
        .build();
    }

    async getCompactNestedCourseGraphCategories(requestUrl: string, token: string, limits?: { trendingLimit?: number, preferenceLimit?: number, quickLimit?: number }): Promise<ResponseDTO>{
        let code: string = ResponseCodes.SYSTEM_ERROR;
        let message: string = this.messageSource.getMessage(code);
        let dbResult: DBOperationResult;

        // Check first that the user exists
        const email: string = JwtTokenUtil.getEmailFromToken(token);
        dbResult = await this.userRepository.findUserByEmail(email);
        if(!dbResult.status){
          this.logger.error(CourseService.getLogMessage(requestUrl, message, dbResult.errorMessage));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
        }

        const potentialUser: User = dbResult.entity as User;
        if(potentialUser === null){
          code = ResponseCodes.RECORD_NOT_EXIST;
          message = this.messageSource.getMessage(code);
          this.logger.info(CourseService.getLogMessage(requestUrl, message));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
        }

      let preferenceNames: Array<string> = []
      const preference: BlUserPreference = (await this.userPreferenceRepository.fetchUserPreferencesByEmail(email)).entity as BlUserPreference;
      if(preference !== null)
        preferenceNames = preference.preferenceNames;

      const trendingCategories: Array<BravoCourseCategory> = (await this.courseCategoryRepository.fetchTrendingCategoriesNested(limits.trendingLimit)).entity as Array<BravoCourseCategory>;
      const preferentialCategories: Array<BravoCourseCategory> = (await this.courseCategoryRepository.fetchAllCourseCategoriesNestedGraphByPreferenceNames(preferenceNames, limits.preferenceLimit)).entity as Array<BravoCourseCategory>;
      const quickCategories: Array<BravoCourseCategory> = (await this.courseCategoryRepository.fetchAllQuickCourseNestedCategories(limits.quickLimit)).entity as Array<BravoCourseCategory>;

      const data: CompactCourseGraphResponseData = new CompactCourseGraphResponseData();
      data.trendingCategories = trendingCategories;
      data.preferentialCategories = preferentialCategories;
      data.quickCategories = quickCategories;
      return ResponseDTO.builder()
        .responseCode(ResponseCodes.SUCCESS)
        .responseMessage(this.messageSource.getMessage(ResponseCodes.SUCCESS))
        .responseData(data)
        .build();

    }

    private static getLogMessage(...messages: Array<string>): string {
       return messages.join(" ");
    }

}