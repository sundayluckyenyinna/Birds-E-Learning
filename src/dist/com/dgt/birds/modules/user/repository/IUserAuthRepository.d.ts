import UserAuth from "../model/UserAuth";
import { DBOperationResult } from "../interfaces/UserModuleInterfaces";
export default interface IUserAuthRepository {
    saveUserAuth(userAuth: UserAuth): Promise<DBOperationResult>;
    findUserAuthByEmail(userEmail: string): Promise<DBOperationResult>;
    updateUserAuth(userAuth: UserAuth, partial: object): Promise<DBOperationResult>;
}
