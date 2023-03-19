/* eslint-disable */

import { Body, Controller, Get, ParseIntPipe, Post, Query, Req, Res } from "@nestjs/common";
import CourseApiPaths from "../constant/CourseApiPaths";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse, ApiHeader,
  ApiInternalServerErrorResponse, ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import { BadRequestResponseDTO, InternalServerErrorResponseDTO } from "../../../api-schema/SwaggerDocsSchema";
import { Request, Response } from 'express';
import CreateUserPreferenceRequestDTO from "../dto/request/CreateUserPreferenceRequestDTO";
import ResponseDTO from "../../../config/ResponseDTO";
import CourseService from "../service/CourseService";
import ResponseDispatcher from "../../../config/ResponseDispatcher";
import CreateUserPreferenceResponseDTO from "../dto/response/CourseServiceResponse";
import GenericConstants from "../../../const/GenericConstants";
import { CourseCategoryListResponseDTO } from "../dto/response/CourseCategoryListResponseDTO";
import CourseGraphResponse, {
  CompactCourseGraphResponse,
} from "../dto/response/CourseGraphResponse";

@ApiTags("Course Management")
@ApiBadRequestResponse({ description: "Bad request response", status: 400, type: BadRequestResponseDTO })
@ApiCreatedResponse({ status: 200 })
@ApiInternalServerErrorResponse({ description: "Server error",  type: InternalServerErrorResponseDTO })
@Controller({ path: CourseApiPaths.COURSE_BASE_PATH })
export default class CourseController
{

    constructor(private readonly courseService: CourseService) {
    }

    @Post(CourseApiPaths.USER_PREFERENCE_SAVE_OR_UPDATE)
    @ApiOperation({ description: `This API is a general API to save or update a particular interested user. 
    It should be noted that by definition, two preferences are the same for a user identified by his/her email if the
    two preference have exactly the same content of the preferenceNames array. Thus, if the request preferenceNames
    array is different from the one in the system for an existing user, the preference entity is updated to the current
     one of the request. However, if the user preference does not yet exist, a new entity is created and saved.`})
    @ApiOkResponse({description: "Successful response", status: 200, type: CreateUserPreferenceResponseDTO })
    @ApiCreatedResponse({description: "Successful response", status: 201, type: CreateUserPreferenceResponseDTO })
    @ApiHeader({ name: "Authorization", description: "Authorization bearer token", required: true })
    async handleSaveOrUpdateUserPreference(@Req() req : Request, @Res() res: Response, @Body() requestDTO: CreateUserPreferenceRequestDTO )
    {
        const authToken: string = this.getAuthHeader(req);
        const serviceResponse: ResponseDTO = await this.courseService.saveOrUpdateUserPreferences(req.url, authToken, requestDTO);
        return ResponseDispatcher.respond(res, serviceResponse);
    }

    @Get(CourseApiPaths.USER_PREFERENCE_GET)
    @ApiOperation({ description: `This API is used to fetch the user preference entity for an existing user`})
    @ApiOkResponse({description: "Successful response", status: 200, type: CreateUserPreferenceResponseDTO })
    @ApiCreatedResponse({description: "Successful response", status: 201, type: CreateUserPreferenceResponseDTO })
    @ApiHeader({ name: "Authorization", description: "Authorization bearer token", required: true })
    async  handleGetUserCoursePreference(@Req() req: Request, @Res() res: Response){
        const authToken : string = this.getAuthHeader(req);
        const serviceResponse: ResponseDTO = await this.courseService.fetchUserPreferences(req.url, authToken);
        return ResponseDispatcher.respond(res, serviceResponse);
    }

    @Get(CourseApiPaths.ALL_PREFERENCES)
    @ApiOperation({ description: "This API is used to fetch all the course categories" })
    @ApiOkResponse({ description: "Successful response", status: 200, type: CourseCategoryListResponseDTO })
    @ApiHeader({ name: "Authorization", description: "Authorization bearer token", required: true })
    async handleGetAllCoursePreferenceCategories(@Req() req: Request, @Res() res: Response){
       const serviceResponse: ResponseDTO = await this.courseService.getAllCourseCategories(req.url);
       return ResponseDispatcher.respond(res, serviceResponse);
    }

    @Get(CourseApiPaths.COURSE_CATEGORY_GRAPH)
    @ApiOperation({
      description: `This API is used to fetch all the course categories with the nested 
      graphs of courses and their lessons. The graph is such that there is a one-to-many relation (1:M) between the 
      root categories and the courses and also there is a one-to-many (1:M) relation between the course and the 
      lessons associated with the course.`
    })
    @ApiOkResponse({ description: "Successful response", status: 200, type: CourseGraphResponse })
    @ApiHeader({ name: "Authorization", description: "Authorization bearer token", required: true })
    async handleAllCoursesCategoryGraph(@Req() req: Request, @Res() res: Response){
       const token: string = this.getAuthHeader(req);
       const serviceResponse: ResponseDTO = await this.courseService.getAllCourseCategoriesGraph(req.url, token);
       return ResponseDispatcher.respond(res, serviceResponse);
    }

