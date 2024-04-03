import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import _ from 'lodash';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((result) => ({
        statusCode: _.get(result, 'statusCode', context.switchToHttp().getResponse().statusCode),
        message: _.get(result, 'message', ''),
        data: _.get(result, 'data', {}),
      })),
    );
  }
}
