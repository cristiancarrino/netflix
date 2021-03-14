import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorListComponent } from './components/actor-list/actor-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { GenreListComponent } from './components/genre-list/genre-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'films/list', component: FilmListComponent },
  { path: 'actors/list', component: ActorListComponent },
  { path: 'genres/list', component: GenreListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
