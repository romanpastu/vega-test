type RouteElement = {
    path: string
    metadata?: RouteMetadata
    children?: Record<string, RouteElement>
}

type RouteMetadata = {
    title: string
    description?: string
}

type RouteTree = {
    ROOT: RouteElement
}