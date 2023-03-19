import User from "../../user/model/User";
import UserSQLRepository from "../../user/repository/UserSQLRepository";
import MediaFilesSQLRepository from "../repository/MediaFilesSQLRepository";
import MessageSource from "../../../config/MessageSource";
export default class FtpService {
    private readonly userRepository;
    private readonly mediaFileRepository;
    private readonly messageSource;
    constructor(userRepository: UserSQLRepository, mediaFileRepository: MediaFilesSQLRepository, messageSource: MessageSource);
    static ftpHost: string;
    static ftpUser: string;
    static ftpPassword: string;
    static pathToProfilePicFolder: string;
    saveOrUpdateProfilePicture(base64Image: string, user: User): Promise<string>;
}
