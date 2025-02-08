import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Types
type ViewType = 'class' | 'specific';

export interface PortfolioData {
    name: string;
    value: number;
}

export interface PortfolioChartProps {
    data: {
        assetClass: PortfolioData[];
        specificAssets: PortfolioData[];
    };
    colors: string[];
}

export function PortfolioChart({ data, colors }: PortfolioChartProps) {
    const [viewType, setViewType] = useState<ViewType>('class');
    const currentData = viewType === 'class' ? data.assetClass : data.specificAssets;
    const totalValue = currentData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Portfolio Balance</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewType('class')}
                        className={`px-3 py-1 rounded-md text-sm ${
                            viewType === 'class'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary text-secondary-foreground'
                        }`}
                    >
                        Asset Class
                    </button>
                    <button
                        onClick={() => setViewType('specific')}
                        className={`px-3 py-1 rounded-md text-sm ${
                            viewType === 'specific'
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
                        >
                            {currentData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
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