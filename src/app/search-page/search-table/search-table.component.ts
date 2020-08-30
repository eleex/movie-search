import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Movie } from './../../shared/movie.model';
import { SortMovie, ColType } from './../../shared/sort-movie.model';
import { ErrorResponse } from './../../shared/error-response.model';
import { MovieService } from './../../shared/movie.service';
import { SortService } from './../../shared/sort.service';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.css'],
})
export class SearchTableComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  sortedMovies: Movie[];
  currentSort: SortMovie;
  totalMovies: number;
  title = '';
  year = '';
  carrentPage: number;
  loading = false;
  errorMessage: string = null;
  subCurrentPage: Subscription;
  subTotalResults: Subscription;
  subSort: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private sortService: SortService
  ) {}

  ngOnInit(): void {
    this.subTotalResults = this.movieService.totalResults.subscribe((res) => {
      this.totalMovies = res;
    });

    this.subCurrentPage = this.movieService.currentPage.subscribe((res) => {
      this.carrentPage = res;
    });

    this.subSort = this.sortService.sort.subscribe((sort) => {
      this.currentSort = sort;

      if (this.currentSort) {
        this.sortTable(this.currentSort);
      }
    });

    this.route.queryParams
      .pipe(
        map((params: Params) => {
          this.loading = true;
          this.title = params.title;
          this.year = params.year;
          return params;
        }),
        switchMap(() => {
          return this.movieService.getMovies(
            this.title,
            this.year,
            this.carrentPage
          );
        })
      )
      .subscribe(
        (data) => {
          if (data instanceof ErrorResponse) {
            this.errorMessage = data.error;
            this.movies = [];
            this.sortedMovies = [];
            this.loading = false;
          } else {
            this.errorMessage = null;
            this.movies = data;
            this.sortedMovies = data;
            this.loading = false;
          }
        },
        () => {
          this.loading = false;
          this.errorMessage =
            'Something went wrong check your connection and try again!';
        }
      );
  }

  ngOnDestroy(): void {
    this.subTotalResults.unsubscribe();
    this.subCurrentPage.unsubscribe();
    this.subSort.unsubscribe();
  }

  onMovieClick(id: string): void {
    this.router.navigate(['/movie-page', id]);
  }

  onPageChange(page: number): void {
    this.movieService.currentPage.next(page);

    this.movieService.getMovies(this.title, this.year, page).subscribe(
      (data) => {
        if (data instanceof ErrorResponse) {
          this.errorMessage = data.error;
          this.movies = [];
          this.sortedMovies = [];
        } else {
          this.errorMessage = null;
          this.movies = data;
          this.sortedMovies = data;
        }
      },
      () => {
        this.loading = false;
        this.errorMessage =
          'Something went wrong check your connection and try again!';
      }
    );
  }

  onSort(col: ColType): void {
    this.sortService.setSort(col);
  }

  private sortTable(sort: SortMovie): void {
    if (sort.dir === null) {
      this.sortedMovies = [...this.movies];
    } else {
      this.sortedMovies = [...this.movies].sort((a, b) => {
        if (sort.dir === 'asc') {
          if (a[sort.col] > b[sort.col]) {
            return 1;
          }
          if (a[sort.col] < b[sort.col]) {
            return -1;
          }

          return 0;
        } else {
          if (a[sort.col] < b[sort.col]) {
            return 1;
          }
          if (a[sort.col] > b[sort.col]) {
            return -1;
          }

          return 0;
        }
      });
    }
  }
}
