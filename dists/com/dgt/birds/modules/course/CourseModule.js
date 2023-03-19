"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const CourseController_1 = require("./controller/CourseController");
const CourseService_1 = require("./service/CourseService");
const UserPreferenceSQLRepository_1 = require("./repository/UserPreferenceSQLRepository");
const typeorm_1 = require("@nestjs/typeorm");
const BlUserPreference_1 = require("./model/BlUserPreference");
const UserSQLRepository_1 = require("../user/repository/UserSQLRepository");
const MessageSource_1 = require("../../config/MessageSource");
const CourseCategorySQLRepository_1 = require("./repository/CourseCategorySQLRepository");
const BravoCourseCategory_1 = require("./model/BravoCourseCategory");
const CourseSQLRepository_1 = require("./repository/CourseSQLRepository");
const CourseLessonSQLRepository_1 = require("./repository/CourseLessonSQLRepository");
const BlCourse_1 = require("./model/BlCourse");
const BlCourseLesson_1 = require("./model/BlCourseLesson");
const BravoCourseCategoryUser_1 = require("./model/BravoCourseCategoryUser");
const BravoCourseCategoryUserSQLRepository_1 = require("./repository/BravoCourseCategoryUserSQLRepository");
let CourseModule = class CourseModule {
};
CourseModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([BlUserPreference_1.default, BravoCourseCategory_1.default,
                BlCourse_1.default, BlCourseLesson_1.default, BravoCourseCategoryUser_1.default])
        ],
        controllers: [CourseController_1.default],
        providers: [
            CourseService_1.default, UserPreferenceSQLRepository_1.default, UserSQLRepository_1.default,
            CourseCategorySQLRepository_1.default, MessageSource_1.default,
            CourseSQLRepository_1.default, CourseLessonSQLRepository_1.default, BravoCourseCategoryUserSQLRepository_1.default
        ],
    })
], CourseModule);
exports.default = CourseModule;
//# sourceMappingURL=CourseModule.js.map