"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const GenericConstants_1 = require("../const/GenericConstants");
class BirdsHelper {
}
exports.default = BirdsHelper;
BirdsHelper.generateUUID = () => {
    const uuid = (0, uuid_1.v4)();
    console.log("Here is the UUID: " + uuid);
    return uuid;
};
BirdsHelper.formatDate = (date) => {
    if (typeof date !== 'string') {
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        };
    }
    if (date.length === 0) {
        return {
            year: 0,
            month: 0,
            day: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }
    return BirdsHelper.formatDate(new Date(date));
};
BirdsHelper.getMillSecFromDate = (date) => {
    return date.getTime();
};
BirdsHelper.getMillSecFromTimeString = (timeString) => {
    const split = timeString.split('*');
    const trimmedSplit = split
        .filter(s => s !== GenericConstants_1.default.EMPTY_STRING)
        .map(s => s.trim());
    if (trimmedSplit[1].startsWith("s"))
        return Number(trimmedSplit[0]) * 1000;
    else if (trimmedSplit[1].startsWith("m"))
        return Number(trimmedSplit[0]) * 60 * 1000;
    else if (trimmedSplit[1].startsWith("h"))
        return Number(trimmedSplit[0]) * 60 * 60 * 1000;
    else
        return 0;
};
BirdsHelper.getQueryUrl = (url, obj) => {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    const comboArray = [];
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = values[i];
        const keyString = String(key);
        const valueString = String(value);
        const combined = keyString.concat("=").concat(valueString);
        comboArray.push(combined);
    }
    const queryCombo = comboArray.join("&");
    return url.concat("?").concat(queryCombo);
};
BirdsHelper.plusMills = (date, mills) => {
    const time = date.getTime();
    const newMills = time + mills;
    const newDate = new Date();
    newDate.setTime(newMills);
    return newDate;
};
BirdsHelper.plusSeconds = (date, seconds) => {
    const time = date.getTime();
    const newMills = time + seconds * 1000;
    const newDate = new Date();
    newDate.setTime(newMills);
    return newDate;
};
BirdsHelper.plusMinutes = (date, minutes) => {
    const time = date.getTime();
    const newMills = time + minutes * 60 * 1000;
    const newDate = new Date();
    newDate.setTime(newMills);
    return newDate;
};
BirdsHelper.plusHours = (date, hours) => {
    const time = date.getTime();
    const newMills = time + hours * 60 * 60 * 1000;
    const newDate = new Date();
    newDate.setTime(newMills);
    return newDate;
};
BirdsHelper.plusDays = (date, days) => {
    const time = date.getTime();
    const newMills = time + days * 24 * 60 * 60 * 1000;
    const newDate = new Date();
    newDate.setTime(newMills);
    return newDate;
};
BirdsHelper.plusWeek = (date, week) => {
    const time = date.getTime();
    const newMills = time + week * 7 * 24 * 60 * 60 * 1000;
    const newDate = new Date();
    newDate.setTime(newMills);
    return newDate;
};
BirdsHelper.plusMonth = (date, month) => {
    const time = date.getTime();
    const newMills = time + month * 30 * 24 * 60 * 60 * 1000;
    const newDate = new Date();
    newDate.setTime(newMills);
    return newDate;
};
//# sourceMappingURL=BirdsHelper.js.map