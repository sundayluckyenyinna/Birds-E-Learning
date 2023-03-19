import { ICourseService } from "./ICourseService";
import CreateUserPreferenceRequestDTO from "../dto/request/CreateUserPreferenceRequestDTO";
import ResponseDTO from "../../../config/ResponseDTO";
import UserSQLRepository from "../../user/repository/UserSQLRepository";
import UserPreferenceSQLRepository from "../repository/UserPreferenceSQLRepository";
import MessageSource from "../../../config/MessageSource";
import LoggerFactory from "../../../config/LoggerFactory";
import CourseCategorySQLRepository from "../repository/CourseCategorySQLRepository";
export default class CourseService implements ICourseService {
    private readonly userRepository;
    private readonly userPreferenceRepository;
    private readonly courseCategoryRepository;
    private readonly messageSource;
    logger: LoggerFactory;
    constructor(userRepository: UserSQLRepository, userPreferenceRepository: UserPreferenceSQLRepository, courseCategoryRepository: CourseCategorySQLRepository, messageSource: MessageSource);
    saveOrUpdateUserPreferences(requestUrl: string, token: string, requestDTO: CreateUserPreferenceRequestDTO): Promise<ResponseDTO>;
    fetchUserPreferences(requestUrl: string, token: string): Promise<ResponseDTO>;
    getAllCourseCategories(requestUrl: string): Promise<ResponseDTO>;
    getAllCourseCategoriesGraph(requestUrl: string, token: string): Promise<ResponseDTO>;
    getAllCourseCategoriesGraphByPreference(requestUrl: string, token: string, limit?: number): Promise<ResponseDTO>;
    getAllTrendingCourseCategoriesGraph(requestUrl: string, token: string, limit?: number): Promise<ResponseDTO>;
    getQuickCourseCategoriesGraph(requestUrl: string, token: string, size?: number): Promise<ResponseDTO>;
    getCompactNestedCourseGraphCategories(requestUrl: string, token: string, limits?: {
        trendingLimit?: number;
        preferenceLimit?: number;
        quickLimit?: number;
    }): Promise<ResponseDTO>;
    private static getLogMessage;
}
