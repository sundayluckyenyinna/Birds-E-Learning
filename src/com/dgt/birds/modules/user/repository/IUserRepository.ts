/* eslint-disable */
import User from "../model/User";
import { DBOperationResult } from "../interfaces/UserModuleInterfaces";
import UserAuth from "../model/UserAuth";

export default interface IUserRepository
{
    // CREATION OPERATIONS.
    createUser(user: User): Promise<DBOperationResult>;
    createUserAndAuth(user: User, userAuth: UserAuth): Promise<DBOperationResult>;

    // RETRIEVAL OPERATIONS
    findUserByEmail(email: string): Promise<DBOperationResult>;
    findUserByUsername(username: string): Promise<DBOperationResult>;

    // UPDATE OPERATION.
    updateUser(user: User, partial: object): Promise<DBOperationResult>;
    updateUserAndAuthAfterLogin(user: User, partial: object): Promise<DBOperationResult>;
    updateUserAndAuth(userPartial: object, userAuthPartial: object, user: User): Promise<DBOperationResult>;

    // DELETE OPERATIONS
}