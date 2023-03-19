/* eslint-disable */

import BlUserPreference from "../model/BlUserPreference";
import { DBOperationResult } from "../../user/interfaces/UserModuleInterfaces";
import ResponseDTO from "../../../config/ResponseDTO";

export interface IUserPreferenceRepository {
  saveOrUpdateUserPreferences(userPreference: BlUserPreference): Promise<DBOperationResult>;
  fetchUserPreferencesByEmail(userEmail: string): Promise<DBOperationResult>;
}