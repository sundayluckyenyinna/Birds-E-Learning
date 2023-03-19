import User from "../../model/User";
export default class UserDetailsListDTO {
    responseCode: string;
    responseMessage: string;
    responseData: Array<User>;
}
export declare class UserDetailsDTO {
    responseCode: string;
    responseMessage: string;
    responseData: User;
}
