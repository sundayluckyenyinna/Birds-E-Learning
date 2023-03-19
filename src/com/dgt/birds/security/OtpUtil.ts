/* eslint-disable */

import GenericConstants from "../const/GenericConstants";
import ApplicationPropertyConfig from "../config/ApplicationPropertyConfig";
import BirdsHelper from "../utils/BirdsHelper";

const environment = ApplicationPropertyConfig;
export default class OtpUtil
{

   private static numerics: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
   private static expiresIn: string = environment.getProperty("birds.otp.expiresIn");
   private static expiresInMillSec: number = BirdsHelper.getMillSecFromTimeString(OtpUtil.expiresIn);

   static generateToken = (length: number): string => {
      let token: string = GenericConstants.EMPTY_STRING;
      for(let i =0; i < length; i++){
         let randomIndex: number = Math.floor(Math.random() * 10);
         token += String(OtpUtil.numerics[randomIndex]);
      }
      return token;
   }

   static getTokenExpirationTime = ():Date => {
      const now: Date = new Date();
      return new Date(now.getTime() + OtpUtil.expiresInMillSec);
   }

}