/* eslint-disable */

import { Injectable } from "@nestjs/common";
import ApplicationPropertyConfig from "../../../config/ApplicationPropertyConfig";
import GoogleDriveServiceUtils, {
    FileMetadata,
    ProfilePicMetadata
} from "../../../utils/google/GoogleDriveServiceUtils";
import MessageSource from "../../../config/MessageSource";
import UserSQLRepository from "../../user/repository/UserSQLRepository";
import UserProfilePicSQLRepository from "../../user/repository/UserProfilePicSQLRepository";
import UserProfilePicture from "../../user/model/UserProfilePicture";
import GenericConstants from "../../../const/GenericConstants";
import { ReadStream } from "fs";
import { Readable } from "stream";
import User from "../../user/model/User";
import { Performer } from "../../../const/Performer";


const environment = ApplicationPropertyConfig;

@Injectable()
export default class GoogleDriveService{
    constructor(
      private readonly messageSource: MessageSource,
      private readonly userRepository: UserSQLRepository,
      private readonly userProfilePictureRepository: UserProfilePicSQLRepository
    ) {}

    async saveOrUpdateProfilePicture(base64Image: string, user: User): Promise<string>{
        const userEmail = user.emailAddress;

        // First check if the user already has a profile picture in Google's drive.
        let potentialProfilePic: UserProfilePicture = (await this.userProfilePictureRepository
                                        .findProfilePictureByEmail(userEmail)).entity as UserProfilePicture;

        const fileMetadata: FileMetadata = this.createProfilePictureMetadata(base64Image, userEmail);
        if(potentialProfilePic === null){
            const picMetadata: ProfilePicMetadata = await GoogleDriveServiceUtils.createUserProfileImageGetLink(fileMetadata);
            await this.createNewUserProfilePictureEntity(user, picMetadata);
            return Promise.resolve(picMetadata.webViewLink);
        }

        // Delete the file and save it again.
        await GoogleDriveServiceUtils.deleteProfileImage(potentialProfilePic.picId);
        const newMetadata: ProfilePicMetadata = await GoogleDriveServiceUtils.createUserProfileImageGetLink(fileMetadata);
        const partial: object = { picId: newMetadata.picId, photoLink: newMetadata.webViewLink }
        await this.userProfilePictureRepository.updateProfilePicture(potentialProfilePic, partial);
        return Promise.resolve(newMetadata.webViewLink);
    }

    private createProfilePictureMetadata(imageBase64: string, userEmail: string): FileMetadata {
        const fileName: string = this.getProfilePictureName(userEmail.trim())
        const buffer: Buffer = Buffer.from(imageBase64, 'base64');
        const imageStream: ReadStream = Readable.from(buffer) as ReadStream;
        return {
            name: fileName,
            mimeType: "image/png",
            bodyStream: imageStream
        };
    }

    private getProfilePictureName(userEmail: string): string{
        userEmail = userEmail.trim();
        const removableIndex: number = userEmail.indexOf("@");
        const removable: string = userEmail.substring(removableIndex);
        return userEmail.replaceAll(removable, GenericConstants.EMPTY_STRING);
    }

    private async createNewUserProfilePictureEntity(user: User, picMetadata: ProfilePicMetadata){
        const userProfilePic: UserProfilePicture = new UserProfilePicture();
        userProfilePic.userEmail = user.emailAddress;
        userProfilePic.userId = user.userId;
        userProfilePic.picId = picMetadata.picId;
        userProfilePic.createdAt = new Date();
        userProfilePic.updatedAt = new Date();
        userProfilePic.photoLink = picMetadata.webViewLink;
        userProfilePic.modifiedBy = Performer.USER;
        userProfilePic.deletedAt = undefined;
        await this.userProfilePictureRepository.createUserProfilePicture(userProfilePic);
    }
}