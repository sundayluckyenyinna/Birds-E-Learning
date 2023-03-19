import { DynamicModule, Logger } from "@nestjs/common";
export default class AppConfig {
    static configurations: Record<string, any>;
    static logger: Logger;
    static InitSQLDatasourceConfiguration: () => DynamicModule;
}
