import moment, { DurationInputArg1, DurationInputArg2 } from "moment";
import * as momentTimezone from "moment-timezone";

export const DATE_FORMAT = "yyyy-MM-DD";
export const TIME_FORMAT = "HH:mm:ss";
export const DISPLAY_DATE_FORMAT = "yyyy.MM.DD";

export const DATETIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

type DateFormat = "YYYY-MM-DD" | "YYYY-M-DD" | "YYYY-MM-D";

export const getDate = (second: number) => {
  const date = new Date();
  // const kTime: Date = new Date(date.setHours(date.getHours() + 9));
  const kTime: Date = new Date(date.setHours(date.getHours()));
  date.setSeconds(kTime.getSeconds() + second);
  return date.toISOString();
};

export const transDateFormat = (date: Date = new Date(), format = DATE_FORMAT) => {
  return momentTimezone(date).format(format);
};
export const transDisplayDateFormat = (date: Date = new Date(), format = DISPLAY_DATE_FORMAT) => {
  return momentTimezone(date).format(format);
};

/**
 * 주어진 text가 Date 형식이 맞는지 검사
 * @param format 검사할 Date 형식, 기본 'YYYY-MM-DD'
 * @returns {boolean}
 */
export const checkDateStr = (text: string, format: string = DATE_FORMAT) => {
  return momentTimezone(text, format).isValid();
};

/**
 * String 값을 Date 타입으로 리턴
 * @param format stringDate의 형식
 */
export const getDateFromString = (stringDate: string, format?: "YYYYMMDDhhmmss" | string) => {
  return momentTimezone(stringDate, format).toDate();
};

/**
 * 시간의 시작 값을 반환
 * @param target 시작값을 반환할 기준
 * @example target이 'day'로 주어지면 시분초가 0인 시간을 반환
 */
export const getStartOfTime = (date: Date | string, target: "day") => {
  return momentTimezone(date).startOf(target).toDate();
};

/**
 * 시간의 끝 값을 반환
 * @param target 끝을 반환할 기준
 * @example target이 'day'로 주어지면 시분초가 99인 시간을 반환
 */
export const getEndOfTime = (date: Date | string, target: "day") => {
  return momentTimezone(date).endOf(target).toDate();
};

export const isDate = (date: string | Date, format: DateFormat) => {
  return momentTimezone(date, format, true).isValid();
};

export const getDateOfToday = () => {
  return transDateFormat(new Date(), DATE_FORMAT);
};

export const addDate = (
  num: DurationInputArg1,
  date: Date | string = new Date(),
  type: DurationInputArg2 = "days",
  format: string = DATE_FORMAT
) => {
  return moment(date).add(num, type).format(format);
};
