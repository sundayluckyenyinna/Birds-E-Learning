/* eslint-disable */

import IUserRepository from "./IUserRepository";
import { DBOperationResult } from "../interfaces/UserModuleInterfaces";
import User from "../model/User";
import { Injectable } from "@nestjs/common";

Injectable()
export default class UserNoSQLRepository
{
  async createUser(user: User): Promise<DBOperationResult> {
    return Promise.resolve(undefined);
  }

}

