import { PeriodType } from "../types";

export const getDateRangeFromPeriod = (period: PeriodType) => {
    const to = new Date();
    const from = new Date();

    switch (period) {
        case '1D':
            from.setDate(to.getDate() - 1);
            break;
        case '1W':
            from.setDate(to.getDate() - 7);
            break;
        case '1M':
            from.setMonth(to.getMonth() - 1);
            break;
        case '1Y':
            from.setFullYear(to.getFullYear() - 1);
            break;
    }

    return {
        from: from.toISOString(),
        to: to.toISOString()
    };
};