import { DataSource, Repository } from "typeorm";
import MediaFile from "../model/MediaFile";
export default class MediaFilesSQLRepository extends Repository<MediaFile> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
}
