/* eslint-disable */
import { Controller, Get, Res } from "@nestjs/common";
import { AppService } from './app.service';
import MessageSource from "./com/dgt/birds/config/MessageSource";
import {Response} from "express";
import ResponseDTO from "./com/dgt/birds/config/ResponseDTO";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("API management")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly messageSource: MessageSource) {}

}
