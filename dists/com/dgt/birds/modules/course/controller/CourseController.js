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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const CourseApiPaths_1 = require("../constant/CourseApiPaths");
const swagger_1 = require("@nestjs/swagger");
const SwaggerDocsSchema_1 = require("../../../api-schema/SwaggerDocsSchema");
const CreateUserPreferenceRequestDTO_1 = require("../dto/request/CreateUserPreferenceRequestDTO");
const CourseService_1 = require("../service/CourseService");
const ResponseDispatcher_1 = require("../../../config/ResponseDispatcher");
const CourseServiceResponse_1 = require("../dto/response/CourseServiceResponse");
const GenericConstants_1 = require("../../../const/GenericConstants");
const CourseCategoryListResponseDTO_1 = require("../dto/response/CourseCategoryListResponseDTO");
const CourseGraphResponse_1 = require("../dto/response/CourseGraphResponse");
let CourseController = class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
        this.getAuthHeader = (request) => {
            const authHeader = request.get("Authorization") || GenericConstants_1.default.EMPTY_STRING;
            const authToken = authHeader.replace("Bearer ", GenericConstants_1.default.EMPTY_STRING);
            return authToken.trim();
        };
    }
    async handleSaveOrUpdateUserPreference(req, res, requestDTO) {
        const authToken = this.getAuthHeader(req);
        const serviceResponse = await this.courseService.saveOrUpdateUserPreferences(req.url, authToken, requestDTO);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleGetUserCoursePreference(req, res) {
        const authToken = this.getAuthHeader(req);
        const serviceResponse = await this.courseService.fetchUserPreferences(req.url, authToken);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleGetAllCoursePreferenceCategories(req, res) {
        const serviceResponse = await this.courseService.getAllCourseCategories(req.url);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleAllCoursesCategoryGraph(req, res) {
        const token = this.getAuthHeader(req);
        const serviceResponse = await this.courseService.getAllCourseCategoriesGraph(req.url, token);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleAllCourseCategoriesByPreference(req, res, limit) {
        const token = this.getAuthHeader(req);
        const serviceResponse = await this.courseService.getAllCourseCategoriesGraphByPreference(req.url, token, Number(limit));
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleGetAllTrendingCourseCategories(req, res, limit) {
        const token = this.getAuthHeader(req);
        const serviceResponse = await this.courseService.getAllTrendingCourseCategoriesGraph(req.url, token, Number(limit));
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleGetAllQuickCourseCategories(req, res, limit) {
        const token = this.getAuthHeader(req);
        const serviceResponse = await this.courseService.getQuickCourseCategoriesGraph(req.url, token, Number(limit));
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleCompactCourseCategoriesByPreference(req, res) {
        const limits = {
            trendingLimit: Number(req.query["trendingLimit"]),
            preferenceLimit: Number(req.query["preferenceLimit"]),
            quickLimit: Number(req.query["quickLimit"])
        };
        const token = this.getAuthHeader(req);
        const serviceResponse = await this.courseService.getCompactNestedCourseGraphCategories(req.url, token, limits);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
};
__decorate([
    (0, common_1.Post)(CourseApiPaths_1.default.USER_PREFERENCE_SAVE_OR_UPDATE),
    (0, swagger_1.ApiOperation)({ description: `This API is a general API to save or update a particular interested user. 
    It should be noted that by definition, two preferences are the same for a user identified by his/her email if the
    two preference have exactly the same content of the preferenceNames array. Thus, if the request preferenceNames
    array is different from the one in the system for an existing user, the preference entity is updated to the current
     one of the request. However, if the user preference does not yet exist, a new entity is created and saved.` }),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: CourseServiceResponse_1.default }),
    (0, swagger_1.ApiCreatedResponse)({ description: "Successful response", status: 201, type: CourseServiceResponse_1.default }),
    (0, swagger_1.ApiHeader)({ name: "Authorization", description: "Authorization bearer token", required: true }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, CreateUserPreferenceRequestDTO_1.default]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "handleSaveOrUpdateUserPreference", null);
__decorate([
    (0, common_1.Get)(CourseApiPaths_1.default.USER_PREFERENCE_GET),
    (0, swagger_1.ApiOperation)({ description: `This API is used to fetch the user preference entity for an existing user` }),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: CourseServiceResponse_1.default }),
    (0, swagger_1.ApiCreatedResponse)({ description: "Successful response", status: 201, type: CourseServiceResponse_1.default }),
    (0, swagger_1.ApiHeader)({ name: "Authorization", description: "Authorization bearer token", required: true }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "handleGetUserCoursePreference", null);
__decorate([
    (0, common_1.Get)(CourseApiPaths_1.default.ALL_PREFERENCES),
    (0, swagger_1.ApiOperation)({ description: "This API is used to fetch all the course categories" }),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: CourseCategoryListResponseDTO_1.CourseCategoryListResponseDTO }),
    (0, swagger_1.ApiHeader)({ name: "Authorization", description: "Authorization bearer token", required: true }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "handleGetAllCoursePreferenceCategories", null);
__decorate([
    (0, common_1.Get)(CourseApiPaths_1.default.COURSE_CATEGORY_GRAPH),
    (0, swagger_1.ApiOperation)({
        description: `This API is used to fetch all the course categories with the nested 
      graphs of courses and their lessons. The graph is such that there is a one-to-many relation (1:M) between the 
      root categories and the courses and also there is a one-to-many (1:M) relation between the course and the 
      lessons associated with the course.`
    }),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: CourseGraphResponse_1.default }),
    (0, swagger_1.ApiHeader)({ name: "Authorization", description: "Authorization bearer token", required: true }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "handleAllCoursesCategoryGraph", null);
__decorate([
    (0, common_1.Get)(CourseApiPaths_1.default.COURSE_CATEGORY_PREFERENCE_GRAPH),
    (0, swagger_1.ApiOperation)({
        description: `This API is used to fetch all the preferred course categories with the nested 
      graphs of courses and their lessons. The graph is such that there is a one-to-many relation (1:M) between the 
      root categories and the courses and also there is a one-to-many (1:M) relation between the course and the 
      lessons associated with the course.`
    }),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: CourseGraphResponse_1.default }),
    (0, swagger_1.ApiHeader)({ name: "Authorization", description: "Authorization bearer token", required: true }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "handleAllCourseCategoriesByPreference", null);
__decorate([
    (0, common_1.Get)(CourseApiPaths_1.default.COURSE_CATEGORY_TRENDING),
    (0, swagger_1.ApiOperation)({
        description: `This API is used to fetch all the trending course categories with the nested 
      graphs of courses and their lessons. The graph is such that there is a one-to-many relation (1:M) between the 
      root categories and the courses and also there is a one-to-many (1:M) relation between the course and the 
      lessons associated with the course.`
    }),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: CourseGraphResponse_1.default }),
    (0, swagger_1.ApiHeader)({ name: "Authorization", description: "Authorization bearer token", required: true }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "handleGetAllTrendingCourseCategories", null);
__decorate([
    (0, common_1.Get)(CourseApiPaths_1.default.COURSE_CATEGORY_QUICK),
    (0, swagger_1.ApiOperation)({
        description: `This API is used to fetch all the quick course categories with the nested 
      graphs of courses and their lessons. The graph is such that there is a one-to-many relation (1:M) between the 
      root categories and the courses and also there is a one-to-many (1:M) relation between the course and the 
      lessons associated with the course.`
    }),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: CourseGraphResponse_1.default }),
    (0, swagger_1.ApiHeader)({ name: "Authorization", description: "Authorization bearer token", required: true }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "handleGetAllQuickCourseCategories", null);
__decorate([
    (0, common_1.Get)(CourseApiPaths_1.default.COMPACT_COURSE_CATEGORY_GRAPH),
    (0, swagger_1.ApiOperation)({
        description: `This API is used to fetch all the course categories in the compact form with the nested 
      graphs of courses and their lessons. The graph is such that there is a one-to-many relation (1:M) between the 
      root categories and the courses and also there is a one-to-many (1:M) relation between the course and the 
      lessons associated with the course.`
    }),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: CourseGraphResponse_1.CompactCourseGraphResponse }),
    (0, swagger_1.ApiHeader)({ name: "Authorization", description: "Authorization bearer token", required: true }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "handleCompactCourseCategoriesByPreference", null);
CourseController = __decorate([
    (0, swagger_1.ApiTags)("Course Management"),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Bad request response", status: 400, type: SwaggerDocsSchema_1.BadRequestResponseDTO }),
    (0, swagger_1.ApiCreatedResponse)({ status: 200 }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "Server error", type: SwaggerDocsSchema_1.InternalServerErrorResponseDTO }),
    (0, common_1.Controller)({ path: CourseApiPaths_1.default.COURSE_BASE_PATH }),
    __metadata("design:paramtypes", [CourseService_1.default])
], CourseController);
exports.default = CourseController;
//# sourceMappingURL=CourseController.js.map