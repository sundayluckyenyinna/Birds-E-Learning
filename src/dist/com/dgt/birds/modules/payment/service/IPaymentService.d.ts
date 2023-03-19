import { SaveUserCardRequestDTO } from "../dto/SaveCardDTO";
import ResponseDTO from "../../../config/ResponseDTO";
export interface IPaymentService {
    saveUserCard(requestUrl: string, token: string, requestDTO: SaveUserCardRequestDTO): Promise<ResponseDTO>;
    removeUserCard(requestUrl: string, token: string, cardNo: string): Promise<ResponseDTO>;
}
