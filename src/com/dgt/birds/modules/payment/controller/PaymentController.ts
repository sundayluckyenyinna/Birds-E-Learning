/* eslint-disable */

import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Post, Query, Req, Res } from "@nestjs/common";
import PaymentApiPaths from "../constants/PaymentApiPaths";
import { Request, Response } from 'express';
import { PaymentCardList, SaveUserCardRequestDTO, SaveUserCardResponseDTO } from "../dto/SaveCardDTO";
import PaymentService from "../service/PaymentService";
import GenericConstants from "../../../const/GenericConstants";
import ResponseDTO from "../../../config/ResponseDTO";
import ResponseDispatcher from "../../../config/ResponseDispatcher";

@ApiTags("Payment Services")
@Controller({ path: PaymentApiPaths.PAYMENT_BASE_URL })
export default class PaymentController{


    constructor( private readonly paymentService: PaymentService ) {
    }
    @Post(PaymentApiPaths.PAYMENT_SAVE_CARD)
    @ApiOkResponse({ description: "Successful response", status: 200, type: SaveUserCardResponseDTO })
    @ApiOperation({ description: "This API is used to link a user card details that will be used later for payment. "})
    @ApiHeader({ name: "Authorization", description: "Authorization bearer token", required: true })
    async handleSaveUserCard(@Req() req: Request, @Res() res: Response, @Body() requestDTO: SaveUserCardRequestDTO){
        const authToken: string = this.getAuthHeader(req);
        const serviceResponse: ResponseDTO = await this.paymentService.saveUserCard(req.url, authToken, requestDTO);
        return ResponseDispatcher.respond(res, serviceResponse);
    }

    @Delete(PaymentApiPaths.PAYMENT_REMOVE_CARD)
    @ApiOkResponse({ description: "Successful response", status: 200, type: SaveUserCardResponseDTO })
    @ApiOperation({ description: "This API is used to unlink (i.e. remove) a user card details from the system. "})
    @ApiHeader({ name: "Authorization", description: "Authorization bearer token", required: true })
    async handleRemoveCard(@Req() req: Request, @Res() res: Response, @Query("cardNo") cardNo: string){
       const authToken: string = this.getAuthHeader(req);
       const serviceResponse: ResponseDTO = await this.paymentService.removeUserCard(req.url, authToken, cardNo);
       return ResponseDispatcher.respond(res, serviceResponse);
    }

    @Get(PaymentApiPaths.PAYMENT_ALL_USER_CARDS)
    @ApiOkResponse({ description: "Successful response", status: 200, type: PaymentCardList })
    @ApiOperation({ description: "This API is used to get all cards associated to a user in the system. "})
    @ApiHeader({ name: "Authorization", description: "Authorization bearer token", required: true })
    async handleGetAllUserCards(@Req() req: Request, @Res() res: Response){
       const authToken: string = this.getAuthHeader(req);
       const serviceResponse: ResponseDTO = await this.paymentService.getAllCardsForUser(req.url, authToken);
       return ResponseDispatcher.respond(res, serviceResponse);
    }

    private getAuthHeader = (request: Request): string => {
      const authHeader: string = request.get("Authorization") || GenericConstants.EMPTY_STRING;
      const authToken: string = authHeader.replace("Bearer ", GenericConstants.EMPTY_STRING);
      return authToken.trim();
    }
}