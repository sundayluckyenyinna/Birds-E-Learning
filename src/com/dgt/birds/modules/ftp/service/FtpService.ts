/* eslint-disable */
import ApplicationPropertyConfig from "../../../config/ApplicationPropertyConfig";
import * as path from "path";
import * as ftp from "basic-ftp";
import { FTPResponse } from "basic-ftp";
import { Readable } from "stream";
import User from "../../user/model/User";
import { Injectable } from "@nestjs/common";
import UserSQLRepository from "../../user/repository/UserSQLRepository";
import MediaFilesSQLRepository from "../repository/MediaFilesSQLRepository";
import MessageSource from "../../../config/MessageSource";
import MediaFile from "../model/MediaFile";
import GenericConstants from "../../../const/GenericConstants";
import { InsertResult, UpdateResult } from "typeorm";

const env = ApplicationPropertyConfig;
const defaultProfilePic: string = env.getProperty("birds.user.defaultProfilePic");
const staticProfilePicPath: string = env.getProperty("birds.ftp.staticProfilePicPath");
const staticCourseImgPath: string = env.getProperty("birds.ftp.staticCourseImgPath");
const filePathPrefix: string = env.getProperty("birds.ftp.filePathPrefix");
const driver: string = env.getProperty("birds.ftp.driver");

@Injectable()
export default class FtpService
{

   constructor(
     private readonly userRepository: UserSQLRepository,
     private readonly mediaFileRepository: MediaFilesSQLRepository,
     private readonly messageSource: MessageSource
   ) {
   }
   static ftpHost: string = env.getProperty("birds.ftp.host");
   static ftpUser: string = env.getProperty("birds.ftp.user");
   static ftpPassword: string = env.getProperty("birds.ftp.password");
   static pathToProfilePicFolder: string = ["public_html", "blns", "public", "uploads", "demo", "team"].join("/");

   async saveOrUpdateProfilePicture(base64Image: string, user: User): Promise<string>{
      // Construct and instantiate the FTP client.
      const client = new ftp.Client();
      try {
         // Connect to the FTP server using the initialized client.
         await client.access({
            host: FtpService.ftpHost,
            user: FtpService.ftpUser,
            password: FtpService.ftpPassword
         });

         // Upload to the remote ftp server
         let uploadResponse: FTPResponse;
         const buffer: Buffer = Buffer.from(base64Image, 'base64');

         if(user.photoLink === defaultProfilePic){
            const mediaFile: MediaFile = new MediaFile();
            mediaFile.fileName = user.emailAddress;
            mediaFile.filePath = filePathPrefix.concat("/").concat(mediaFile.fileName);
            mediaFile.fileType = "image/jpg";
            mediaFile.fileExtension = "jpg";
            mediaFile.createdAt = new Date();
            mediaFile.updatedAt = new Date();
            mediaFile.driver = driver;
            const savedMediaFile: MediaFile = await this.mediaFileRepository.save(mediaFile);
            if(savedMediaFile === null)
               return user.photoLink;
            const savedMediaFileId: number = savedMediaFile.id;
            const fullPath: string = FtpService.pathToProfilePicFolder.concat("/").concat(String(savedMediaFileId)).concat(".jpg");
            console.log("FTPFullPathForUserNotYetHaveImage: " + fullPath)
            uploadResponse = await client.uploadFrom(Readable.from(buffer), fullPath);
            if(uploadResponse.code === 226){
               const fullLink: string = staticProfilePicPath.concat(String(savedMediaFileId)).concat(".jpg");
               user.avatarId = savedMediaFileId;
               user.photoLink = fullLink;
               const updatedUser: User = await this.userRepository.save(user);
               console.log("New AvatarId: " + updatedUser.avatarId);
               return fullLink;
            }
         }else{
            const pathEnd: string = user.photoLink.substring(user.photoLink.lastIndexOf("/"));
            const fullPath: string = FtpService.pathToProfilePicFolder.concat(pathEnd);
            console.log("FTPFullPathForUserAlreadyHaveImage: " + fullPath)
            uploadResponse = await client.uploadFrom(Readable.from(buffer), fullPath)
            const mediaFile: MediaFile = await this.mediaFileRepository.findOne({ where: { fileName: user.emailAddress }});
            if(mediaFile){
               mediaFile.updatedAt = new Date();
               await this.mediaFileRepository.save(mediaFile);
            }
            return user.photoLink;
         }
      }
      catch(err) {
         console.log(err);
      }
      client.close();
      return user.photoLink;
   }
}