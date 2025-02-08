import NotFoundPage from "./NotFoundPage";

export default function ErrorPage({ error, info }: {
    error: Error; info?: {
        componentStack: string;
    }
}) {
    if(error.message === "Page not found error") {
        return <NotFoundPage />
    }

    console.error("ErrorPage caught an error:", error, "URL:", info);

    return (
        <div>
            <h1>Something went wrong!</h1>
            <p>Error: {error.message || "An unexpected error occurred."}</p>
            {info && <p>INFO: {info?.componentStack}</p>}
        </div>
    );
}