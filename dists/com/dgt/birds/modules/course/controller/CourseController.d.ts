import { Request, Response } from 'express';
import CreateUserPreferenceRequestDTO from "../dto/request/CreateUserPreferenceRequestDTO";
import CourseService from "../service/CourseService";
export default class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    handleSaveOrUpdateUserPreference(req: Request, res: Response, requestDTO: CreateUserPreferenceRequestDTO): Promise<Response<any, Record<string, any>>>;
    handleGetUserCoursePreference(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    handleGetAllCoursePreferenceCategories(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    handleAllCoursesCategoryGraph(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    handleAllCourseCategoriesByPreference(req: Request, res: Response, limit?: number): Promise<Response<any, Record<string, any>>>;
    handleGetAllTrendingCourseCategories(req: Request, res: Response, limit?: number): Promise<Response<any, Record<string, any>>>;
    handleGetAllQuickCourseCategories(req: Request, res: Response, limit?: number): Promise<Response<any, Record<string, any>>>;
    handleCompactCourseCategoriesByPreference(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    private getAuthHeader;
}
