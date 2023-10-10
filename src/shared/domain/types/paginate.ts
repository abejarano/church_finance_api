export type Paginate<T> = {
  nextPag: string | number;
  count: number;
  results: Array<T>;
};
