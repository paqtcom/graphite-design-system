import { DuetDateAdapter } from '@duetds/date-picker/dist/types/components/duet-date-picker/date-adapter';
import { parseDayMonthYearDate, printDayMonthYearDate } from '../../utils/date';

const dayMonthYearAdapter: DuetDateAdapter = { parse: parseDayMonthYearDate, format: printDayMonthYearDate };
export default dayMonthYearAdapter;
