"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const ApplicationPropertyConfig_1 = require("../../../config/ApplicationPropertyConfig");
const GoogleDriveServiceUtils_1 = require("../../../utils/google/GoogleDriveServiceUtils");
const MessageSource_1 = require("../../../config/MessageSource");
const UserSQLRepository_1 = require("../../user/repository/UserSQLRepository");
const UserProfilePicSQLRepository_1 = require("../../user/repository/UserProfilePicSQLRepository");
const UserProfilePicture_1 = require("../../user/model/UserProfilePicture");
const GenericConstants_1 = require("../../../const/GenericConstants");
const stream_1 = require("stream");
const Performer_1 = require("../../../const/Performer");
const environment = ApplicationPropertyConfig_1.default;
let GoogleDriveService = class GoogleDriveService {
    constructor(messageSource, userRepository, userProfilePictureRepository) {
        this.messageSource = messageSource;
        this.userRepository = userRepository;
        this.userProfilePictureRepository = userProfilePictureRepository;
    }
    async saveOrUpdateProfilePicture(base64Image, user) {
        const userEmail = user.emailAddress;
        let potentialProfilePic = (await this.userProfilePictureRepository
            .findProfilePictureByEmail(userEmail)).entity;
        const fileMetadata = this.createProfilePictureMetadata(base64Image, userEmail);
        if (potentialProfilePic === null) {
            const picMetadata = await GoogleDriveServiceUtils_1.default.createUserProfileImageGetLink(fileMetadata);
            await this.createNewUserProfilePictureEntity(user, picMetadata);
            return Promise.resolve(picMetadata.webViewLink);
        }
        await GoogleDriveServiceUtils_1.default.deleteProfileImage(potentialProfilePic.picId);
        const newMetadata = await GoogleDriveServiceUtils_1.default.createUserProfileImageGetLink(fileMetadata);
        const partial = { picId: newMetadata.picId, photoLink: newMetadata.webViewLink };
        await this.userProfilePictureRepository.updateProfilePicture(potentialProfilePic, partial);
        return Promise.resolve(newMetadata.webViewLink);
    }
    createProfilePictureMetadata(imageBase64, userEmail) {
        const fileName = this.getProfilePictureName(userEmail.trim());
        const buffer = Buffer.from(imageBase64, 'base64');
        const imageStream = stream_1.Readable.from(buffer);
        return {
            name: fileName,
            mimeType: "image/png",
            bodyStream: imageStream
        };
    }
    getProfilePictureName(userEmail) {
        userEmail = userEmail.trim();
        const removableIndex = userEmail.indexOf("@");
        const removable = userEmail.substring(removableIndex);
        return userEmail.replaceAll(removable, GenericConstants_1.default.EMPTY_STRING);
    }
    async createNewUserProfilePictureEntity(user, picMetadata) {
        const userProfilePic = new UserProfilePicture_1.default();
        userProfilePic.userEmail = user.emailAddress;
        userProfilePic.userId = user.userId;
        userProfilePic.picId = picMetadata.picId;
        userProfilePic.createdAt = new Date();
        userProfilePic.updatedAt = new Date();
        userProfilePic.photoLink = picMetadata.webViewLink;
        userProfilePic.modifiedBy = Performer_1.Performer.USER;
        userProfilePic.deletedAt = undefined;
        await this.userProfilePictureRepository.createUserProfilePicture(userProfilePic);
    }
};
GoogleDriveService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [MessageSource_1.default,
        UserSQLRepository_1.default,
        UserProfilePicSQLRepository_1.default])
], GoogleDriveService);
exports.default = GoogleDriveService;
//# sourceMappingURL=GoogleDriveService.js.map