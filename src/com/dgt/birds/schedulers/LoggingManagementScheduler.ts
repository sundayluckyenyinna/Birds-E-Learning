/* eslint-disable */

import { Injectable } from "@nestjs/common";
import LoggerFactory from "../config/LoggerFactory";
import { Cron, CronExpression } from "@nestjs/schedule";
import UserSQLRepository from "../modules/user/repository/UserSQLRepository";
import LoginSQLRepository from "../modules/user/repository/LoginSQLRepository";
import UserLogin from "../modules/user/model/UserLogin";
import UserAuth from "../modules/user/model/UserAuth";
import User from "../modules/user/model/User";

@Injectable()
export default class LoggingManagementScheduler
{
    private logger: LoggerFactory = LoggerFactory.createLogger(LoggingManagementScheduler.name);

    constructor(private readonly userRepository: UserSQLRepository,
                private readonly loginRepository: LoginSQLRepository,
    ) {}

    @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
    performHouseKeeping()
    {
        // Clean up the log records for each user to persist the latest two records.
        this.cleanupLoggingRecords()
          .then(() => this.logger.info("Cleanup of users log record completed."));

        // Invalidate all remember me features that have expired.
        this.invalidateExpiredRememberMe()
          .then(() => this.logger.info("Expired RememberMe features invalidation completed."))
    }

    private async cleanupLoggingRecords()
    {
       // Get all the distinct email addresses in the log records.
       const emails: Array<{ userEmail: string}> = await this.loginRepository
                      .createQueryBuilder("bln_user_login")
                     .select("user_email as userEmail")
                     .distinct(true)
                     .execute();
       console.log(emails[0].userEmail)

       const userLoginRecords: Array<UserLogin> = await this.loginRepository.find();

       for(let i = 0; i < emails.length; i++){
         const email: { userEmail: string } = emails[i];
         let perUserLogin: Array<UserLogin> = userLoginRecords
           .filter((record: UserLogin) => record.userEmail === email.userEmail)
           .sort((a, b) => a.createdDate.getTime() - b.createdDate.getTime());

         // Keep the last record
         perUserLogin.pop();
         await this.loginRepository.remove(perUserLogin);
       }

    }

    private async invalidateExpiredRememberMe() {

        // Select those userAuths that still have active rememberMe feature.
       const users: Array<User> = (await this.userRepository.find())
         .filter((user: User) => user.rememberMeActive);

       // Deactivate all remember me feature.
       for(let i = 0; i < users.length; i++) {
         const user: User = users[i];
         const partial: object = {
           rememberMeActive: false,
           rememberMeCreatedDate: undefined,
           rememberMeExpDate: undefined
         }
          await this.userRepository.updateUser(user, partial);
       }

    }


}