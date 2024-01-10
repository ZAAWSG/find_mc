import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, map } from 'rxjs';
import { TrackResponse } from '../models/trackResponse';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class TracksService {

  constructor(private httpService: HttpService) { }

  searchByText(text: string): Observable<Track[]> {
    return this.httpService.searchByTitle(text).pipe(
      map(trackResponse => {
        let tracks: Track[] = []
        let trackItems = trackResponse.tracks.items;
        for (let i = trackItems.length - 1; i >= 0; i--) {
          let item = trackItems[i];
          let track: Track = {
            name: item.name,
            image_url: item.album.images[0].url,
            duration: item.duration_ms,
            spotify_url: item.external_urls.spotify
          }
          tracks.push(track);
        }
        return tracks;
      })
    ); 
  }
}
