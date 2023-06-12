import { Observable } from 'rxjs';
import { IErrorResponse } from './IErrorResponse';

export interface ICommonResponse<T> {
  data?: T[] | T;
  isSuccess: boolean;
  error?: IErrorResponse;
}
