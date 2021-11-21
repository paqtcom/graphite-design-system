import { DuetDateAdapter } from '@duetds/date-picker/dist/types/components/duet-date-picker/date-adapter';
import { parseISODate, printDayMonthYearDate } from '../../utils/date';

const isoAdapter: DuetDateAdapter = { parse: parseISODate, format: printDayMonthYearDate };
export default isoAdapter;
