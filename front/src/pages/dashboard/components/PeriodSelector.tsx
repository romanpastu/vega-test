import { Button } from '@/components/ui/Button';
import { PeriodType } from '../types';
import { PERIODS } from '../constants/portfolio';

export type PeriodSelectorProps = {
    selectedPeriod: PeriodType;
    onPeriodChange: (period: PeriodType) => void;
}



export function PeriodSelector({ selectedPeriod, onPeriodChange }: PeriodSelectorProps) {
    return (
        <div className="flex gap-2" data-testid="test-period-selector">
            {PERIODS.map((period) => (
                <Button
                    key={period}
                    variant={selectedPeriod === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPeriodChange(period)}
                    data-testid={`test-period-selector-${period.toLowerCase()}`}
                >
                    {period}
                </Button>
            ))}
        </div>
    );
} 