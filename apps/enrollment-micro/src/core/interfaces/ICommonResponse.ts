import { IErrorResponse } from './IErrorResponse';

export interface ICommonResponse<T = null> {
  data?: T[] | T | null;
  isSuccess: boolean;
  error?: IErrorResponse;
}
