import { Movie } from './movie.model';
import { MovieRes } from './movie-res.model';

export class MovieDetails extends Movie {
  poster: string;
  language: string;
  country: string;
  director: string;
  actors: string;
  plot: string;
  genre: string;
  runtime: string;

  constructor(data: MovieRes) {
    super(data.title, data.year, data.type, data.id);

    this.poster = data.poster;
    this.language = data.language;
    this.country = data.country;
    this.director = data.director;
    this.actors = data.actors;
    this.plot = data.plot;
    this.genre = data.genre;
    this.runtime = data.runtime;
  }
}
