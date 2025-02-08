import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LoadingContainerProps } from '../types';

export function LoadingContainer({ 
    isLoading, 
    isFetching, 
    error, 
    children 
}: LoadingContainerProps) {
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-destructive">
                <AlertCircle size={48} />
                <p className="text-lg font-medium">Failed to load portfolio data</p>
            </div>
        );
    }

    return (
        <div 
            className={cn(
                "rounded-lg p-6 h-full",
                (isLoading || isFetching)
                    ? "animate-pulse bg-accent/80" 
                    : "bg-[var(--chart-container-bg)]"
            )}
        >
            {(!isLoading && !isFetching) && children}
        </div>
    );
} 