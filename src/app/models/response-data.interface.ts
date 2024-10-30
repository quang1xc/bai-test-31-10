export interface IResponseData<T> {
  code: number;
  error: string;
  data: T;
}
