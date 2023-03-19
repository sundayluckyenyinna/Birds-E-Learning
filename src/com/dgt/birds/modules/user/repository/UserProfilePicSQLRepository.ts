/* eslint-disable */

import { DataSource, InsertResult, Repository, UpdateResult } from "typeorm";
import UserProfilePicture from "../model/UserProfilePicture";
import { Injectable } from "@nestjs/common";
import { DBOperationResult } from "../interfaces/UserModuleInterfaces";

@Injectable()
export default class UserProfilePicSQLRepository extends Repository<UserProfilePicture>{
   constructor(dataSource: DataSource) {
     super(UserProfilePicture, dataSource.createEntityManager());
   }

   async createUserProfilePicture(profilePicture: UserProfilePicture): Promise<DBOperationResult>{
       const result: DBOperationResult = { status: false, entity: null, errorMessage: undefined };
       try{
          const insertResult: InsertResult = await this.insert(profilePicture);
          result.status = true; result.entity = profilePicture;
       }catch (error){
          result.errorMessage = error;
       }
       return Promise.resolve(result);
   }

   async findProfilePictureByEmail(userEmail: string): Promise<DBOperationResult>{
     const result: DBOperationResult = { status: false, entity: null, errorMessage: undefined }
      try{
        const entity: UserProfilePicture = await this.findOne({ where: { userEmail: userEmail }});
        result.status = true; result.entity = entity;
      }catch (error){
        result.errorMessage = error;
      }
      return Promise.resolve(result);
   }

   async updateProfilePicture(profilePicture: UserProfilePicture, partial: object): Promise<DBOperationResult>{
      const result: DBOperationResult = { status: false, entity: null, errorMessage: undefined }
     try{
        const updateResult: UpdateResult = await this.update({ userEmail: profilePicture.userEmail }, partial);
        const entity: UserProfilePicture = await this.findOne({ where: {userEmail: profilePicture.userEmail }});
        result.status = true; result.entity = entity;
     }catch (error){
        result.errorMessage = error;
     }
     return Promise.resolve(result);
   }

}