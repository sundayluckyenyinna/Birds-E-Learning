/* eslint-disable */
import IUserRepository from "./IUserRepository";
import { DataSource, QueryRunner, Repository, UpdateResult } from "typeorm";
import User from "../model/User";
import { Injectable } from "@nestjs/common";
import { DBOperationResult } from "../interfaces/UserModuleInterfaces";

@Injectable()
export default class UserSQLRepository extends Repository<User> implements IUserRepository
{
    constructor(private readonly datasource: DataSource) {
      super(User, datasource.createEntityManager());
    }

    // CREATION IMPLEMENTATION
    async createUser(user: User): Promise<DBOperationResult> {
        const result: DBOperationResult = {status: false, entity: null};
        try{
          await this.insert(user);
          result.status = true; result.entity = user;
        }catch (error){ result.errorMessage = error; }
        return Promise.resolve(result);
    }

    async createUserAndAuth(user: User): Promise<DBOperationResult> {
       const result: DBOperationResult = { status: false, entity: null, errorMessage: undefined };
      try{
        await this.insert(user);
        result.status = true; result.entity = user;
      }catch (error){
         result.errorMessage = error.message;
      }      return Promise.resolve(result);
    }


    // RETRIEVAL IMPLEMENTATION
    async findUserByEmail(email: string): Promise<DBOperationResult> {
      const result: DBOperationResult = {status: false, entity: null};
      try{
        const userByEmail: User | null = await this.findOneBy({ emailAddress: email });
        result.status = true; result.entity = userByEmail;
      }catch (error){ result.errorMessage = error; }
      return Promise.resolve(result);
    }

    async findUserByUsername(username: string): Promise<DBOperationResult> {
      const result: DBOperationResult = {status: false, entity: null};
      try{
        const userByUsername: User | null = await this.findOneBy({username: username});
        result.status = true; result.entity = userByUsername;
      }catch (error){
        console.log(error); result.errorMessage = error; }
      return Promise.resolve(result);
    }


    // UPDATE IMPLEMENTATION
  async updateUser(user:User, partial: object): Promise<DBOperationResult> {
    const result: DBOperationResult = {status: false, entity: null};
    try{
        const updateResult: UpdateResult = await this.update({emailAddress: user.emailAddress}, partial);
        if(updateResult.affected > 0)
          result.status = true; result.entity = user;
    } catch (error){
      result.errorMessage = error;
    }
    return Promise.resolve(result);
  }

  async updateUserAndAuthAfterLogin(user:User, partial: object): Promise<DBOperationResult> {
     const result: DBOperationResult = {status: false, entity: null};
     try{
        await this.update({ emailAddress: user.emailAddress }, { lastLoginDate: user.lastLoginDate })
        await this.update({ emailAddress: user.emailAddress }, partial);
        result.status = true; result.entity = user;
     }catch (error){
        result.errorMessage = error.message;
     }
     return Promise.resolve(result);
  }

    async updateUserAndAuth(userPartial: object, userAuthPartial: object, user: User): Promise<DBOperationResult>
    {
      const result: DBOperationResult = {status: false, entity: null};
      try{
        await this.update({ emailAddress: user.emailAddress }, { ...userPartial, ...userAuthPartial });
        result.status = true; result.entity = user;
      }catch (error){
        result.errorMessage = error.message;
      }
      return Promise.resolve(result);
    }

    private async getTransactionQueryRunner(): Promise<QueryRunner> {
        const queryRunner: QueryRunner = this.datasource.createQueryRunner();
        await queryRunner.connect();
        return Promise.resolve(queryRunner);
    }
}