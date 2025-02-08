import { cn } from "@/lib/utils"
import { useState } from 'react';

type ViewType = 'class' | 'specific';

interface PortfolioTableProps {
  data: {
    assetClass: Array<{ name: string; value: number }>;
    specificAssets: Array<{ name: string; value: number }>;
  };
  className?: string;
}

export function PortfolioTable({ data, className }: PortfolioTableProps) {
  const [viewType, setViewType] = useState<ViewType>('class');
  const currentData = viewType === 'class' ? data.assetClass : data.specificAssets;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const calculatePercentage = (value: number) => {
    const total = currentData.reduce((sum, item) => sum + item.value, 0);
    return ((value / total) * 100).toFixed(1) + '%';
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Portfolio Positions</h2>
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

      <div className="relative flex-1 min-h-0">
        <div className={cn("absolute inset-0 overflow-auto", className)}>
          <table className="w-full">
            <thead className="sticky top-0 bg-background z-10">
              <tr className="border-b border-border">
                <th className="text-left p-3 font-semibold">Asset</th>
                <th className="text-right p-3 font-semibold">Value</th>
                <th className="text-right p-3 font-semibold">Allocation</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((asset) => (
                <tr key={asset.name} className="border-b border-border/50 hover:bg-muted">
                  <td className="p-3 font-medium">{asset.name}</td>
                  <td className="text-right p-3">{formatCurrency(asset.value)}</td>
                  <td className="text-right p-3">{calculatePercentage(asset.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-lg font-semibold ">
          Total Value: {formatCurrency(currentData.reduce((sum, item) => sum + item.value, 0))}
        </p>
      </div>
    </div>
  );
} 