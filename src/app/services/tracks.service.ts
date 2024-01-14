import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, map } from 'rxjs';
import { Track } from '../models/track';
import { TrackRequestInfo } from '../models/trackRequestInfo';

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  private currentRequestInfo!: TrackRequestInfo;

  constructor(private httpService: HttpService) { }

  getApiUrlBySearchText(text: string): Observable<string> {
    return this.httpService.searchByTitle(text).pipe(
      map(trackResponse => trackResponse.tracks.href)
    )
  }

  getNext() {
    return this.getTracksByUrl(this.currentRequestInfo.next);
  }

  getPrevious() {
    return this.getTracksByUrl(this.currentRequestInfo.previous);
  }

  hasToNext() {
    return !!this.currentRequestInfo?.next;
  }

  hasToPrev() {
    return !!this.currentRequestInfo?.previous;
  }

  getTracksByUrl(url: string): Observable<Track[]> {
    return this.httpService.getOne(url).pipe(
      map(trackResponse => {
        let tracks: Track[] = []
        let trackItems = trackResponse.tracks.items;
        this.currentRequestInfo = {
          href: trackResponse.tracks.href,
          next: trackResponse.tracks.next,
          previous: trackResponse.tracks.previous
        }
        for (let i = trackItems.length - 1; i >= 0; i--) {
          let item = trackItems[i];
          let track: Track = {
            id: item.id,
            name: item.name,
            image_url: item.album.images[0].url,
            duration: item.duration_ms,
            spotify_url: item.external_urls.spotify,
            preview_url: item.preview_url,
            api_url: item.href
          }
          tracks.push(track);
        }
        return tracks;
      })
    ); 
  }

  getTrackById(id: string) {
    console.log("asd", id)
    return this.httpService.getOneTrack(id).pipe(
      map(track => {
        return track;
      })
    );
  }
}
