/* eslint-disable */

import { Module } from "@nestjs/common";
import UserController from "./controller/UserController";
import UserService from "./service/UserService";
import UserSQLRepository from "./repository/UserSQLRepository";
import UserNoSQLRepository from "./repository/UserNoSQLRepository";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "./model/User";
import AppConfigModule from "../../config/AppConfigModule";
import MessageSource from "../../config/MessageSource";
import UserAuth from "./model/UserAuth";
import UserBasicService from "./service/UserBasicService";
import UserOauthService from "./service/UserOauthService";
import LoginSQLRepository from "./repository/LoginSQLRepository";
import UserLogin from "./model/UserLogin";
import UserBasicServiceUtils from "./service/UserBasicServiceUtils";
import UserPreferenceSQLRepository from "../course/repository/UserPreferenceSQLRepository";
import PaymentSQLRepository from "../payment/repository/PaymentSQLRepository";
import UserProfilePicSQLRepository from "./repository/UserProfilePicSQLRepository";
import GoogleDriveService from "../google/service/GoogleDriveService";
import FtpService from "../ftp/service/FtpService";
import MediaFilesSQLRepository from "../ftp/repository/MediaFilesSQLRepository";

/**
 * This module packages all the application scoped requirements for thw user module.
 * NOTE: This module will be supplied and imported in the application scope module to be loaded in the NEST appliaction
 * context.
 */
@Module({
  imports: [TypeOrmModule.forFeature([User, UserAuth, UserLogin])],
  controllers: [UserController],
  providers: [
    UserService, UserBasicService, UserOauthService, UserSQLRepository,
    UserNoSQLRepository, LoginSQLRepository, UserPreferenceSQLRepository,
    PaymentSQLRepository, MessageSource, UserBasicServiceUtils, UserProfilePicSQLRepository,
    GoogleDriveService, FtpService, MediaFilesSQLRepository
  ]
})
export default class UserModule {}