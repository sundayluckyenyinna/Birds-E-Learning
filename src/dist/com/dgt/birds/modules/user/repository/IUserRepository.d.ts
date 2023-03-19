import User from "../model/User";
import { DBOperationResult } from "../interfaces/UserModuleInterfaces";
import UserAuth from "../model/UserAuth";
export default interface IUserRepository {
    createUser(user: User): Promise<DBOperationResult>;
    createUserAndAuth(user: User, userAuth: UserAuth): Promise<DBOperationResult>;
    findUserByEmail(email: string): Promise<DBOperationResult>;
    findUserByUsername(username: string): Promise<DBOperationResult>;
    updateUser(user: User, partial: object): Promise<DBOperationResult>;
    updateUserAndAuthAfterLogin(user: User, partial: object): Promise<DBOperationResult>;
    updateUserAndAuth(userPartial: object, userAuthPartial: object, user: User): Promise<DBOperationResult>;
}
