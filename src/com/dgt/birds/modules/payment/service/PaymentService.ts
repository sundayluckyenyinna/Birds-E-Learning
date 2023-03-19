/* eslint-disable */

import { IPaymentService } from "./IPaymentService";
import { Injectable } from "@nestjs/common";
import { SaveUserCardRequestDTO, SaveOrRemoveUserResponseData } from "../dto/SaveCardDTO";
import ResponseDTO from "../../../config/ResponseDTO";
import ResponseCodes from "../../../const/ResponseCodes";
import LoggerFactory from "../../../config/LoggerFactory";
import PaymentSQLRepository from "../repository/PaymentSQLRepository";
import UserSQLRepository from "../../user/repository/UserSQLRepository";
import MessageSource from "../../../config/MessageSource";
import { DBOperationResult } from "../../user/interfaces/UserModuleInterfaces";
import JwtTokenUtil from "../../../security/JwtTokenUtil";
import GenericConstants from "../../../const/GenericConstants";
import User from "../../user/model/User";
import BlPaymentCard from "../model/BlPaymentCard";
import { CardTypes } from "../constants/CardTypes";


@Injectable()
export default class PaymentService implements IPaymentService{

  logger: LoggerFactory = LoggerFactory.createLogger(PaymentService.name);

  constructor(
    private readonly paymentRepository: PaymentSQLRepository,
    private readonly userRepository: UserSQLRepository,
    private messageSource: MessageSource
  )
  {}
  async saveUserCard(requestUrl: string, token: string, requestDTO: SaveUserCardRequestDTO): Promise<ResponseDTO> {
     let code:string = ResponseCodes.SYSTEM_ERROR;
     let message: string = this.messageSource.getMessage(code);
     let dbResult: DBOperationResult;

     // First check that the user exist in the system
     const email: string = JwtTokenUtil.getEmailFromToken(token);
     dbResult = await this.userRepository.findUserByEmail(email);
     if(!dbResult.status){
        this.logger.error(PaymentService.getLogMessage(requestUrl, message, dbResult.errorMessage));
        return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
     }

     const potentialUser: User = dbResult.entity as User;
     if(potentialUser === null || potentialUser === undefined){
        code = ResponseCodes.RECORD_NOT_EXIST;
        message = this.messageSource.getMessage(code);
        this.logger.info(PaymentService.getLogMessage(requestUrl, message));
        return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
     }

     // Check that the card is not already saved
    const sCard: BlPaymentCard = (await this.paymentRepository.findUserCardByCardNo(requestDTO.cardNo)).entity as BlPaymentCard;
     if(sCard !== null){
       code = ResponseCodes.CARD_ALREADY_LINKED;
       message = this.messageSource.getMessage(code);
       this.logger.info(PaymentService.getLogMessage(requestUrl, message));
       return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
     }

     const card: BlPaymentCard = new BlPaymentCard();
     card.cardNo = requestDTO.cardNo;
     card.cvv = requestDTO.cvv;
     card.userEmail = potentialUser.emailAddress;
     card.userId = potentialUser.userId;
     card.cardType = PaymentService.getCardTypeFromCardNo(requestDTO.cardNo);
     card.expiryDate = requestDTO.expiryDate;
     card.createdDate = new Date();
     card.updatedAt = new Date();

     dbResult = await this.paymentRepository.saveUserPaymentCard(card);
     if(!dbResult.status){
        this.logger.error(PaymentService.getLogMessage(requestUrl, message, dbResult.errorMessage));
        return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
     }

     const savedCard: BlPaymentCard = dbResult.entity as BlPaymentCard;
     const data: SaveOrRemoveUserResponseData = new SaveOrRemoveUserResponseData();
     data.cardNo = savedCard.cardNo;
     data.cvv = savedCard.cvv;
     data.userId = savedCard.userId;
     data.userEmail = savedCard.userEmail;
     data.expiryDate = savedCard.expiryDate;
     data.createdDate = savedCard.createdDate;
     data.updatedAt = savedCard.updatedAt;
     data.cardType = savedCard.cardType;
     code = ResponseCodes.SUCCESS;
     message = this.messageSource.getMessage(code);
     return ResponseDTO.builder()
       .responseCode(code)
       .responseMessage(message)
       .responseData(data)
       .build();
  }

