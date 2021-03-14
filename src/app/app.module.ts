// From Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Imported Modules
import { NgxWebstorageModule } from 'ngx-webstorage';

// My Modules
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// My Components
// --- General ---
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StarsComponent } from './components/stars/stars.component';
import { NavbarComponent } from './components/navbar/navbar.component';
// --- Film ---
import { FilmListComponent } from './components/film-list/film-list.component';
import { FilmAddComponent } from './components/film-add/film-add.component';
import { FilmEditComponent } from './components/film-edit/film-edit.component';
// --- Actor ---
import { ActorListComponent } from './components/actor-list/actor-list.component';
import { ActorAddComponent } from './components/actor-add/actor-add.component';
import { ActorEditComponent } from './components/actor-edit/actor-edit.component';
// --- Genre ---
import { GenreListComponent } from './components/genre-list/genre-list.component';
import { GenreAddComponent } from './components/genre-add/genre-add.component';
import { GenreEditComponent } from './components/genre-edit/genre-edit.component';
import { FilmListFilterPipe } from './pipes/film-list-filter.pipe';

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
		GenreEditComponent,
		NavbarComponent,
		StarsComponent,
		FilmListFilterPipe
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgxWebstorageModule.forRoot(),
		FormsModule,
		FontAwesomeModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
