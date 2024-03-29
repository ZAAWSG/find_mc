import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { TracksService } from 'src/app/services/tracks.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnDestroy{
  @Output() tracksEmitter = new EventEmitter<string>();

  searchForm = new FormGroup(
    {searchRequest: new FormControl('')}
  )

  private destroy$ = new Subject<string>();

  constructor(private tracksService: TracksService) {
    this.searchForm.controls.searchRequest.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(text => {
        this.search(text);
      })
  }


  search(text: string | null) {
    if (text === null || text === "") return;

    this.tracksService.getApiUrlBySearchText(text)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(url => {
      this.tracksEmitter.emit(url);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
