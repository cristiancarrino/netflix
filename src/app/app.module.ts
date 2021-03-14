import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { ActorListComponent } from './components/actor-list/actor-list.component';
import { GenreListComponent } from './components/genre-list/genre-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilmAddComponent } from './components/film-add/film-add.component';
import { ActorAddComponent } from './components/actor-add/actor-add.component';
import { GenreAddComponent } from './components/genre-add/genre-add.component';
import { FilmEditComponent } from './components/film-edit/film-edit.component';
import { ActorEditComponent } from './components/actor-edit/actor-edit.component';
import { GenreEditComponent } from './components/genre-edit/genre-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmListComponent,
    ActorListComponent,
    GenreListComponent,
    DashboardComponent,
    FilmAddComponent,
    ActorAddComponent,
    GenreAddComponent,
    FilmEditComponent,
    ActorEditComponent,
    GenreEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
