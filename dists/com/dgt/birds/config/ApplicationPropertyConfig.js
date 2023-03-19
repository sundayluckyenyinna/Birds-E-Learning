"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ApplicationPropertyConfig_1;
Object.defineProperty(exports, "__esModule", { value: true });
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const common_1 = require("@nestjs/common");
const process = require("process");
const config_1 = require("@nestjs/config");
const ZooItemKeeper_1 = require("./ZooItemKeeper");
let ApplicationPropertyConfig = ApplicationPropertyConfig_1 = class ApplicationPropertyConfig {
};
ApplicationPropertyConfig.logger = new common_1.Logger("Birds-E-Learning");
ApplicationPropertyConfig.ApplicationProperties = () => {
    return config_1.ConfigModule.forRoot({
        load: [ApplicationPropertyConfig_1.loadPropertiesOrFail],
        isGlobal: true,
        cache: true
    });
};
ApplicationPropertyConfig.loadPropertiesOrFail = () => {
    const mainResourceYamlFile = "application.yml";
    const allResourceFiles = ApplicationPropertyConfig_1.getAllResources();
    if (!allResourceFiles.includes(mainResourceYamlFile)) {
        throw Error('No main resource found: Could not find mandatory application.yaml file!');
    }
    const allYamlFiles = allResourceFiles.filter(file => file.endsWith(".yml"));
    const mainResourceFileDoc = ApplicationPropertyConfig_1.getRecordsFromResourceYamlFile(mainResourceYamlFile);
    const activeProfile = mainResourceFileDoc.birds.profiles.active || 'default';
    if (activeProfile === 'default') {
        return mainResourceFileDoc;
    }
    const propertyFilePath = ['application', '-', activeProfile.trim(), '.yml'].join('');
    if (!allYamlFiles.includes(propertyFilePath)) {
        throw Error('Could not find property file: '.concat(propertyFilePath).concat(' due to profile: ').concat(activeProfile).concat(' set in ').concat(mainResourceYamlFile).concat(' file'));
    }
    ZooItemKeeper_1.default.setItem(ZooItemKeeper_1.Item.ACTIVE_PROFILE, activeProfile);
    ApplicationPropertyConfig_1.profile = activeProfile;
    return ApplicationPropertyConfig_1.getRecordsFromResourceYamlFile(propertyFilePath);
};
ApplicationPropertyConfig.getRecordsFromResourceYamlFile = (fileName) => {
    const appConfigRecords = yaml.load(fs.readFileSync(ApplicationPropertyConfig_1
        .getResource(fileName), 'utf8'));
    ZooItemKeeper_1.default.setItem(ZooItemKeeper_1.Item.APP_CONFIG, appConfigRecords);
    return appConfigRecords;
};
ApplicationPropertyConfig.getResource = (resourceFile) => {
    return path.join(ApplicationPropertyConfig_1.getResourceDir(), resourceFile);
};
ApplicationPropertyConfig.getResourceDir = () => {
    return path.join(process.cwd(), 'resources');
};
ApplicationPropertyConfig.getAllResources = () => {
    return fs.readdirSync(ApplicationPropertyConfig_1.getResourceDir(), 'utf8');
};
ApplicationPropertyConfig.getProperty = (property) => {
    let records = ZooItemKeeper_1.default.getItem(ZooItemKeeper_1.Item.APP_CONFIG);
    if (records === null || records === undefined || Object.keys(records).length === 0) {
        records = ApplicationPropertyConfig_1.loadPropertiesOrFail();
    }
    const keys = property.trim().split('.');
    let currentValue = undefined;
    for (let i = 0; i < keys.length; i++) {
        const currentKey = keys[i];
        currentValue = records[currentKey];
        if (typeof currentValue !== 'object' || currentValue === undefined)
            break;
        records = currentValue;
    }
    if (typeof currentValue === 'object')
        return undefined;
    return currentValue;
};
ApplicationPropertyConfig = ApplicationPropertyConfig_1 = __decorate([
    (0, common_1.Injectable)()
], ApplicationPropertyConfig);
exports.default = ApplicationPropertyConfig;
//# sourceMappingURL=ApplicationPropertyConfig.js.map