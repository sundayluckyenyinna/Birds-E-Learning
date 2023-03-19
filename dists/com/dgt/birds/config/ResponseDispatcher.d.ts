import { Response } from "express";
import ResponseDTO from "./ResponseDTO";
export default class ResponseDispatcher {
    static respond: (response: Response, responseDto: ResponseDTO) => Response<any, Record<string, any>>;
}
