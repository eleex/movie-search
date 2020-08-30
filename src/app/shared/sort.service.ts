import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SortMovie, DirType, ColType } from './sort-movie.model';

@Injectable({ providedIn: 'root' })
export class SortService {
  sort = new BehaviorSubject<SortMovie>({ col: 'title', dir: null });

  setSort(col: ColType): void {
    const newDir = this.calcDir(col);
    const newSort: SortMovie = { col, dir: newDir };

    this.sort.next(newSort);
  }

  private calcDir(col: ColType): DirType | null {
    if (col !== this.sort.getValue().col) {
      return 'asc';
    } else {
      if (this.sort.getValue().dir === 'desc') {
        return null;
      }

      if (this.sort.getValue().dir === 'asc') {
        return 'desc';
      }

      return 'asc';
    }
  }
}
