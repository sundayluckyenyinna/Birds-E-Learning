/* eslint-disable */
import { v4 as uuidv4 } from 'uuid';
import { DateFormat } from "../modules/user/interfaces/UserModuleInterfaces";
import GenericConstants from "../const/GenericConstants";
export default class BirdsHelper
{
  static generateUUID = (): string => {
      const uuid = uuidv4();
      console.log("Here is the UUID: " + uuid);
      return uuid;
  }

  static formatDate = (date: Date | string): DateFormat => {
    if(typeof  date !== 'string'){
        return {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          hours: date.getHours(),
          minutes: date.getMinutes(),
          seconds: date.getSeconds()
        }
    }
       if(date.length === 0){
         return {
           year: 0,
           month: 0,
           day: 0,
           hours: 0,
           minutes: 0,
           seconds: 0
         }
     }
       return BirdsHelper.formatDate(new Date(date))
  }

  static getMillSecFromDate = (date: Date): number => {
      return date.getTime();
  }

    static getMillSecFromTimeString = (timeString: string): number => {
        const split: Array<string> = timeString.split('*');
        const trimmedSplit: Array<string> = split
                      .filter(s => s !== GenericConstants.EMPTY_STRING)
                      .map(s => s.trim());
        if(trimmedSplit[1].startsWith("s"))
           return Number(trimmedSplit[0]) * 1000;
        else if(trimmedSplit[1].startsWith("m"))
          return Number(trimmedSplit[0]) * 60 * 1000;
        else if(trimmedSplit[1].startsWith("h"))
          return Number(trimmedSplit[0]) * 60 * 60 * 1000;
        else
          return 0
    }

    static getQueryUrl = (url: string, obj: object): string => {
        const keys: Array<string> = Object.keys(obj);
        const values: Array<string> = Object.values(obj);
        const comboArray: Array<string> = [];
        for(let i = 0; i < keys.length; i++){
           const key = keys[i];
           const value = values[i];
           const keyString: string = String(key);
           const valueString: string = String(value);
           const combined: string = keyString.concat("=").concat(valueString);
           comboArray.push(combined);
        }
        const queryCombo: string = comboArray.join("&");
        return url.concat("?").concat(queryCombo);
    }

    static plusMills = (date: Date, mills: number) => {
        const time = date.getTime();
        const newMills = time + mills;
        const newDate: Date = new Date();
        newDate.setTime(newMills);
        return newDate;
    }

    static plusSeconds = (date: Date, seconds: number) => {
      const time = date.getTime();
      const newMills = time + seconds * 1000;
      const newDate: Date = new Date();
      newDate.setTime(newMills);
      return newDate;
    }

    static plusMinutes = (date: Date, minutes: number) => {
      const time = date.getTime();
      const newMills = time + minutes * 60 * 1000;
      const newDate: Date = new Date();
      newDate.setTime(newMills);
      return newDate;
    }

    static plusHours = (date: Date, hours: number) => {
      const time = date.getTime();
      const newMills = time + hours * 60 * 60 * 1000;
      const newDate: Date = new Date();
      newDate.setTime(newMills);
      return newDate;
    }

    static plusDays = (date: Date, days: number) => {
      const time = date.getTime();
      const newMills = time + days * 24 * 60 * 60 * 1000;
      const newDate: Date = new Date();
      newDate.setTime(newMills);
      return newDate;
    }

    static plusWeek = (date: Date, week: number) => {
      const time = date.getTime();
      const newMills = time + week * 7 * 24 * 60 * 60 * 1000;
      const newDate: Date = new Date();
      newDate.setTime(newMills);
      return newDate;
    }

    static plusMonth = (date: Date, month: number) => {
      const time = date.getTime();
      const newMills = time + month * 30 * 24 * 60 * 60 * 1000;
      const newDate: Date = new Date();
      newDate.setTime(newMills);
      return newDate;
    }
}