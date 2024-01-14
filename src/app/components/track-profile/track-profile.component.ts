import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { TrackResponse } from 'src/app/models/trackResponse';
import { TracksService } from 'src/app/services/tracks.service';

@Component({
  selector: 'app-track-profile',
  templateUrl: './track-profile.component.html',
  styleUrls: ['./track-profile.component.scss']
})
export class TrackProfileComponent implements OnInit {
  track!: TrackResponse;

  constructor(
    private tracksService: TracksService,
    private activeRoute: ActivatedRoute) {
  }

  getTrackInfo(id: string) {
    this.tracksService.getTrackById(id)
    .subscribe((track) => {
      this.track = track
    })
  }

  ngOnInit() {
    this.activeRoute.paramMap.pipe(
      map(params => {
        let id = params.get('id') || "";
        return id;
      }),
    )
    .subscribe((id) => {
      this.getTrackInfo(id);
    })
  }
}
