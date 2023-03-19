import UserSQLRepository from "../repository/UserSQLRepository";
import MessageSource from "../../../config/MessageSource";
import LoggerFactory from "../../../config/LoggerFactory";
import ResponseDTO from "../../../config/ResponseDTO";
import UpdateUserDetailsRequestDTO from "../dto/request/UpdateUserDetailsRequestDTO";
import UserPreferenceSQLRepository from "../../course/repository/UserPreferenceSQLRepository";
import UpdateUserPasswordRequestDTO from "../dto/request/UpdateUserPasswordRequestDTO";
import PaymentSQLRepository from "../../payment/repository/PaymentSQLRepository";
import FtpService from "../../ftp/service/FtpService";
export default class UserBasicServiceUtils {
    private readonly userRepository;
    private readonly userPreferenceRepository;
    private readonly paymentRepository;
    private readonly ftpService;
    private readonly messageSource;
    logger: LoggerFactory;
    constructor(userRepository: UserSQLRepository, userPreferenceRepository: UserPreferenceSQLRepository, paymentRepository: PaymentSQLRepository, ftpService: FtpService, messageSource: MessageSource);
    fetchAllUserDetails(requestUrl: string, queryParams: UserDetailsQueryParams): Promise<ResponseDTO>;
    fetchSingleUser(requestUrl: string, userEmail: string): Promise<ResponseDTO>;
    updateUserDetails(requestUrl: string, token: string, requestDTO: UpdateUserDetailsRequestDTO): Promise<ResponseDTO>;
    updateUserPassword(requestUrl: string, token: string, requestDTO: UpdateUserPasswordRequestDTO): Promise<ResponseDTO>;
    logoutUser(requestUrl: string, token: string): Promise<ResponseDTO>;
    private getRolesFromQueryParams;
}
export interface UserDetailsQueryParams {
    status: string;
    roles: string;
}
