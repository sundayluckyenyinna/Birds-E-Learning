/* eslint-disable */

import { Module } from "@nestjs/common";
import PaymentController from "./controller/PaymentController";
import PaymentService from "./service/PaymentService";
import { TypeOrmModule } from "@nestjs/typeorm";
import BlPaymentCard from "./model/BlPaymentCard";
import UserSQLRepository from "../user/repository/UserSQLRepository";
import PaymentSQLRepository from "./repository/PaymentSQLRepository";
import MessageSource from "../../config/MessageSource";

@Module({
   imports: [TypeOrmModule.forFeature([BlPaymentCard])],
   controllers: [PaymentController],
   providers: [PaymentService, UserSQLRepository, PaymentSQLRepository, MessageSource]
})
export default class PaymentModule{}