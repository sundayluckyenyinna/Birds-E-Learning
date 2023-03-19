import { AppService } from './app.service';
import MessageSource from "./com/dgt/birds/config/MessageSource";
export declare class AppController {
    private readonly appService;
    private readonly messageSource;
    constructor(appService: AppService, messageSource: MessageSource);
}
