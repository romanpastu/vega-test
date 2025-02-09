import { PeriodType } from '../types';

export const VIEW_TYPE = {
    CLASS: 'class',
    SPECIFIC: 'specific',
} as const;

export const PERIOD_TYPE = {
    DAY: '1D',
    WEEK: '1W',
    MONTH: '1M',
    YEAR: '1Y',
} as const;

export const PERIODS: PeriodType[] = [PERIOD_TYPE.DAY, PERIOD_TYPE.WEEK, PERIOD_TYPE.MONTH, PERIOD_TYPE.YEAR];