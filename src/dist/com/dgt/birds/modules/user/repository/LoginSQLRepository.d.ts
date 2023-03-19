import { ILoginSQLRepository } from "./ILoginSQLRepository";
import UserLogin from "../model/UserLogin";
import { DBOperationResult } from "../interfaces/UserModuleInterfaces";
import { DataSource, Repository } from "typeorm";
export default class LoginSQLRepository extends Repository<UserLogin> implements ILoginSQLRepository {
    private readonly datasource;
    constructor(datasource: DataSource);
    createLogin(login: UserLogin): Promise<DBOperationResult>;
}
