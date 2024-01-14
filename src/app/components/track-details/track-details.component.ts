import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'src/app/models/track';

@Component({
  selector: 'app-track-details',
  templateUrl: './track-details.component.html',
  styleUrls: ['./track-details.component.scss']
})
export class TrackDetailsComponent {
  @Input() trackItem!: Track;
  
}
