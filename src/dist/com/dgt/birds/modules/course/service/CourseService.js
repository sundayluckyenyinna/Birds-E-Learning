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
var CourseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseDTO_1 = require("../../../config/ResponseDTO");
const common_1 = require("@nestjs/common");
const ResponseCodes_1 = require("../../../const/ResponseCodes");
const UserSQLRepository_1 = require("../../user/repository/UserSQLRepository");
const UserPreferenceSQLRepository_1 = require("../repository/UserPreferenceSQLRepository");
const MessageSource_1 = require("../../../config/MessageSource");
const LoggerFactory_1 = require("../../../config/LoggerFactory");
const UserStatus_1 = require("../../user/constants/UserStatus");
const RequestChannels_1 = require("../../../const/RequestChannels");
const BlUserPreference_1 = require("../model/BlUserPreference");
const JwtTokenUtil_1 = require("../../../security/JwtTokenUtil");
const CourseCategoryListResponseDTO_1 = require("../dto/response/CourseCategoryListResponseDTO");
const CourseCategorySQLRepository_1 = require("../repository/CourseCategorySQLRepository");
const CourseGraphResponse_1 = require("../dto/response/CourseGraphResponse");
let CourseService = CourseService_1 = class CourseService {
    constructor(userRepository, userPreferenceRepository, courseCategoryRepository, messageSource) {
        this.userRepository = userRepository;
        this.userPreferenceRepository = userPreferenceRepository;
        this.courseCategoryRepository = courseCategoryRepository;
        this.messageSource = messageSource;
        this.logger = LoggerFactory_1.default.createLogger(CourseService_1.name);
    }
    async saveOrUpdateUserPreferences(requestUrl, token, requestDTO) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let dbResult;
        let response = new ResponseDTO_1.default();
        const userEmail = JwtTokenUtil_1.default.getEmailFromToken(token);
        dbResult = await this.userRepository.findUserByEmail(userEmail);
        if (!dbResult.status) {
            this.logger.error(CourseService_1.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const potentialUser = dbResult.entity;
        if (potentialUser === null || potentialUser === undefined) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            this.logger.info(CourseService_1.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        if (potentialUser.status === UserStatus_1.UserStatus.LOCKED) {
            code = ResponseCodes_1.default.ACCOUNT_LOCKED;
            message = this.messageSource.getMessage(code);
            this.logger.info(CourseService_1.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        if (requestDTO.channel === RequestChannels_1.RequestChannels.MOBILE) {
            if (requestDTO.deviceId === null || requestDTO.deviceId === undefined || requestDTO.deviceId.length === 0) {
                code = ResponseCodes_1.default.INVALID_DEVICE_ID;
                message = this.messageSource.getMessage(code);
                this.logger.info(CourseService_1.getLogMessage(requestUrl, message));
                return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
            }
        }
        const emailInAuth = JwtTokenUtil_1.default.getEmailFromToken(token);
        if (emailInAuth !== userEmail) {
            code = ResponseCodes_1.default.FORBIDDEN_CROSS_TOKEN_USAGE;
            message = this.messageSource.getMessage(code);
            this.logger.info(CourseService_1.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        let potentialPreference;
        dbResult = await this.userPreferenceRepository.fetchUserPreferencesByEmail(userEmail);
        if (!dbResult.status) {
            this.logger.error(CourseService_1.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        potentialPreference = dbResult.entity;
        const userPreference = new BlUserPreference_1.default();
        if (potentialPreference === null) {
            userPreference.userEmail = userEmail;
            userPreference.userId = potentialUser.userId;
            userPreference.createdDate = new Date();
            userPreference.updatedDate = new Date();
            userPreference.preferenceNames = requestDTO.preferenceList;
            potentialPreference = userPreference;
        }
        else {
            potentialPreference.updatedDate = new Date();
            potentialPreference.preferenceNames = requestDTO.preferenceList;
        }
        dbResult = await this.userPreferenceRepository.saveOrUpdateUserPreferences(potentialPreference);
        if (!dbResult.status) {
            this.logger.error(CourseService_1.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        code = ResponseCodes_1.default.SUCCESS;
        message = this.messageSource.getMessage(code);
        response.responseCode = code;
        response.responseMessage = message;
        response.responseData = dbResult.entity;
        return Promise.resolve(response);
    }
    async fetchUserPreferences(requestUrl, token) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let response = new ResponseDTO_1.default();
        let dbResult;
        const userEmail = JwtTokenUtil_1.default.getEmailFromToken(token);
        dbResult = await this.userRepository.findUserByEmail(userEmail);
        if (!dbResult.status) {
            this.logger.error(CourseService_1.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const potentialUser = dbResult.entity;
        if (potentialUser === null || potentialUser === undefined) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            this.logger.info(CourseService_1.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const emailInAuth = JwtTokenUtil_1.default.getEmailFromToken(token);
        if (emailInAuth !== userEmail) {
            code = ResponseCodes_1.default.FORBIDDEN_CROSS_TOKEN_USAGE;
            message = this.messageSource.getMessage(code);
            this.logger.info(CourseService_1.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        dbResult = await this.userPreferenceRepository.fetchUserPreferencesByEmail(userEmail);
        if (!dbResult.status) {
            this.logger.error(CourseService_1.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const potentialPreference = dbResult.entity;
        if (potentialPreference === null) {
            code = ResponseCodes_1.default.NO_USER_PREFERENCE_FOUND;
            message = this.messageSource.getMessage(code);
            this.logger.info(CourseService_1.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        code = ResponseCodes_1.default.SUCCESS;
        message = this.messageSource.getMessage(code);
        response.responseCode = code;
        response.responseMessage = message;
        response.responseData = potentialPreference;
        return Promise.resolve(response);
    }
    async getAllCourseCategories(requestUrl) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let dbResult;
        dbResult = await this.courseCategoryRepository.fetchAllCourseCategories();
        if (!dbResult.status) {
            this.logger.error(CourseService_1.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const dataArray = [];
        const allCourses = dbResult.entity;
        allCourses.forEach((course) => {
            const data = new CourseCategoryListResponseDTO_1.CourseCategoryData();
            data.name = course.name;
            data.updatedAt = course.updatedAt;
            data.status = course.status;
            data.content = course.content;
            data.imageId = course.imageId;
            data.language = course.lang;
            data.slug = course.slug;
            dataArray.push(data);
        });
        return ResponseDTO_1.default.builder()
            .responseCode(ResponseCodes_1.default.SUCCESS)
            .responseMessage(this.messageSource.getMessage(ResponseCodes_1.default.SUCCESS))
            .responseData(dataArray)
            .build();
    }
    async getAllCourseCategoriesGraph(requestUrl, token) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let dbResult;
        const email = JwtTokenUtil_1.default.getEmailFromToken(token);
        dbResult = await this.userRepository.findUserByEmail(email);
        if (!dbResult.status) {
            this.logger.error(CourseService_1.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const potentialUser = dbResult.entity;
        if (potentialUser === null) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            this.logger.info(CourseService_1.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        dbResult = await this.courseCategoryRepository.fetchAllCourseCategoriesNestedGraph();
        if (!dbResult.status) {
            this.logger.error(CourseService_1.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const allCourseGraph = dbResult.entity;
        const data = new CourseGraphResponse_1.CourseGraphResponseData();
        data.categories = allCourseGraph;
        return ResponseDTO_1.default.builder()
            .responseCode(ResponseCodes_1.default.SUCCESS)
            .responseMessage(this.messageSource.getMessage(ResponseCodes_1.default.SUCCESS))
            .responseData(data)
            .build();
    }
    async getAllCourseCategoriesGraphByPreference(requestUrl, token, limit) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let dbResult;
        const email = JwtTokenUtil_1.default.getEmailFromToken(token);
        dbResult = await this.userRepository.findUserByEmail(email);
        if (!dbResult.status) {
            this.logger.error(CourseService_1.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const potentialUser = dbResult.entity;
        if (potentialUser === null) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            this.logger.info(CourseService_1.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        let preferenceNames = [];
        const preference = (await this.userPreferenceRepository.fetchUserPreferencesByEmail(email)).entity;
        if (preference !== null)
            preferenceNames = preference.preferenceNames;
        dbResult = await this.courseCategoryRepository.fetchAllCourseCategoriesNestedGraphByPreferenceNames(preferenceNames, limit);
        if (!dbResult.status) {
            this.logger.error(CourseService_1.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const allCourseGraph = dbResult.entity;
        const data = new CourseGraphResponse_1.CourseGraphResponseData();
        data.categories = allCourseGraph;
        return ResponseDTO_1.default.builder()
            .responseCode(ResponseCodes_1.default.SUCCESS)
            .responseMessage(this.messageSource.getMessage(ResponseCodes_1.default.SUCCESS))
            .responseData(data)
            .build();
    }
    async getAllTrendingCourseCategoriesGraph(requestUrl, token, limit) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let dbResult;
        const email = JwtTokenUtil_1.default.getEmailFromToken(token);
        dbResult = await this.userRepository.findUserByEmail(email);
        if (!dbResult.status) {
            this.logger.error(CourseService_1.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const potentialUser = dbResult.entity;
        if (potentialUser === null) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            this.logger.info(CourseService_1.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        dbResult = await this.courseCategoryRepository.fetchTrendingCategoriesNested(limit);
        if (!dbResult.status) {
            this.logger.error(CourseService_1.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const allCourseGraph = dbResult.entity;
        const data = new CourseGraphResponse_1.CourseGraphResponseData();
        data.categories = allCourseGraph;
        return ResponseDTO_1.default.builder()
            .responseCode(ResponseCodes_1.default.SUCCESS)
            .responseMessage(this.messageSource.getMessage(ResponseCodes_1.default.SUCCESS))
            .responseData(data)
            .build();
    }
    async getQuickCourseCategoriesGraph(requestUrl, token, size) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let dbResult;
        const email = JwtTokenUtil_1.default.getEmailFromToken(token);
        dbResult = await this.userRepository.findUserByEmail(email);
        if (!dbResult.status) {
            this.logger.error(CourseService_1.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const potentialUser = dbResult.entity;
        if (potentialUser === null) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            this.logger.info(CourseService_1.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        dbResult = await this.courseCategoryRepository.fetchAllQuickCourseNestedCategories(size);
        if (!dbResult.status) {
            this.logger.error(CourseService_1.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const quickCourseGraph = dbResult.entity;
        const data = new CourseGraphResponse_1.CourseGraphResponseData();
        data.categories = quickCourseGraph;
        return ResponseDTO_1.default.builder()
            .responseCode(ResponseCodes_1.default.SUCCESS)
            .responseMessage(this.messageSource.getMessage(ResponseCodes_1.default.SUCCESS))
            .responseData(data)
            .build();
    }
    async getCompactNestedCourseGraphCategories(requestUrl, token, limits) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let dbResult;
        const email = JwtTokenUtil_1.default.getEmailFromToken(token);
        dbResult = await this.userRepository.findUserByEmail(email);
        if (!dbResult.status) {
            this.logger.error(CourseService_1.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const potentialUser = dbResult.entity;
        if (potentialUser === null) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            this.logger.info(CourseService_1.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        let preferenceNames = [];
        const preference = (await this.userPreferenceRepository.fetchUserPreferencesByEmail(email)).entity;
        if (preference !== null)
            preferenceNames = preference.preferenceNames;
        const trendingCategories = (await this.courseCategoryRepository.fetchTrendingCategoriesNested(limits.trendingLimit)).entity;
        const preferentialCategories = (await this.courseCategoryRepository.fetchAllCourseCategoriesNestedGraphByPreferenceNames(preferenceNames, limits.preferenceLimit)).entity;
        const quickCategories = (await this.courseCategoryRepository.fetchAllQuickCourseNestedCategories(limits.quickLimit)).entity;
        const data = new CourseGraphResponse_1.CompactCourseGraphResponseData();
        data.trendingCategories = trendingCategories;
        data.preferentialCategories = preferentialCategories;
        data.quickCategories = quickCategories;
        return ResponseDTO_1.default.builder()
            .responseCode(ResponseCodes_1.default.SUCCESS)
            .responseMessage(this.messageSource.getMessage(ResponseCodes_1.default.SUCCESS))
            .responseData(data)
            .build();
    }
    static getLogMessage(...messages) {
        return messages.join(" ");
    }
};
CourseService = CourseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserSQLRepository_1.default,
        UserPreferenceSQLRepository_1.default,
        CourseCategorySQLRepository_1.default,
        MessageSource_1.default])
], CourseService);
exports.default = CourseService;
//# sourceMappingURL=CourseService.js.map