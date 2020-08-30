import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

import { MovieService } from './../shared/movie.service';
import { MovieDetails } from './../shared/movie-details.model';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css'],
})
export class MoviePageComponent implements OnInit {
  movie: MovieDetails;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.loading = true;
          return this.movieService.getMovie(params.id);
        })
      )
      .subscribe((res) => {
        this.movie = res;
        this.loading = false;
      });
  }

  onBack(): void {
    this.location.back();
  }
}
