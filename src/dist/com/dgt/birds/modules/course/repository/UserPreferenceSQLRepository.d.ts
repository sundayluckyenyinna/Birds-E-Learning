import { DataSource, Repository } from "typeorm";
import BlUserPreference from "../model/BlUserPreference";
import { IUserPreferenceRepository } from "./IUserPreferenceRepository";
import { DBOperationResult } from "../../user/interfaces/UserModuleInterfaces";
export default class UserPreferenceSQLRepository extends Repository<BlUserPreference> implements IUserPreferenceRepository {
    private readonly datasource;
    constructor(datasource: DataSource);
    saveOrUpdateUserPreferences(userPreference: BlUserPreference): Promise<DBOperationResult>;
    updateUserPreferencePartially(userPreference: BlUserPreference, partial: object): Promise<DBOperationResult>;
    fetchUserPreferencesByEmail(userEmail: string): Promise<DBOperationResult>;
}
