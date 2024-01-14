import { Component, Input, OnChanges } from '@angular/core';
import { Track } from 'src/app/models/track';
import { TracksService } from 'src/app/services/tracks.service';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnChanges {
  @Input() apiUrl: string = "";
  tracks: Track[] = [];
  page: number  = 1;

  constructor(private tracksService: TracksService) {
  }

  onNextPage() {
    this.tracksService.getNext().subscribe((tracks) => {
      this.tracks = tracks;
      this.page++;
    })
  }

  onPrevPage() {
    this.tracksService.getPrevious().subscribe((tracks) => {
      this.tracks = tracks;
      this.page--;
    })
  }

  hasToNext() {
    return this.tracksService.hasToNext();
  }

  hasToPrev() {
    return this.tracksService.hasToPrev();
  }

  ngOnChanges(): void {
    if (!this.apiUrl) return;

    this.tracksService.getTracksByUrl(this.apiUrl).subscribe((tracks) => {
      this.tracks = tracks;
      this.page = 1;
    })
  }
}
