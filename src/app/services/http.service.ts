import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, catchError, map } from 'rxjs';
import { AuthResponse } from '../models/authResponse';
import { TrackResponse } from '../models/trackResponse';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(private httpClient: HttpClient ) {}

  getOne() {

  }

  getAll() {
    
  }

  getListByAuthor() {

  }

  searchByTitle(text: string): Observable<TrackResponse> {
    return this.httpClient.get<TrackResponse>(`${environment.API_URL}/search?q=${text}&type=track`)
  }

  getListByGenre() {

  }

  getSimilarList() {

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
