import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface PortfolioHistoryData {
    date: string;
    value: number;
}

interface PortfolioHistoryChartProps {
    data: PortfolioHistoryData[];
}

export function PortfolioHistoryChart({ data }: PortfolioHistoryChartProps) {
    return (
        <div className="w-full h-full">
            <h2 className="text-xl font-semibold mb-4">Portfolio History</h2>
            <div className="w-full h-[calc(100%-2rem)]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fill: 'var(--chart-text)' }}  />
                        <YAxis  tick={{ fill: 'var(--chart-text)' }}  />
                        <Tooltip />
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#8884d8" 
                            fill="#8884d8" 
                            fillOpacity={0.3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
} 