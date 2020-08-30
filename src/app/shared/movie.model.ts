export class Movie {
  title: string;
  year: string;
  type: string;
  id: string;

  constructor(title: string, year: string, type: string, id: string) {
    this.title = title;
    this.year = year;
    this.type = type;
    this.id = id;
  }
}
