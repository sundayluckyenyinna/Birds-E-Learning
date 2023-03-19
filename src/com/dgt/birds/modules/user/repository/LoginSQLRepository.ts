/* eslint-disable */

import { ILoginSQLRepository } from "./ILoginSQLRepository";
import UserLogin from "../model/UserLogin";
import { DBOperationResult } from "../interfaces/UserModuleInterfaces";
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";


@Injectable()
export default class LoginSQLRepository extends Repository<UserLogin> implements ILoginSQLRepository{
  constructor(private readonly datasource: DataSource) {
    super(UserLogin, datasource.createEntityManager());
  }

  async createLogin(login: UserLogin): Promise<DBOperationResult> {
      const result: DBOperationResult = { status: false, entity: null, errorMessage: undefined };
      try{
          await this.insert(login);
          result.status = true; result.entity = login;
      }catch (error){
          result.errorMessage = error;
      }
      return Promise.resolve(result);
  }

}