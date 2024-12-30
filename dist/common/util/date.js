"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDate = exports.getDateOfToday = exports.isDate = exports.getEndOfTime = exports.getStartOfTime = exports.getDateFromString = exports.checkDateStr = exports.transDisplayDateFormat = exports.transDateFormat = exports.getDate = exports.DATETIME_FORMAT = exports.DISPLAY_DATE_FORMAT = exports.TIME_FORMAT = exports.DATE_FORMAT = void 0;
const moment_1 = require("moment");
const momentTimezone = require("moment-timezone");
exports.DATE_FORMAT = "yyyy-MM-DD";
exports.TIME_FORMAT = "HH:mm:ss";
exports.DISPLAY_DATE_FORMAT = "yyyy.MM.DD";
exports.DATETIME_FORMAT = `${exports.DATE_FORMAT} ${exports.TIME_FORMAT}`;
const getDate = (second) => {
    const date = new Date();
    const kTime = new Date(date.setHours(date.getHours()));
    date.setSeconds(kTime.getSeconds() + second);
    return date.toISOString();
};
exports.getDate = getDate;
const transDateFormat = (date = new Date(), format = exports.DATE_FORMAT) => {
    return momentTimezone(date).format(format);
};
exports.transDateFormat = transDateFormat;
const transDisplayDateFormat = (date = new Date(), format = exports.DISPLAY_DATE_FORMAT) => {
    return momentTimezone(date).format(format);
};
exports.transDisplayDateFormat = transDisplayDateFormat;
const checkDateStr = (text, format = exports.DATE_FORMAT) => {
    return momentTimezone(text, format).isValid();
};
exports.checkDateStr = checkDateStr;
const getDateFromString = (stringDate, format) => {
    return momentTimezone(stringDate, format).toDate();
};
exports.getDateFromString = getDateFromString;
const getStartOfTime = (date, target) => {
    return momentTimezone(date).startOf(target).toDate();
};
exports.getStartOfTime = getStartOfTime;
const getEndOfTime = (date, target) => {
    return momentTimezone(date).endOf(target).toDate();
};
exports.getEndOfTime = getEndOfTime;
const isDate = (date, format) => {
    return momentTimezone(date, format, true).isValid();
};
exports.isDate = isDate;
const getDateOfToday = () => {
    return (0, exports.transDateFormat)(new Date(), exports.DATE_FORMAT);
};
exports.getDateOfToday = getDateOfToday;
const addDate = (num, date = new Date(), type = "days", format = exports.DATE_FORMAT) => {
    return (0, moment_1.default)(date).add(num, type).format(format);
};
exports.addDate = addDate;
//# sourceMappingURL=date.js.map