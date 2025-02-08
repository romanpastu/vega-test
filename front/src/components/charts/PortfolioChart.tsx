import { VIEW_TYPE } from '@/pages/dashboard/constants/portfolio';
import { ViewType } from '@/pages/dashboard/types';
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export type PortfolioData = {
    name: string;
    value: number;
}

export type PortfolioChartProps = {
    data: {
        assetClass: PortfolioData[];
        specificAssets: PortfolioData[];
    };
    colors: string[];
    onSelectionChange?: (selection: { type: ViewType; name: string } | null) => void;
    viewType: ViewType;
    onViewTypeChange: (type: ViewType) => void;
}

export function PortfolioChart({ 
    data, 
    colors, 
    onSelectionChange,
    viewType,
    onViewTypeChange
}: PortfolioChartProps) {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const currentData = viewType === VIEW_TYPE.CLASS ? data.assetClass : data.specificAssets;
    const totalValue = currentData.reduce((sum, item) => sum + item.value, 0);

    const handlePieClick = (data: { name: string }) => {
        const name = data.name;
        if (selectedItem === name) {
            setSelectedItem(null);
            onSelectionChange?.(null);
        } else {
            setSelectedItem(name);
            onSelectionChange?.({ type: viewType, name });
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Portfolio Balance</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => onViewTypeChange('class')}
                        className={`px-3 py-1 rounded-md text-sm ${
                            viewType === VIEW_TYPE.CLASS
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary text-secondary-foreground'
                        }`}
                    >
                        Asset Class
                    </button>
                    <button
                        onClick={() => onViewTypeChange('specific')}
                        className={`px-3 py-1 rounded-md text-sm ${
                            viewType === VIEW_TYPE.SPECIFIC
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary text-secondary-foreground'
                        }`}
                    >
                        Specific Assets
                    </button>
                </div>
            </div>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={currentData}
                            cx="50%"
                            cy="50%"
                            innerRadius="60%"
                            outerRadius="80%"
                            paddingAngle={2}
                            dataKey="value"
                            onClick={handlePieClick}
                        >
                            {currentData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={colors[index % colors.length]}
                                    opacity={selectedItem === null || selectedItem === entry.name ? 1 : 0.5}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="text-center">
                <p className="text-lg font-semibold">
                    Total Value: ${totalValue.toLocaleString()}
                </p>
            </div>
        </div>
    );
} 