import LoggerFactory from "../../../config/LoggerFactory";
import UserSQLRepository from "../repository/UserSQLRepository";
import MessageSource from "../../../config/MessageSource";
import CreateUserRequestDTO from "../dto/request/CreateUserRequestDTO";
import ResponseDTO from "../../../config/ResponseDTO";
import LoginUserRequestDTO, { AutomaticLoginRequestDTO } from "../dto/request/LoginUserRequestDTO";
import ValidateOtpRequestDTO from "../dto/request/ValidateOtpRequestDTO";
import UpdatePasswordRequestDTO from "../dto/request/UpdatePasswordRequestDTO";
import LoginSQLRepository from "../repository/LoginSQLRepository";
export default class UserBasicService {
    private readonly userRepository;
    private readonly messageSource;
    private readonly loginRepository;
    logger: LoggerFactory;
    constructor(userRepository: UserSQLRepository, messageSource: MessageSource, loginRepository: LoginSQLRepository);
    createUserBasic(requestUrl: string, requestDTO: CreateUserRequestDTO): Promise<ResponseDTO>;
    loginUserBasic(requestUrl: string, requestDTO: LoginUserRequestDTO): Promise<ResponseDTO>;
    loginUserAutomatic(requestUrl: string, requestDTO: AutomaticLoginRequestDTO): Promise<ResponseDTO>;
    validateOtp(requestUrl: string, requestDTO: ValidateOtpRequestDTO): Promise<ResponseDTO>;
    sendVerificationOtp(requestUrl: string, emailAddress: string): Promise<ResponseDTO>;
    sendResetPasswordMailForMobile(requestUrl: string, emailAddress: string): Promise<ResponseDTO>;
    validateOtpForPasswordReset(requestUrl: string, requestDTO: ValidateOtpRequestDTO): Promise<ResponseDTO>;
    sendResetPasswordMail(requestUrl: string, emailAddress: string): Promise<ResponseDTO>;
    getPasswordResetStreamPage(requestUrl: string, encodedEmail: string): Promise<string>;
    updateUserPassword(requestUrl: string, requestDTO: UpdatePasswordRequestDTO): Promise<ResponseDTO>;
    private getCreatorAndModifierBySigner;
    private validateSignerAndLogger;
}
