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
const BravoCourseCategoryUser_1 = require("../model/BravoCourseCategoryUser");
const CourseSQLRepository_1 = require("./CourseSQLRepository");
const common_1 = require("@nestjs/common");
const ApplicationPropertyConfig_1 = require("../../../config/ApplicationPropertyConfig");
const environment = ApplicationPropertyConfig_1.default;
const defaultQueryLimit = Number(environment.getProperty("birds.entities.defaultQueryLimit"));
let BravoCourseCategoryUserSQLRepository = class BravoCourseCategoryUserSQLRepository extends typeorm_1.Repository {
    constructor(dataSource, courseRepository) {
        super(BravoCourseCategoryUser_1.default, dataSource.createEntityManager());
        this.dataSource = dataSource;
        this.courseRepository = courseRepository;
    }
    async getCourseIdsByOccurrence(limit) {
        const courseIdsObject = await this.createQueryBuilder("bravo_course_user")
            .select("course_id as courseId")
            .distinct(true)
            .limit(limit || defaultQueryLimit)
            .execute();
        const courseIds = courseIdsObject.map(obj => obj.courseId);
        const courseIdsAndCount = [];
        for (let i = 0; i < courseIds.length; i++) {
            const courseId = courseIds[i];
            const countForId = await this.count({ where: { courseId: courseId } });
            courseIdsAndCount.push([courseId, countForId]);
        }
        return courseIdsAndCount.sort((a, b) => b[1] - a[1]);
    }
};
BravoCourseCategoryUserSQLRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        CourseSQLRepository_1.default])
], BravoCourseCategoryUserSQLRepository);
exports.default = BravoCourseCategoryUserSQLRepository;
//# sourceMappingURL=BravoCourseCategoryUserSQLRepository.js.map