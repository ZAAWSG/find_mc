import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Track } from 'src/app/models/track';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [ AuthService ]
})
export class MainComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  tracks: Track[] = [];
  
  constructor(private authService: AuthService) {}

  receiveTrackData(tracks: Track[]) {
    this.tracks = tracks;
  }

  ngOnInit(): void {
    this.authService.getAuthToken()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(token => {
      console.log("Current Token", token)
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
