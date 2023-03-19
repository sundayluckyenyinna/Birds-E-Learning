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
const BlUserPreference_1 = require("../model/BlUserPreference");
const common_1 = require("@nestjs/common");
let UserPreferenceSQLRepository = class UserPreferenceSQLRepository extends typeorm_1.Repository {
    constructor(datasource) {
        super(BlUserPreference_1.default, datasource.createEntityManager());
        this.datasource = datasource;
    }
    async saveOrUpdateUserPreferences(userPreference) {
        const result = { status: false, entity: null, errorMessage: undefined };
        const potentialPreference = await this.findOne({ where: { userEmail: userPreference.userEmail } });
        if (potentialPreference === null || potentialPreference === undefined) {
            try {
                await this.insert(userPreference);
                result.status = true;
                result.entity = userPreference;
            }
            catch (error) {
                result.errorMessage = error;
            }
        }
        else {
            try {
                const preferenceNames = userPreference.preferenceNames;
                const updateDate = userPreference.updatedDate;
                const updateResult = await this.update({ userEmail: potentialPreference.userEmail }, { preferenceNames: preferenceNames, updatedDate: updateDate });
                const entity = (await this.fetchUserPreferencesByEmail(potentialPreference.userEmail)).entity;
                if (updateResult.affected > 0)
                    result.status = true;
                result.entity = entity;
            }
            catch (error) {
                result.errorMessage = error;
            }
        }
        return Promise.resolve(result);
    }
    async updateUserPreferencePartially(userPreference, partial) {
        const result = { status: false, entity: null, errorMessage: undefined };
        let email = userPreference.userEmail;
        if (Object(partial).emailAddress !== null && Object(partial).emailAddress !== undefined) {
            email = Object(partial).emailAddress;
        }
        try {
            const updateResult = await this.update({ userEmail: userPreference.userEmail }, partial);
            const entity = (await this.fetchUserPreferencesByEmail(email)).entity;
            result.status = true;
            result.entity = entity;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
    async fetchUserPreferencesByEmail(userEmail) {
        const result = { status: false, entity: null, errorMessage: undefined };
        try {
            const potentialPreference = await this.findOne({ where: { userEmail: userEmail } });
            result.status = true;
            result.entity = potentialPreference;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
};
UserPreferenceSQLRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UserPreferenceSQLRepository);
exports.default = UserPreferenceSQLRepository;
//# sourceMappingURL=UserPreferenceSQLRepository.js.map