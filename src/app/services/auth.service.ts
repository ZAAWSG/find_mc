import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken: string | null = null;

  constructor(private httpService: HttpService) { }

  get token(): Observable<string> {
    if (this.authToken != null) {
      return of(this.authToken);
    }

    return this.getAuthToken();
  }

  getAuthToken() {
    return this.httpService.getAuthToken().pipe(
      tap(token => {
        this.authToken = token;
        console.log("Token Saved successfully", token)
      }),
      map(token => token) 
    );
  }
}
