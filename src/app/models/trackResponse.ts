//More description of data
//https://developer.spotify.com/documentation/web-api/reference/search

export interface TrackResponse {
    tracks: {
        href: string,
        limit: number,
        next: string,
        offset: number,
        previous: string,
        total: number,
        items: {
            available_markets: string[],
            duration_ms: number,
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
    }
}