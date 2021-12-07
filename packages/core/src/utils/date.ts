const DAYMONTHYEAR_DATE_FORMAT = /^(\d{2})-(\d{2})-(\d{4})$/;

export function createDate(year: string, month: string, day: string): Date {
  var dayInt = parseInt(day, 10);
  var monthInt = parseInt(month, 10);
  var yearInt = parseInt(year, 10);

  const isValid =
    Number.isInteger(yearInt) && // all parts should be integers
    Number.isInteger(monthInt) &&
    Number.isInteger(dayInt) &&
    monthInt > 0 && // month must be 1-12
    monthInt <= 12 &&
    dayInt > 0 && // day must be 1-31
    dayInt <= 31 &&
    yearInt > 0;

  if (isValid) {
    return new Date(yearInt, monthInt - 1, dayInt);
  }
}

/**
 * @param value date string in ISO format DD-MM-YYYY
 */
export function parseDayMonthYearDate(value: string): Date {
  if (!value) {
    return;
  }

  const matches = value.match(DAYMONTHYEAR_DATE_FORMAT);

  if (matches) {
    return createDate(matches[3], matches[2], matches[1]);
  }
}

/**
 * print date in format DD-MM-YYYY
 * @param date
 */
export function printDayMonthYearDate(date: Date): string {
  if (!date) {
    return '';
  }

  var d = date.getDate().toString(10);
  var m = (date.getMonth() + 1).toString(10);
  var y = date.getFullYear().toString(10);

  // days are not zero-indexed, so pad if less than 10
  if (date.getDate() < 10) {
    d = `0${d}`;
  }

  // months *are* zero-indexed, pad if less than 9!
  if (date.getMonth() < 9) {
    m = `0${m}`;
  }

  return `${d}-${m}-${y}`;
}
