/* eslint-disable */

import { DataSource, Repository, UpdateResult } from "typeorm";
import BlPaymentCard from "../model/BlPaymentCard";
import { IPaymentRepository } from "./IPaymentRepository";
import { DBOperationResult } from "../../user/interfaces/UserModuleInterfaces";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class PaymentSQLRepository extends Repository<BlPaymentCard> implements IPaymentRepository
{
    constructor(private readonly datasource: DataSource) {
      super(BlPaymentCard, datasource.createEntityManager());
    }
    async saveUserPaymentCard(userCard: BlPaymentCard): Promise<DBOperationResult>{
        const result: DBOperationResult = { status: false, entity: null, errorMessage: undefined };
        try{
           await this.insert(userCard);
           result.status = true; result.entity = userCard;
        }catch (error){
          result.errorMessage = error;
        }
        return Promise.resolve(result);
    }

    async removeUserPaymentCard(userCard: BlPaymentCard): Promise<DBOperationResult>{
      const result: DBOperationResult = { status: false, entity: null, errorMessage: undefined };
      try{
         const removedCard: BlPaymentCard = await this.remove(userCard);
         result.status = true; result.entity = removedCard;
      }catch (error){
          result.errorMessage = error;
      }
      return Promise.resolve(result);
    }

    async findUserCardByCardNo(cardNo: string): Promise<DBOperationResult>{
      const result: DBOperationResult = { status: false, entity: null, errorMessage: undefined };
       try{
          const potentialCard: BlPaymentCard = await this.findOne({ where: { cardNo: cardNo }});
          result.status = true; result.entity = potentialCard;
       }catch (error){
         result.errorMessage = error;
       }
       return Promise.resolve(result);
    }

    async findAllCardByUserEmail(userEmail: string): Promise<DBOperationResult>{
      const result: DBOperationResult = { status: false, entity: null, errorMessage: undefined };
      try{
         const cards: Array<BlPaymentCard> = await this.find({ where: {userEmail: userEmail}});
         result.status = true; result.entity = cards;
      } catch (error){
        result.errorMessage = error;
      }
      return Promise.resolve(result);
    }

    async updateCard(card: BlPaymentCard, partial: object): Promise<DBOperationResult>{
      const result: DBOperationResult = { status: false, entity: null, errorMessage: undefined };
       try{
          const updateResult: UpdateResult = await this.update({ userEmail: card.userEmail }, partial);
          const entity = await this.findUserCardByCardNo(card.cardNo);
          result.status = true; result.entity = entity;
       }catch (error){
         result.errorMessage = error;
       }
       return Promise.resolve(result);
    }

}