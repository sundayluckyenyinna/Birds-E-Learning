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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const BlPaymentCard_1 = require("../model/BlPaymentCard");
const common_1 = require("@nestjs/common");
let PaymentSQLRepository = class PaymentSQLRepository extends typeorm_1.Repository {
    constructor(datasource) {
        super(BlPaymentCard_1.default, datasource.createEntityManager());
        this.datasource = datasource;
    }
    async saveUserPaymentCard(userCard) {
        const result = { status: false, entity: null, errorMessage: undefined };
        try {
            await this.insert(userCard);
            result.status = true;
            result.entity = userCard;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
    async removeUserPaymentCard(userCard) {
        const result = { status: false, entity: null, errorMessage: undefined };
        try {
            const removedCard = await this.remove(userCard);
            result.status = true;
            result.entity = removedCard;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
    async findUserCardByCardNo(cardNo) {
        const result = { status: false, entity: null, errorMessage: undefined };
        try {
            const potentialCard = await this.findOne({ where: { cardNo: cardNo } });
            result.status = true;
            result.entity = potentialCard;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
    async findAllCardByUserEmail(userEmail) {
        const result = { status: false, entity: null, errorMessage: undefined };
        try {
            const cards = await this.find({ where: { userEmail: userEmail } });
            result.status = true;
            result.entity = cards;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
    async updateCard(card, partial) {
        const result = { status: false, entity: null, errorMessage: undefined };
        try {
            const updateResult = await this.update({ userEmail: card.userEmail }, partial);
            const entity = await this.findUserCardByCardNo(card.cardNo);
            result.status = true;
            result.entity = entity;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
};
PaymentSQLRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], PaymentSQLRepository);
exports.default = PaymentSQLRepository;
//# sourceMappingURL=PaymentSQLRepository.js.map