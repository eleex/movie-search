import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MovieService } from './../../shared/movie.service';

@Component({
  selector: 'app-search-pannel',
  templateUrl: './search-pannel.component.html',
  styleUrls: ['./search-pannel.component.css'],
})
export class SearchPannelComponent implements OnInit {
  form: FormGroup;
  minYear = 1900;
  maxYear = new Date().getFullYear();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      year: new FormControl(null, [
        Validators.min(this.minYear),
        Validators.max(this.maxYear),
      ]),
    });

    this.route.queryParams.subscribe((params) => {
      this.form.patchValue({
        title: params.title,
        year: params.year,
      });
    });
  }

  onSubmit(): void {
    this.movieService.currentPage.next(1);

    const title = this.form.get('title').value.trim();
    const year = this.form.get('year').value;

    this.router.navigate(['/movies-list'], {
      queryParams: { title, year },
    });
  }
}
