import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { TrackProfileComponent } from './components/track-profile/track-profile.component';

const routes: Routes = [
  { path: "",  component: MainComponent},
  { path: "tracks/:id", component: TrackProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
