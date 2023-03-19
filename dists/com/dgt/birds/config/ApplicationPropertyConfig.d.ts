import { DynamicModule, Logger } from "@nestjs/common";
export default class ApplicationPropertyConfig {
    static logger: Logger;
    static profile: string;
    static ApplicationProperties: () => DynamicModule;
    static loadPropertiesOrFail: () => Record<string, any>;
    private static getRecordsFromResourceYamlFile;
    private static getResource;
    private static getResourceDir;
    private static getAllResources;
    static getProperty: (property: string) => string;
}
