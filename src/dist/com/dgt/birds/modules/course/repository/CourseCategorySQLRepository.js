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
const BravoCourseCategory_1 = require("../model/BravoCourseCategory");
const common_1 = require("@nestjs/common");
const CourseSQLRepository_1 = require("./CourseSQLRepository");
const CourseLessonSQLRepository_1 = require("./CourseLessonSQLRepository");
const BravoCourseCategoryUserSQLRepository_1 = require("./BravoCourseCategoryUserSQLRepository");
const ApplicationPropertyConfig_1 = require("../../../config/ApplicationPropertyConfig");
const environment = ApplicationPropertyConfig_1.default;
const defaultQueryLimit = Number(environment.getProperty("birds.entities.defaultQueryLimit"));
let CourseCategorySQLRepository = class CourseCategorySQLRepository extends typeorm_1.Repository {
    constructor(dataSource, courseRepository, courseLessonRepository, courseCategoryUserRepository) {
        super(BravoCourseCategory_1.default, dataSource.createEntityManager());
        this.dataSource = dataSource;
        this.courseRepository = courseRepository;
        this.courseLessonRepository = courseLessonRepository;
        this.courseCategoryUserRepository = courseCategoryUserRepository;
    }
    async fetchAllCourseCategories() {
        const result = { status: false, entity: null, errorMessage: undefined };
        try {
            const allCourseCategories = await this.find();
            result.status = true;
            result.entity = allCourseCategories;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
    async fetchAllCourseCategoriesNestedGraph() {
        const result = { status: false, entity: null, errorMessage: undefined };
        try {
            const entity = [];
            let categories = await this.find();
            categories = categories
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                const courses = (await this.courseRepository.fetchAllCourseByCategoryId(1)).entity;
                for (let j = 0; j < courses.length; j++) {
                    const course = courses[j];
                    course.lessons = (await this.courseLessonRepository.fetchAllCourseLessonByCourseId(course.id)).entity;
                }
                category.courses = courses;
                entity.push(category);
            }
            result.status = true;
            result.entity = entity;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
    async fetchAllCourseCategoriesNestedGraphByPreferenceNames(preferenceNames, limit) {
        const result = { status: false, entity: null, errorMessage: undefined };
        try {
            const entity = [];
            let categories = await this.find({ where: { name: (0, typeorm_1.In)(preferenceNames) }, take: limit || defaultQueryLimit });
            categories = categories
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                const courses = (await this.courseRepository.fetchAllCourseByCategoryId(category.id)).entity;
                for (let j = 0; j < courses.length; j++) {
                    const course = courses[j];
                    course.lessons = (await this.courseLessonRepository.fetchAllCourseLessonByCourseId(course.id)).entity;
                }
                category.courses = courses;
                entity.push(category);
            }
            result.status = true;
            result.entity = entity;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
    async fetchAllQuickCourseNestedCategories(size) {
        const result = { status: false, entity: null, errorMessage: undefined };
        const limit = size || defaultQueryLimit;
        try {
            const entity = [];
            let categories = await this.find({ order: { createdAt: 'DESC' }, take: limit });
            categories = categories
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                const courses = (await this.courseRepository.fetchAllCourseByCategoryId(category.id)).entity;
                for (let j = 0; j < courses.length; j++) {
                    const course = courses[j];
                    course.lessons = (await this.courseLessonRepository.fetchAllCourseLessonByCourseId(course.id)).entity;
                }
                category.courses = courses;
                entity.push(category);
            }
            result.status = true;
            result.entity = entity;
        }
        catch (error) {
        }
        return Promise.resolve(result);
    }
    async fetchTrendingCategoriesNested(limit) {
        const result = { status: false, entity: null, errorMessage: undefined };
        try {
            const courseIdsAndCount = await this.courseCategoryUserRepository.getCourseIdsByOccurrence(limit || defaultQueryLimit);
            const courseCategoryMap = {};
            const distinctCategories = [];
            for (let i = 0; i < courseIdsAndCount.length; i++) {
                const courseIdAndCount = courseIdsAndCount[i];
                const courseId = courseIdAndCount[0];
                const course = await this.courseRepository.findOne({ where: { id: courseId } });
                course.lessons = await this.courseLessonRepository.find({ where: { courseId: courseId } });
                const categoryId = course.categoryId;
                let courses = Object(courseCategoryMap)[categoryId];
                if (courses === undefined) {
                    courses = [];
                    courses.push(course);
                    Object(courseCategoryMap)[categoryId] = courses;
                }
                else {
                    courses.push(course);
                    Object(courseCategoryMap)[categoryId] = courses;
                }
            }
            const categoryIds = Object.keys(courseCategoryMap).map(key => Number(key));
            for (let j = 0; j < categoryIds.length; j++) {
                const categoryId = categoryIds[j];
                const courseCategory = await this.findOne({ where: { id: categoryId } });
                courseCategory.courses = courseCategoryMap[categoryId];
                distinctCategories.push(courseCategory);
            }
            result.status = true;
            result.entity = distinctCategories;
        }
        catch (error) {
            result.errorMessage = error;
        }
        return Promise.resolve(result);
    }
};
CourseCategorySQLRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        CourseSQLRepository_1.default,
        CourseLessonSQLRepository_1.default,
        BravoCourseCategoryUserSQLRepository_1.default])
], CourseCategorySQLRepository);
exports.default = CourseCategorySQLRepository;
//# sourceMappingURL=CourseCategorySQLRepository.js.map