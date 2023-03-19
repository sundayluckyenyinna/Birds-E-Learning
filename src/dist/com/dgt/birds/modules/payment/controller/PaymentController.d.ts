import { Request, Response } from 'express';
import { SaveUserCardRequestDTO } from "../dto/SaveCardDTO";
import PaymentService from "../service/PaymentService";
export default class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    handleSaveUserCard(req: Request, res: Response, requestDTO: SaveUserCardRequestDTO): Promise<Response<any, Record<string, any>>>;
    handleRemoveCard(req: Request, res: Response, cardNo: string): Promise<Response<any, Record<string, any>>>;
    handleGetAllUserCards(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    private getAuthHeader;
}
