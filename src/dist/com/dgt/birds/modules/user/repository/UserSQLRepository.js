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
const User_1 = require("../model/User");
const common_1 = require("@nestjs/common");
let UserSQLRepository = class UserSQLRepository extends typeorm_1.Repository {
    constructor(datasource) {
        super(User_1.default, datasource.createEntityManager());
        this.datasource = datasource;
    }
    async createUser(user) {
        const result = { status: false, entity: null };
        try {
            await this.insert(user);
            result.status = true;
            result.entity = user;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
    async createUserAndAuth(user) {
        const result = { status: false, entity: null, errorMessage: undefined };
        try {
            await this.insert(user);
            result.status = true;
            result.entity = user;
        }
        catch (error) {
            result.errorMessage = error.message;
        }
        return Promise.resolve(result);
    }
    async findUserByEmail(email) {
        const result = { status: false, entity: null };
        try {
            const userByEmail = await this.findOneBy({ emailAddress: email });
            result.status = true;
            result.entity = userByEmail;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
    async findUserByUsername(username) {
        const result = { status: false, entity: null };
        try {
            const userByUsername = await this.findOneBy({ username: username });
            result.status = true;
            result.entity = userByUsername;
        }
        catch (error) {
            console.log(error);
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
    async updateUser(user, partial) {
        const result = { status: false, entity: null };
        try {
            const updateResult = await this.update({ emailAddress: user.emailAddress }, partial);
            if (updateResult.affected > 0)
                result.status = true;
            result.entity = user;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
    async updateUserAndAuthAfterLogin(user, partial) {
        const result = { status: false, entity: null };
        try {
            await this.update({ emailAddress: user.emailAddress }, { lastLoginDate: user.lastLoginDate });
            await this.update({ emailAddress: user.emailAddress }, partial);
            result.status = true;
            result.entity = user;
        }
        catch (error) {
            result.errorMessage = error.message;
        }
        return Promise.resolve(result);
    }
    async updateUserAndAuth(userPartial, userAuthPartial, user) {
        const result = { status: false, entity: null };
        try {
            await this.update({ emailAddress: user.emailAddress }, { ...userPartial, ...userAuthPartial });
            result.status = true;
            result.entity = user;
        }
        catch (error) {
            result.errorMessage = error.message;
        }
        return Promise.resolve(result);
    }
    async getTransactionQueryRunner() {
        const queryRunner = this.datasource.createQueryRunner();
        await queryRunner.connect();
        return Promise.resolve(queryRunner);
    }
};
UserSQLRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UserSQLRepository);
exports.default = UserSQLRepository;
//# sourceMappingURL=UserSQLRepository.js.map