    async removeUserCard(requestUrl: string, token: string, cardNo: string): Promise<ResponseDTO> {
      let code:string = ResponseCodes.SYSTEM_ERROR;
      let message: string = this.messageSource.getMessage(code);
      let dbResult: DBOperationResult;

      if(!cardNo){
         code = ResponseCodes.BAD_REQUEST;
         message = "No cardNo specified";
         this.logger.info(PaymentService.getLogMessage(requestUrl, message));
         return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

      // First check that the user exist in the system
      const email: string = JwtTokenUtil.getEmailFromToken(token);
      dbResult = await this.userRepository.findUserByEmail(email);
      if(!dbResult.status){
        this.logger.error(PaymentService.getLogMessage(requestUrl, message, dbResult.errorMessage));
        return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
      }

        const potentialUser: User = dbResult.entity as User;
        if(potentialUser === null || potentialUser === undefined){
          code = ResponseCodes.RECORD_NOT_EXIST;
          message = this.messageSource.getMessage(code);
          this.logger.info(PaymentService.getLogMessage(requestUrl, message));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
        }

        // Check that the card exist in the first place
       const sCard: BlPaymentCard = (await this.paymentRepository.findUserCardByCardNo(cardNo)).entity as BlPaymentCard;
        if(sCard === null){
           code = ResponseCodes.CARD_RECORD_NOT_FOUND;
           message = this.messageSource.getMessage(code);
           this.logger.info(PaymentService.getLogMessage(requestUrl, message));
           return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
        }

        dbResult = await this.paymentRepository.removeUserPaymentCard(sCard);
        if(!dbResult.status){
           this.logger.error(PaymentService.getLogMessage(requestUrl, message, dbResult.errorMessage));
           return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
        }

        const data: SaveOrRemoveUserResponseData = new SaveOrRemoveUserResponseData();
        data.cardNo = sCard.cardNo;
        data.cardType = sCard.cardType;
        data.cvv = sCard.cvv;
        data.createdDate = sCard.createdDate;
        data.updatedAt = sCard.updatedAt;
        data.userEmail = sCard.userEmail;
        data.userId = sCard.userId;
        data.expiryDate = sCard.expiryDate;

        return ResponseDTO.builder()
          .responseCode(ResponseCodes.SUCCESS)
          .responseMessage(this.messageSource.getMessage(ResponseCodes.SUCCESS))
          .responseData(data)
          .build();
    }

    async getAllCardsForUser(requestUrl: string, token: string): Promise<ResponseDTO>{
        let code:string = ResponseCodes.SYSTEM_ERROR;
        let message: string = this.messageSource.getMessage(code);
        let dbResult: DBOperationResult;

        // First check that the user exist in the system
        const email: string = JwtTokenUtil.getEmailFromToken(token);
        dbResult = await this.userRepository.findUserByEmail(email);
        if(!dbResult.status){
          this.logger.error(PaymentService.getLogMessage(requestUrl, message, dbResult.errorMessage));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
        }

        const potentialUser: User = dbResult.entity as User;
        if(potentialUser === null || potentialUser === undefined){
          code = ResponseCodes.RECORD_NOT_EXIST;
          message = this.messageSource.getMessage(code);
          this.logger.info(PaymentService.getLogMessage(requestUrl, message));
          return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
        }

        // Fetch all the cards for the user
        dbResult = await this.paymentRepository.findAllCardByUserEmail(potentialUser.emailAddress);
        if(!dbResult.status){
           this.logger.error(PaymentService.getLogMessage(requestUrl, message, dbResult.errorMessage));
           return ResponseDTO.builder().responseCode(code).responseMessage(message).build();
        }

        const dataArray: Array<SaveOrRemoveUserResponseData> = [];
        const allCards: Array<BlPaymentCard> = dbResult.entity as Array<BlPaymentCard>;
        allCards.forEach((card: BlPaymentCard) => {
           const data: SaveOrRemoveUserResponseData = new SaveOrRemoveUserResponseData();
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

        return ResponseDTO.builder()
          .responseCode(ResponseCodes.SUCCESS)
          .responseMessage(this.messageSource.getMessage(ResponseCodes.SUCCESS))
          .responseData(dataArray)
          .build();
    }

    private static getLogMessage(...messages): string{
        return messages.join(GenericConstants.SINGLE_SPACE);
    }

    private static getCardTypeFromCardNo(cardNo: string): string {
        const start: string = cardNo.trim().charAt(0);
        let cardType: string = CardTypes.UNKNOWN;
        switch (start){
          case "3": { cardType = CardTypes.AMERICAN_EXPRESS; break; }
          case "4": { cardType = CardTypes.VISA; break; }
          case "5": { cardType = CardTypes.MASTER; break; }
          case "6": { cardType = CardTypes.DISCOVER; break; }
          default: { cardType = CardTypes.UNKNOWN; break; }
        }
        return cardType;
    }
}