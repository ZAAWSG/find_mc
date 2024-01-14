import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, catchError, map } from 'rxjs';
import { AuthResponse } from '../models/authResponse';
import { TracksResponse } from '../models/tracksResponse';
import { TrackResponse } from '../models/trackResponse';


@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(private httpClient: HttpClient ) {}

  getOne(url: string): Observable<TracksResponse> {
    return this.httpClient.get<TracksResponse>(url);
  }

  searchByTitle(text: string): Observable<TracksResponse> {
    return this.httpClient.get<TracksResponse>(`${environment.API_URL}/search?q=${text}&type=track&limit=10`)
  }

  getOneTrack(id: string) {
    return this.httpClient.get<TrackResponse>(`${environment.API_URL}/tracks/${id}`);
  }

  getAuthToken() {
    const params = {
      grant_type: 'client_credentials',
      client_id: environment.CLIENT_ID,
      client_secret: environment.CLIENT_SECRET
    }

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const config = {
      params,
      headers
    }

    return this.httpClient.post<AuthResponse>(
      environment.AUTH_URL,
      null,
      config
    ).pipe(
      map((response) => {
        const { access_token } = response;
        return access_token;
      }),
      catchError((e) => `Error: ${e}`)
    )
  }

}
