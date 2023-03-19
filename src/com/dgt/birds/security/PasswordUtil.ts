/* eslint-disable */
import * as bcrypt from 'bcryptjs'
import ApplicationPropertyConfig from "../config/ApplicationPropertyConfig";

const environment = ApplicationPropertyConfig;

export default class PasswordUtil
{

   static saltStrength: number = Number(environment.getProperty("birds.hash.passwordHashStrength")) || 10;
   static salt = bcrypt.genSaltSync(PasswordUtil.saltStrength);

   static hash = (plainPassword: string): string => {
      return bcrypt.hashSync(plainPassword, PasswordUtil.salt);
   }

   static match = (plainPassword: string, hashedPassword: string): boolean => {
      return bcrypt.compareSync(plainPassword, hashedPassword);
   }
}