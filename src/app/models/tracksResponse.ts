//More description of data
//https://developer.spotify.com/documentation/web-api/reference/search

export interface TracksResponse {
    tracks: {
        href: string,
        limit: number,
        next: string,
        offset: number,
        previous: string,
        total: number,
        items: {
            id: string,
            href: string,
            available_markets: string[],
            duration_ms: number,
            preview_url: string,
            name: string,
            external_urls: {
                spotify: string
            },
            album: {
                images: {
                    url: string
                }[]
            }
        }[]
    },
}