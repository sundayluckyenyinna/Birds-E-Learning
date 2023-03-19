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
const UserAuth_1 = require("../model/UserAuth");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let UserAuthSQLRepository = class UserAuthSQLRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(UserAuth_1.default, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async saveUserAuth(userAuth) {
        const result = { status: false, entity: null, errorMessage: undefined };
        try {
            const r = await this.insert(userAuth);
            result.status = true;
            result.entity = userAuth;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
    async findUserAuthByEmail(userEmail) {
        const result = { status: false, entity: null, errorMessage: undefined };
        try {
            const userAuth = await this.findOneBy({ userEmailAddress: userEmail });
            result.status = true;
            result.entity = userAuth;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
    async updateUserAuth(userAuth, partial) {
        const result = { status: false, entity: null, errorMessage: undefined };
        try {
            await this.update({ userEmailAddress: userAuth.userEmailAddress }, partial);
            result.status = true;
            result.entity = userAuth;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
};
UserAuthSQLRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UserAuthSQLRepository);
exports.default = UserAuthSQLRepository;
//# sourceMappingURL=UserAuthSQLRepository.js.map