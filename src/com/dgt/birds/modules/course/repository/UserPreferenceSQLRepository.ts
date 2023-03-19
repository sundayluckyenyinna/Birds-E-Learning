/* eslint-disable*/
import { DataSource, Repository, UpdateResult } from "typeorm";
import BlUserPreference from "../model/BlUserPreference";
import { IUserPreferenceRepository } from "./IUserPreferenceRepository";
import { Injectable } from "@nestjs/common";
import { DBOperationResult } from "../../user/interfaces/UserModuleInterfaces";

@Injectable()
export default class UserPreferenceSQLRepository extends Repository<BlUserPreference> implements IUserPreferenceRepository
{
    constructor(private readonly datasource: DataSource) {
      super(BlUserPreference, datasource.createEntityManager());
    }

    async saveOrUpdateUserPreferences(userPreference: BlUserPreference): Promise<DBOperationResult>{
        const result: DBOperationResult = { status: false, entity: null, errorMessage: undefined };
        const potentialPreference: BlUserPreference = await this.findOne({ where: { userEmail: userPreference.userEmail }});
        if(potentialPreference === null || potentialPreference === undefined){
          try{
            await this.insert(userPreference);
            result.status = true; result.entity = userPreference;
          }catch (error){
             result.errorMessage = error;
          }
        }else{
           try{
             const preferenceNames: Array<string> = userPreference.preferenceNames;
             const updateDate: Date = userPreference.updatedDate;
             const updateResult = await this.update({ userEmail: potentialPreference.userEmail }, { preferenceNames: preferenceNames, updatedDate: updateDate })
             const entity = (await this.fetchUserPreferencesByEmail(potentialPreference.userEmail)).entity;
             if(updateResult.affected > 0)
               result.status = true; result.entity = entity;
           }catch (error){
              result.errorMessage = error;
           }
        }
        return Promise.resolve(result);
    }

    async updateUserPreferencePartially(userPreference: BlUserPreference, partial: object): Promise<DBOperationResult>{
      const result: DBOperationResult = { status: false, entity: null, errorMessage: undefined };
      let email: string = userPreference.userEmail;
      if(Object(partial).emailAddress !== null && Object(partial).emailAddress !== undefined){
        email = Object(partial).emailAddress;
      }
      try{
         const updateResult: UpdateResult = await this.update({ userEmail: userPreference.userEmail }, partial);
         const entity = (await this.fetchUserPreferencesByEmail(email)).entity;
         result.status = true; result.entity = entity;
      }catch (error){
          result.errorMessage = error;
      }
      return Promise.resolve(result);
    }

    async fetchUserPreferencesByEmail(userEmail: string): Promise<DBOperationResult> {
      const result: DBOperationResult = { status: false, entity: null, errorMessage: undefined };
      try{
         const potentialPreference: BlUserPreference | null = await this.findOne({ where: {userEmail: userEmail }});
         result.status = true; result.entity = potentialPreference;
      } catch (error){
        result.errorMessage = error;
      }
      return Promise.resolve(result);
    }


}