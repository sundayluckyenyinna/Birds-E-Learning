"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PaymentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const SaveCardDTO_1 = require("../dto/SaveCardDTO");
const ResponseDTO_1 = require("../../../config/ResponseDTO");
const ResponseCodes_1 = require("../../../const/ResponseCodes");
const LoggerFactory_1 = require("../../../config/LoggerFactory");
const PaymentSQLRepository_1 = require("../repository/PaymentSQLRepository");
const UserSQLRepository_1 = require("../../user/repository/UserSQLRepository");
const MessageSource_1 = require("../../../config/MessageSource");
const JwtTokenUtil_1 = require("../../../security/JwtTokenUtil");
const GenericConstants_1 = require("../../../const/GenericConstants");
const BlPaymentCard_1 = require("../model/BlPaymentCard");
const CardTypes_1 = require("../constants/CardTypes");
let PaymentService = PaymentService_1 = class PaymentService {
    constructor(paymentRepository, userRepository, messageSource) {
        this.paymentRepository = paymentRepository;
        this.userRepository = userRepository;
        this.messageSource = messageSource;
        this.logger = LoggerFactory_1.default.createLogger(PaymentService_1.name);
    }
    async saveUserCard(requestUrl, token, requestDTO) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let dbResult;
        const email = JwtTokenUtil_1.default.getEmailFromToken(token);
        dbResult = await this.userRepository.findUserByEmail(email);
        if (!dbResult.status) {
            this.logger.error(PaymentService_1.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const potentialUser = dbResult.entity;
        if (potentialUser === null || potentialUser === undefined) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            this.logger.info(PaymentService_1.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const sCard = (await this.paymentRepository.findUserCardByCardNo(requestDTO.cardNo)).entity;
        if (sCard !== null) {
            code = ResponseCodes_1.default.CARD_ALREADY_LINKED;
            message = this.messageSource.getMessage(code);
            this.logger.info(PaymentService_1.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const card = new BlPaymentCard_1.default();
        card.cardNo = requestDTO.cardNo;
        card.cvv = requestDTO.cvv;
        card.userEmail = potentialUser.emailAddress;
        card.userId = potentialUser.userId;
        card.cardType = PaymentService_1.getCardTypeFromCardNo(requestDTO.cardNo);
        card.expiryDate = requestDTO.expiryDate;
        card.createdDate = new Date();
        card.updatedAt = new Date();
        dbResult = await this.paymentRepository.saveUserPaymentCard(card);
        if (!dbResult.status) {
            this.logger.error(PaymentService_1.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const savedCard = dbResult.entity;
        const data = new SaveCardDTO_1.SaveOrRemoveUserResponseData();
        data.cardNo = savedCard.cardNo;
        data.cvv = savedCard.cvv;
        data.userId = savedCard.userId;
        data.userEmail = savedCard.userEmail;
        data.expiryDate = savedCard.expiryDate;
        data.createdDate = savedCard.createdDate;
        data.updatedAt = savedCard.updatedAt;
        data.cardType = savedCard.cardType;
        code = ResponseCodes_1.default.SUCCESS;
        message = this.messageSource.getMessage(code);
        return ResponseDTO_1.default.builder()
            .responseCode(code)
            .responseMessage(message)
            .responseData(data)
            .build();
    }
    async removeUserCard(requestUrl, token, cardNo) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let dbResult;
        if (!cardNo) {
            code = ResponseCodes_1.default.BAD_REQUEST;
            message = "No cardNo specified";
            this.logger.info(PaymentService_1.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const email = JwtTokenUtil_1.default.getEmailFromToken(token);
        dbResult = await this.userRepository.findUserByEmail(email);
        if (!dbResult.status) {
            this.logger.error(PaymentService_1.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const potentialUser = dbResult.entity;
        if (potentialUser === null || potentialUser === undefined) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            this.logger.info(PaymentService_1.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const sCard = (await this.paymentRepository.findUserCardByCardNo(cardNo)).entity;
        if (sCard === null) {
            code = ResponseCodes_1.default.CARD_RECORD_NOT_FOUND;
            message = this.messageSource.getMessage(code);
            this.logger.info(PaymentService_1.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        dbResult = await this.paymentRepository.removeUserPaymentCard(sCard);
        if (!dbResult.status) {
            this.logger.error(PaymentService_1.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const data = new SaveCardDTO_1.SaveOrRemoveUserResponseData();
        data.cardNo = sCard.cardNo;
        data.cardType = sCard.cardType;
        data.cvv = sCard.cvv;
        data.createdDate = sCard.createdDate;
        data.updatedAt = sCard.updatedAt;
        data.userEmail = sCard.userEmail;
        data.userId = sCard.userId;
        data.expiryDate = sCard.expiryDate;
        return ResponseDTO_1.default.builder()
            .responseCode(ResponseCodes_1.default.SUCCESS)
            .responseMessage(this.messageSource.getMessage(ResponseCodes_1.default.SUCCESS))
            .responseData(data)
            .build();
    }
    async getAllCardsForUser(requestUrl, token) {
        let code = ResponseCodes_1.default.SYSTEM_ERROR;
        let message = this.messageSource.getMessage(code);
        let dbResult;
        const email = JwtTokenUtil_1.default.getEmailFromToken(token);
        dbResult = await this.userRepository.findUserByEmail(email);
        if (!dbResult.status) {
            this.logger.error(PaymentService_1.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const potentialUser = dbResult.entity;
        if (potentialUser === null || potentialUser === undefined) {
            code = ResponseCodes_1.default.RECORD_NOT_EXIST;
            message = this.messageSource.getMessage(code);
            this.logger.info(PaymentService_1.getLogMessage(requestUrl, message));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        dbResult = await this.paymentRepository.findAllCardByUserEmail(potentialUser.emailAddress);
        if (!dbResult.status) {
            this.logger.error(PaymentService_1.getLogMessage(requestUrl, message, dbResult.errorMessage));
            return ResponseDTO_1.default.builder().responseCode(code).responseMessage(message).build();
        }
        const dataArray = [];
        const allCards = dbResult.entity;
        allCards.forEach((card) => {
            const data = new SaveCardDTO_1.SaveOrRemoveUserResponseData();
            data.userEmail = card.userEmail;
            data.userId = card.userId;
            data.cardNo = card.cardNo;
            data.cvv = card.cvv;
            data.cardType = card.cardType;
            data.expiryDate = card.expiryDate;
            data.updatedAt = card.updatedAt;
            data.createdDate = card.createdDate;
            dataArray.push(data);
        });
        return ResponseDTO_1.default.builder()
            .responseCode(ResponseCodes_1.default.SUCCESS)
            .responseMessage(this.messageSource.getMessage(ResponseCodes_1.default.SUCCESS))
            .responseData(dataArray)
            .build();
    }
    static getLogMessage(...messages) {
        return messages.join(GenericConstants_1.default.SINGLE_SPACE);
    }
    static getCardTypeFromCardNo(cardNo) {
        const start = cardNo.trim().charAt(0);
        let cardType = CardTypes_1.CardTypes.UNKNOWN;
        switch (start) {
            case "3": {
                cardType = CardTypes_1.CardTypes.AMERICAN_EXPRESS;
                break;
            }
            case "4": {
                cardType = CardTypes_1.CardTypes.VISA;
                break;
            }
            case "5": {
                cardType = CardTypes_1.CardTypes.MASTER;
                break;
            }
            case "6": {
                cardType = CardTypes_1.CardTypes.DISCOVER;
                break;
            }
            default: {
                cardType = CardTypes_1.CardTypes.UNKNOWN;
                break;
            }
        }
        return cardType;
    }
};
PaymentService = PaymentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [PaymentSQLRepository_1.default,
        UserSQLRepository_1.default,
        MessageSource_1.default])
], PaymentService);
exports.default = PaymentService;
//# sourceMappingURL=PaymentService.js.map