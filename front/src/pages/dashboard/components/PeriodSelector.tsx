import { Button } from '@/components/ui/Button';
import { PeriodType } from '../types';
import { PERIOD_TYPE } from '../constants/portfolio';

interface PeriodSelectorProps {
    selectedPeriod: PeriodType;
    onPeriodChange: (period: PeriodType) => void;
}

const PERIODS: PeriodType[] = [PERIOD_TYPE.DAY, PERIOD_TYPE.WEEK, PERIOD_TYPE.MONTH, PERIOD_TYPE.YEAR];

export function PeriodSelector({ selectedPeriod, onPeriodChange }: PeriodSelectorProps) {
    return (
        <div className="flex gap-2">
            {PERIODS.map((period) => (
                <Button
                    key={period}
                    variant={selectedPeriod === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPeriodChange(period)}
                >
                    {period}
                </Button>
            ))}
        </div>
    );
} 