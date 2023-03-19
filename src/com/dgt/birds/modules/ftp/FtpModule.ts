/* eslint-disable */

import { Module } from "@nestjs/common";
import UserSQLRepository from "../user/repository/UserSQLRepository";
import FtpService from "./service/FtpService";
import MediaFilesSQLRepository from "./repository/MediaFilesSQLRepository";
import { TypeOrmModule } from "@nestjs/typeorm";
import MediaFile from "./model/MediaFile";
import MessageSource from "../../config/MessageSource";

@Module({
  imports: [TypeOrmModule.forFeature([MediaFile])],
  providers: [UserSQLRepository, FtpService, MediaFilesSQLRepository, MessageSource]
})
export default class FtpModule{}