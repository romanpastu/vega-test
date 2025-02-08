import { VIEW_TYPE, PERIOD_TYPE } from '../constants/portfolio';

export type ViewType = typeof VIEW_TYPE.CLASS | typeof VIEW_TYPE.SPECIFIC;
export type PeriodType = typeof PERIOD_TYPE.DAY | typeof PERIOD_TYPE.WEEK | typeof PERIOD_TYPE.MONTH | typeof PERIOD_TYPE.YEAR;

export type LoadingContainerProps = {
    isLoading: boolean;
    isFetching: boolean;
    error?: Error | null;
    children: React.ReactNode;
} 