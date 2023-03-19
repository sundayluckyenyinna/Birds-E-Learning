import BlUserPreference from "../model/BlUserPreference";
import { DBOperationResult } from "../../user/interfaces/UserModuleInterfaces";
export interface IUserPreferenceRepository {
    saveOrUpdateUserPreferences(userPreference: BlUserPreference): Promise<DBOperationResult>;
    fetchUserPreferencesByEmail(userEmail: string): Promise<DBOperationResult>;
}
