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
var FtpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationPropertyConfig_1 = require("../../../config/ApplicationPropertyConfig");
const ftp = require("basic-ftp");
const stream_1 = require("stream");
const common_1 = require("@nestjs/common");
const UserSQLRepository_1 = require("../../user/repository/UserSQLRepository");
const MediaFilesSQLRepository_1 = require("../repository/MediaFilesSQLRepository");
const MessageSource_1 = require("../../../config/MessageSource");
const MediaFile_1 = require("../model/MediaFile");
const env = ApplicationPropertyConfig_1.default;
const defaultProfilePic = env.getProperty("birds.user.defaultProfilePic");
const staticProfilePicPath = env.getProperty("birds.ftp.staticProfilePicPath");
const staticCourseImgPath = env.getProperty("birds.ftp.staticCourseImgPath");
const filePathPrefix = env.getProperty("birds.ftp.filePathPrefix");
const driver = env.getProperty("birds.ftp.driver");
let FtpService = FtpService_1 = class FtpService {
    constructor(userRepository, mediaFileRepository, messageSource) {
        this.userRepository = userRepository;
        this.mediaFileRepository = mediaFileRepository;
        this.messageSource = messageSource;
    }
    async saveOrUpdateProfilePicture(base64Image, user) {
        const client = new ftp.Client();
        try {
            await client.access({
                host: FtpService_1.ftpHost,
                user: FtpService_1.ftpUser,
                password: FtpService_1.ftpPassword
            });
            let uploadResponse;
            const buffer = Buffer.from(base64Image, 'base64');
            if (user.photoLink === defaultProfilePic) {
                const mediaFile = new MediaFile_1.default();
                mediaFile.fileName = user.emailAddress;
                mediaFile.filePath = filePathPrefix.concat("/").concat(mediaFile.fileName);
                mediaFile.fileType = "image/jpg";
                mediaFile.fileExtension = "jpg";
                mediaFile.createdAt = new Date();
                mediaFile.driver = driver;
                const savedMediaFile = await this.mediaFileRepository.save(mediaFile);
                if (savedMediaFile === null)
                    return user.photoLink;
                const savedMediaFileId = savedMediaFile.id;
                const fullPath = FtpService_1.pathToProfilePicFolder.concat("/").concat(String(savedMediaFileId)).concat(".jpg");
                console.log("FTPFullPathForUserNotYetHaveImage: " + fullPath);
                uploadResponse = await client.uploadFrom(stream_1.Readable.from(buffer), fullPath);
                if (uploadResponse.code === 226) {
                    const fullLink = staticProfilePicPath.concat(String(savedMediaFileId)).concat(".jpg");
                    user.avatarId = savedMediaFileId;
                    user.photoLink = fullLink;
                    const updatedUser = await this.userRepository.save(user);
                    console.log("New AvatarId: " + updatedUser.avatarId);
                    return fullLink;
                }
            }
            else {
                const pathEnd = user.photoLink.substring(user.photoLink.lastIndexOf("/"));
                const fullPath = FtpService_1.pathToProfilePicFolder.concat(pathEnd);
                console.log("FTPFullPathForUserAlreadyHaveImage: " + fullPath);
                uploadResponse = await client.uploadFrom(stream_1.Readable.from(buffer), fullPath);
                return user.photoLink;
            }
        }
        catch (err) {
            console.log(err);
        }
        client.close();
        return user.photoLink;
    }
};
FtpService.ftpHost = env.getProperty("birds.ftp.host");
FtpService.ftpUser = env.getProperty("birds.ftp.user");
FtpService.ftpPassword = env.getProperty("birds.ftp.password");
FtpService.pathToProfilePicFolder = ["public_html", "blns", "public", "uploads", "demo", "team"].join("/");
FtpService = FtpService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserSQLRepository_1.default,
        MediaFilesSQLRepository_1.default,
        MessageSource_1.default])
], FtpService);
exports.default = FtpService;
//# sourceMappingURL=FtpService.js.map