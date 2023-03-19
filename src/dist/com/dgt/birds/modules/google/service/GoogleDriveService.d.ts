import MessageSource from "../../../config/MessageSource";
import UserSQLRepository from "../../user/repository/UserSQLRepository";
import UserProfilePicSQLRepository from "../../user/repository/UserProfilePicSQLRepository";
import User from "../../user/model/User";
export default class GoogleDriveService {
    private readonly messageSource;
    private readonly userRepository;
    private readonly userProfilePictureRepository;
    constructor(messageSource: MessageSource, userRepository: UserSQLRepository, userProfilePictureRepository: UserProfilePicSQLRepository);
    saveOrUpdateProfilePicture(base64Image: string, user: User): Promise<string>;
    private createProfilePictureMetadata;
    private getProfilePictureName;
    private createNewUserProfilePictureEntity;
}