    @Get(CourseApiPaths.COURSE_CATEGORY_PREFERENCE_GRAPH)
    @ApiOperation({
      description: `This API is used to fetch all the preferred course categories with the nested 
      graphs of courses and their lessons. The graph is such that there is a one-to-many relation (1:M) between the 
      root categories and the courses and also there is a one-to-many (1:M) relation between the course and the 
      lessons associated with the course.`
    })
    @ApiOkResponse({ description: "Successful response", status: 200, type: CourseGraphResponse })
    @ApiHeader({ name: "Authorization", description: "Authorization bearer token", required: true })
    async handleAllCourseCategoriesByPreference(@Req() req: Request, @Res() res: Response, @Query("limit") limit?: number){
       const token: string = this.getAuthHeader(req);
       const serviceResponse: ResponseDTO = await this.courseService.getAllCourseCategoriesGraphByPreference(req.url, token, Number(limit));
       return ResponseDispatcher.respond(res, serviceResponse);
    }

  @Get(CourseApiPaths.COURSE_CATEGORY_TRENDING)
  @ApiOperation({
    description: `This API is used to fetch all the trending course categories with the nested 
      graphs of courses and their lessons. The graph is such that there is a one-to-many relation (1:M) between the 
      root categories and the courses and also there is a one-to-many (1:M) relation between the course and the 
      lessons associated with the course.`
  })
  @ApiOkResponse({ description: "Successful response", status: 200, type: CourseGraphResponse })
  @ApiHeader({ name: "Authorization", description: "Authorization bearer token", required: true })
  async handleGetAllTrendingCourseCategories(@Req() req: Request, @Res() res: Response, @Query("limit") limit?: number){
    const token: string = this.getAuthHeader(req);
    const serviceResponse: ResponseDTO = await this.courseService.getAllTrendingCourseCategoriesGraph(req.url, token, Number(limit));
    return ResponseDispatcher.respond(res, serviceResponse);
  }

  @Get(CourseApiPaths.COURSE_CATEGORY_QUICK)
  @ApiOperation({
    description: `This API is used to fetch all the quick course categories with the nested 
      graphs of courses and their lessons. The graph is such that there is a one-to-many relation (1:M) between the 
      root categories and the courses and also there is a one-to-many (1:M) relation between the course and the 
      lessons associated with the course.`
  })
  @ApiOkResponse({ description: "Successful response", status: 200, type: CourseGraphResponse })
  @ApiHeader({ name: "Authorization", description: "Authorization bearer token", required: true })
  async handleGetAllQuickCourseCategories(@Req() req: Request, @Res() res: Response, @Query("limit") limit?: number){
    const token: string = this.getAuthHeader(req);
    const serviceResponse: ResponseDTO = await this.courseService.getQuickCourseCategoriesGraph(req.url, token, Number(limit));
    return ResponseDispatcher.respond(res, serviceResponse);
  }


  @Get(CourseApiPaths.COMPACT_COURSE_CATEGORY_GRAPH)
  @ApiOperation({
    description: `This API is used to fetch all the course categories in the compact form with the nested 
      graphs of courses and their lessons. The graph is such that there is a one-to-many relation (1:M) between the 
      root categories and the courses and also there is a one-to-many (1:M) relation between the course and the 
      lessons associated with the course.`
  })
  @ApiOkResponse({ description: "Successful response", status: 200, type: CompactCourseGraphResponse })
  @ApiHeader({ name: "Authorization", description: "Authorization bearer token", required: true })
  async handleCompactCourseCategoriesByPreference(@Req() req: Request, @Res() res: Response){
    const limits = {
      trendingLimit: Number(req.query["trendingLimit"]),
      preferenceLimit: Number(req.query["preferenceLimit"]),
      quickLimit: Number(req.query["quickLimit"])
    }
    const token: string = this.getAuthHeader(req);
    const serviceResponse: ResponseDTO = await this.courseService.getCompactNestedCourseGraphCategories(req.url, token, limits);
    return ResponseDispatcher.respond(res, serviceResponse);
  }

    private getAuthHeader = (request: Request): string => {
       const authHeader: string = request.get("Authorization") || GenericConstants.EMPTY_STRING;
       const authToken: string = authHeader.replace("Bearer ", GenericConstants.EMPTY_STRING);
       return authToken.trim();
    }
}