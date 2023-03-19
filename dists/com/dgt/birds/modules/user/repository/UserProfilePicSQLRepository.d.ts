import { DataSource, Repository } from "typeorm";
import UserProfilePicture from "../model/UserProfilePicture";
import { DBOperationResult } from "../interfaces/UserModuleInterfaces";
export default class UserProfilePicSQLRepository extends Repository<UserProfilePicture> {
    constructor(dataSource: DataSource);
    createUserProfilePicture(profilePicture: UserProfilePicture): Promise<DBOperationResult>;
    findProfilePictureByEmail(userEmail: string): Promise<DBOperationResult>;
    updateProfilePicture(profilePicture: UserProfilePicture, partial: object): Promise<DBOperationResult>;
}
