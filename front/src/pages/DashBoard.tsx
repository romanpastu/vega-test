import { Button } from '../components/ui/Button'
import { useQuery } from '@tanstack/react-query'

interface Post {
    id: number
    title: string
    body: string
}

const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

export default function Dashboard() {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    })


    if (isLoading) return <div className="text-center">Loading...</div>
    if (error) return <div className="text-center text-red-500">Error: {error.message}</div>

    return (
        <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold">Route 1 - Posts</h1>
                <Button className="mt-4">Route 1 Button</Button>
            </div>
            <div className="grid gap-6">
                {posts?.map((post) => (
                    <div key={post.id} className="rounded-lg border p-6 shadow-sm">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">{post.body}</p>
                    </div>
                ))}
            </div>
        </div>
    )
} 