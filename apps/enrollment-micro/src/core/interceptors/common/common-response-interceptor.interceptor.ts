import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ICommonResponse } from '../../interfaces';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class CommonResponseInterceptorInterceptor<T>
  implements NestInterceptor<Partial<T>, ICommonResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ICommonResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data: instanceToPlain(data as T),
          isSuccess: true,
        } as ICommonResponse<T>;
      }),
    );
  }
}
