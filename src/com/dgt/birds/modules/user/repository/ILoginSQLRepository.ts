/* eslint-disable */

import UserLogin from "../model/UserLogin";
import { DBOperationResult } from "../interfaces/UserModuleInterfaces";

export interface ILoginSQLRepository
{
   createLogin(login: UserLogin): Promise<DBOperationResult>;
}