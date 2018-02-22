import { isDate, isValid, isFuture, differenceInCalendarYears, parse, format } from "date-fns";

export const isValidate = (dateStr: string): boolean => {
  const date = parse(dateStr)
  // return isDate(date) 
  //     && isValid(date)
  //     && !isFuture(date)
  //     && differenceInCalendarYears(Date.now(), date) < 150
  return isValid(date);
}

export const convertToDate = (date: Date) => {
  return format(date, 'YYYY-MM-DD');
};