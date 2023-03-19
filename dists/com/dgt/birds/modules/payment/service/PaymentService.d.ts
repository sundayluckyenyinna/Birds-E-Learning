import { IPaymentService } from "./IPaymentService";
import { SaveUserCardRequestDTO } from "../dto/SaveCardDTO";
import ResponseDTO from "../../../config/ResponseDTO";
import LoggerFactory from "../../../config/LoggerFactory";
import PaymentSQLRepository from "../repository/PaymentSQLRepository";
import UserSQLRepository from "../../user/repository/UserSQLRepository";
import MessageSource from "../../../config/MessageSource";
export default class PaymentService implements IPaymentService {
    private readonly paymentRepository;
    private readonly userRepository;
    private messageSource;
    logger: LoggerFactory;
    constructor(paymentRepository: PaymentSQLRepository, userRepository: UserSQLRepository, messageSource: MessageSource);
    saveUserCard(requestUrl: string, token: string, requestDTO: SaveUserCardRequestDTO): Promise<ResponseDTO>;
    removeUserCard(requestUrl: string, token: string, cardNo: string): Promise<ResponseDTO>;
    getAllCardsForUser(requestUrl: string, token: string): Promise<ResponseDTO>;
    private static getLogMessage;
    private static getCardTypeFromCardNo;
}
