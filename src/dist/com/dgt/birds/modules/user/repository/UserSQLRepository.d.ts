import IUserRepository from "./IUserRepository";
import { DataSource, Repository } from "typeorm";
import User from "../model/User";
import { DBOperationResult } from "../interfaces/UserModuleInterfaces";
export default class UserSQLRepository extends Repository<User> implements IUserRepository {
    private readonly datasource;
    constructor(datasource: DataSource);
    createUser(user: User): Promise<DBOperationResult>;
    createUserAndAuth(user: User): Promise<DBOperationResult>;
    findUserByEmail(email: string): Promise<DBOperationResult>;
    findUserByUsername(username: string): Promise<DBOperationResult>;
    updateUser(user: User, partial: object): Promise<DBOperationResult>;
    updateUserAndAuthAfterLogin(user: User, partial: object): Promise<DBOperationResult>;
    updateUserAndAuth(userPartial: object, userAuthPartial: object, user: User): Promise<DBOperationResult>;
    private getTransactionQueryRunner;
}
