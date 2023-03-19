import { DateFormat } from "../modules/user/interfaces/UserModuleInterfaces";
export default class BirdsHelper {
    static generateUUID: () => string;
    static formatDate: (date: Date | string) => DateFormat;
    static getMillSecFromDate: (date: Date) => number;
    static getMillSecFromTimeString: (timeString: string) => number;
    static getQueryUrl: (url: string, obj: object) => string;
    static plusMills: (date: Date, mills: number) => Date;
    static plusSeconds: (date: Date, seconds: number) => Date;
    static plusMinutes: (date: Date, minutes: number) => Date;
    static plusHours: (date: Date, hours: number) => Date;
    static plusDays: (date: Date, days: number) => Date;
    static plusWeek: (date: Date, week: number) => Date;
    static plusMonth: (date: Date, month: number) => Date;
}
