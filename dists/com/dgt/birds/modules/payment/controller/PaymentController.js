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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const PaymentApiPaths_1 = require("../constants/PaymentApiPaths");
const SaveCardDTO_1 = require("../dto/SaveCardDTO");
const PaymentService_1 = require("../service/PaymentService");
const GenericConstants_1 = require("../../../const/GenericConstants");
const ResponseDispatcher_1 = require("../../../config/ResponseDispatcher");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
        this.getAuthHeader = (request) => {
            const authHeader = request.get("Authorization") || GenericConstants_1.default.EMPTY_STRING;
            const authToken = authHeader.replace("Bearer ", GenericConstants_1.default.EMPTY_STRING);
            return authToken.trim();
        };
    }
    async handleSaveUserCard(req, res, requestDTO) {
        const authToken = this.getAuthHeader(req);
        const serviceResponse = await this.paymentService.saveUserCard(req.url, authToken, requestDTO);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleRemoveCard(req, res, cardNo) {
        const authToken = this.getAuthHeader(req);
        const serviceResponse = await this.paymentService.removeUserCard(req.url, authToken, cardNo);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
    async handleGetAllUserCards(req, res) {
        const authToken = this.getAuthHeader(req);
        const serviceResponse = await this.paymentService.getAllCardsForUser(req.url, authToken);
        return ResponseDispatcher_1.default.respond(res, serviceResponse);
    }
};
__decorate([
    (0, common_1.Post)(PaymentApiPaths_1.default.PAYMENT_SAVE_CARD),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: SaveCardDTO_1.SaveUserCardResponseDTO }),
    (0, swagger_1.ApiOperation)({ description: "This API is used to link a user card details that will be used later for payment. " }),
    (0, swagger_1.ApiHeader)({ name: "Authorization", description: "Authorization bearer token", required: true }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, SaveCardDTO_1.SaveUserCardRequestDTO]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "handleSaveUserCard", null);
__decorate([
    (0, common_1.Delete)(PaymentApiPaths_1.default.PAYMENT_REMOVE_CARD),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: SaveCardDTO_1.SaveUserCardResponseDTO }),
    (0, swagger_1.ApiOperation)({ description: "This API is used to unlink (i.e. remove) a user card details from the system. " }),
    (0, swagger_1.ApiHeader)({ name: "Authorization", description: "Authorization bearer token", required: true }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)("cardNo")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "handleRemoveCard", null);
__decorate([
    (0, common_1.Get)(PaymentApiPaths_1.default.PAYMENT_ALL_USER_CARDS),
    (0, swagger_1.ApiOkResponse)({ description: "Successful response", status: 200, type: SaveCardDTO_1.PaymentCardList }),
    (0, swagger_1.ApiOperation)({ description: "This API is used to get all cards associated to a user in the system. " }),
    (0, swagger_1.ApiHeader)({ name: "Authorization", description: "Authorization bearer token", required: true }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "handleGetAllUserCards", null);
PaymentController = __decorate([
    (0, swagger_1.ApiTags)("Payment Services"),
    (0, common_1.Controller)({ path: PaymentApiPaths_1.default.PAYMENT_BASE_URL }),
    __metadata("design:paramtypes", [PaymentService_1.default])
], PaymentController);
exports.default = PaymentController;
//# sourceMappingURL=PaymentController.js.map