import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { LoadingComponent } from './loading/loading.component';
import { SearchPannelComponent } from './search-page/search-pannel/search-pannel.component';
import { SearchTableComponent } from './search-page/search-table/search-table.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    MoviePageComponent,
    LoadingComponent,
    SearchPannelComponent,
    SearchTableComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
