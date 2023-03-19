import { DBOperationResult } from "../interfaces/UserModuleInterfaces";
import User from "../model/User";
export default class UserNoSQLRepository {
    createUser(user: User): Promise<DBOperationResult>;
}
