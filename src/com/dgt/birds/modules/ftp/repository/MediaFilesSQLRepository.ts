/* eslint-disable */

import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import MediaFile from "../model/MediaFile";
import ApplicationPropertyConfig from "../../../config/ApplicationPropertyConfig";


const env = ApplicationPropertyConfig;
const defaultProfilePic: string = env.getProperty("birds.user.defaultProfilePic");

@Injectable()
export default class MediaFilesSQLRepository extends Repository<MediaFile>
{
    constructor(private readonly dataSource: DataSource) {
      super(MediaFile, dataSource.createEntityManager());
    }

}