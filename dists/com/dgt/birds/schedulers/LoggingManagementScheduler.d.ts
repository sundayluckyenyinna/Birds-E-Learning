import UserSQLRepository from "../modules/user/repository/UserSQLRepository";
import LoginSQLRepository from "../modules/user/repository/LoginSQLRepository";
export default class LoggingManagementScheduler {
    private readonly userRepository;
    private readonly loginRepository;
    private logger;
    constructor(userRepository: UserSQLRepository, loginRepository: LoginSQLRepository);
    performHouseKeeping(): void;
    private cleanupLoggingRecords;
    private invalidateExpiredRememberMe;
}
