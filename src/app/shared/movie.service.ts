import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Movie } from './movie.model';
import { MovieDetails } from './movie-details.model';
import { ErrorResponse } from './error-response.model';

@Injectable({ providedIn: 'root' })
export class MovieService {
  api = 'https://www.omdbapi.com/';
  apiKey = '2b04e489';

  public currentPage = new BehaviorSubject<number>(1);
  public totalResults = new Subject<number>();

  constructor(private http: HttpClient) {}

  getMovies(
    request: string,
    year: string,
    page: number
  ): Observable<Movie[] | ErrorResponse> {
    const options = {
      params: new HttpParams()
        .set('apiKey', this.apiKey)
        .set('s', request)
        .set('y', year)
        .set('page', page.toString()),
    };

    return this.http.get<Movie | ErrorResponse>(this.api, options).pipe(
      map((res: any) => {
        if (res.Response === 'False') {
          this.totalResults.next(0);
          return new ErrorResponse(res.Response, res.Error);
        }

        this.totalResults.next(+res.totalResults);
        return res.Search.map(
          (movie: any) =>
            new Movie(movie.Title, movie.Year, movie.Type, movie.imdbID)
        );
      })
    );
  }

  getMovie(id: string): Observable<MovieDetails> {
    const options = {
      params: new HttpParams().set('apiKey', this.apiKey).set('i', id),
    };

    return this.http.get<MovieDetails>(this.api, options).pipe(
      map((res: any) => {
        return {
          title: res.Title,
          year: res.Year,
          type: res.Type,
          id: res.imdbID,
          poster: res.Poster,
          language: res.Language,
          country: res.Country,
          director: res.Director,
          actors: res.Actors,
          plot: res.Plot,
          genre: res.Genre,
          runtime: res.Runtime,
        };
      })
    );
  }
}
