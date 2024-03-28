export type Paginate<T> = {
  nextPag: string | number | null;
  totalRecord: number;
  results: Array<T>;
};
