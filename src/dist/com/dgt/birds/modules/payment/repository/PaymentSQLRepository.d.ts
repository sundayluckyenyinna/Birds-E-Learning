import { DataSource, Repository } from "typeorm";
import BlPaymentCard from "../model/BlPaymentCard";
import { IPaymentRepository } from "./IPaymentRepository";
import { DBOperationResult } from "../../user/interfaces/UserModuleInterfaces";
export default class PaymentSQLRepository extends Repository<BlPaymentCard> implements IPaymentRepository {
    private readonly datasource;
    constructor(datasource: DataSource);
    saveUserPaymentCard(userCard: BlPaymentCard): Promise<DBOperationResult>;
    removeUserPaymentCard(userCard: BlPaymentCard): Promise<DBOperationResult>;
    findUserCardByCardNo(cardNo: string): Promise<DBOperationResult>;
    findAllCardByUserEmail(userEmail: string): Promise<DBOperationResult>;
    updateCard(card: BlPaymentCard, partial: object): Promise<DBOperationResult>;
}
