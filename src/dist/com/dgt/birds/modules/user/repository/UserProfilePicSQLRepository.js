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
const UserProfilePicture_1 = require("../model/UserProfilePicture");
const common_1 = require("@nestjs/common");
let UserProfilePicSQLRepository = class UserProfilePicSQLRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(UserProfilePicture_1.default, dataSource.createEntityManager());
    }
    async createUserProfilePicture(profilePicture) {
        const result = { status: false, entity: null, errorMessage: undefined };
        try {
            const insertResult = await this.insert(profilePicture);
            result.status = true;
            result.entity = profilePicture;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
    async findProfilePictureByEmail(userEmail) {
        const result = { status: false, entity: null, errorMessage: undefined };
        try {
            const entity = await this.findOne({ where: { userEmail: userEmail } });
            result.status = true;
            result.entity = entity;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
    async updateProfilePicture(profilePicture, partial) {
        const result = { status: false, entity: null, errorMessage: undefined };
        try {
            const updateResult = await this.update({ userEmail: profilePicture.userEmail }, partial);
            const entity = await this.findOne({ where: { userEmail: profilePicture.userEmail } });
            result.status = true;
            result.entity = entity;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
};
UserProfilePicSQLRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UserProfilePicSQLRepository);
exports.default = UserProfilePicSQLRepository;
//# sourceMappingURL=UserProfilePicSQLRepository.js.map