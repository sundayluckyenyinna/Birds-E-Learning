/* eslint-disable */

import { Module } from "@nestjs/common";
import UserSQLRepository from "../user/repository/UserSQLRepository";
import MessageSource from "../../config/MessageSource";
import GoogleDriveService from "./service/GoogleDriveService";
import UserProfilePicSQLRepository from "../user/repository/UserProfilePicSQLRepository";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserProfilePicture from "../user/model/UserProfilePicture";

@Module({
  imports:[TypeOrmModule.forFeature([UserProfilePicture])],
   providers: [
     UserSQLRepository, MessageSource, GoogleDriveService,
      UserProfilePicSQLRepository
   ]
})
export default class GoogleModule{}