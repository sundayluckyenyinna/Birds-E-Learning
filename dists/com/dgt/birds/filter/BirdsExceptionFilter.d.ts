import { ArgumentsHost, BadRequestException, ExceptionFilter } from "@nestjs/common";
export default class BirdsExceptionFilter implements ExceptionFilter {
    private messageSource;
    catch(exception: BadRequestException, host: ArgumentsHost): any;
}
