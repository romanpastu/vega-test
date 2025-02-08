import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LoadingContainerProps } from '../types';

export function LoadingContainer({ 
    isLoading, 
    isFetching, 
    error, 
    children 
}: LoadingContainerProps) {
    if (error !== null && error !== undefined) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-destructive">
                <AlertCircle size={48} />
                <p className="text-lg font-medium">Failed to load portfolio data</p>
                {error instanceof Error && (
                    <p className="text-sm text-muted-foreground">{error.message}</p>
                )}
            </div>
        );
    }

    const isLoadingState = isLoading || isFetching;

    return (
        <div 
            className={cn(
                "rounded-lg p-6 h-full bg-[var(--chart-container-bg)]",
                isLoadingState && "relative"
            )}
        >
            {children}
            {isLoadingState && (
                <div className="absolute inset-0 bg-accent/80 animate-pulse rounded-lg" />
            )}
        </div>
    );
} 