export type ColType = 'title' | 'year' | 'type';

export type DirType = 'asc' | 'desc';

export interface SortMovie {
  col: ColType;
  dir: DirType | null;
}
