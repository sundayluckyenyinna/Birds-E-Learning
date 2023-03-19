import IUserAuthRepository from "./IUserAuthRepository";
import UserAuth from "../model/UserAuth";
import { DBOperationResult } from "../interfaces/UserModuleInterfaces";
import { DataSource, Repository } from "typeorm";
export default class UserAuthSQLRepository extends Repository<UserAuth> implements IUserAuthRepository {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    saveUserAuth(userAuth: UserAuth): Promise<DBOperationResult>;
    findUserAuthByEmail(userEmail: string): Promise<DBOperationResult>;
    updateUserAuth(userAuth: UserAuth, partial: object): Promise<DBOperationResult>;
}
