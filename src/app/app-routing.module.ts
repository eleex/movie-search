import { MovieGuard } from './shared/movie.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SearchPageComponent } from './search-page/search-page.component';
import { SearchTableComponent } from './search-page/search-table/search-table.component';
import { MoviePageComponent } from './movie-page/movie-page.component';

const routes: Routes = [
  {
    path: '',
    component: SearchPageComponent,
    children: [
      {
        path: 'movies-list',
        component: SearchTableComponent,
        canActivate: [MovieGuard],
      },
    ],
  },
  { path: 'movie-page/:id', component: MoviePageComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
