import { useNavigate } from '@tanstack/react-router';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-main-background p-6">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-primary mb-6">Page Not Found</h2>
                <p className="text-primary mb-8">The page you're looking for doesn't exist or has been moved.</p>
                <button
                    onClick={() => navigate({ to: '/' })}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
}