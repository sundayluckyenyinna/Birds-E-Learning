/* eslint-disable */

import CreateUserPreferenceRequestDTO from "../dto/request/CreateUserPreferenceRequestDTO";
import ResponseDTO from "../../../config/ResponseDTO";

export interface ICourseService
{
    saveOrUpdateUserPreferences(requestUrl: string, token: string, requestDTO: CreateUserPreferenceRequestDTO): Promise<ResponseDTO>;
    fetchUserPreferences(requestUrl: string, token: string,  userEmail: string): Promise<ResponseDTO>;
}