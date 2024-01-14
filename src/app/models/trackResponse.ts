export interface TrackResponse {
    href: string,
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number,
    id: string,
    available_markets: string[],
    duration_ms: number,
    preview_url: string,
    name: string,
    external_urls: {
        spotify: string
    },
    artists: {
        id: string, 
        name: string,
        external_urls: {
            spotify: string
        },
    }[],
    album: {
        images: {
            url: string
        }[]
    }
}