import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MainComponent } from './components/main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TrackDetailsComponent } from './components/track-details/track-details.component'
import { ApiInterceptor } from './interceptors/api.interceptor';
import { TrackListComponent } from './components/track-list/track-list.component';
import { MsToTimePipe } from './pipes/ms-to-time.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    MainComponent,
    TrackDetailsComponent,
    TrackListComponent,
    MsToTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
