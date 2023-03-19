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
const UserLogin_1 = require("../model/UserLogin");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let LoginSQLRepository = class LoginSQLRepository extends typeorm_1.Repository {
    constructor(datasource) {
        super(UserLogin_1.default, datasource.createEntityManager());
        this.datasource = datasource;
    }
    async createLogin(login) {
        const result = { status: false, entity: null, errorMessage: undefined };
        try {
            await this.insert(login);
            result.status = true;
            result.entity = login;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
};
LoginSQLRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], LoginSQLRepository);
exports.default = LoginSQLRepository;
//# sourceMappingURL=LoginSQLRepository.js.map