import { Component, Input } from '@angular/core';
import { Track } from 'src/app/models/track';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent {
  @Input() tracks: Track[] = [];
}
