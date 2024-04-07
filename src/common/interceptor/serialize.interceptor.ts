import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import _ from 'lodash';

export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private dto: ClassConstructor<T>) {}
  intercept(_context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(
      map((result: T) => {
        const data = _.get(result, 'data', result);
        if (_.isNil(data)) return result;
        return {
          ...result,
          data: _.isArray(data)
            ? data.map((item) =>
                plainToClass(this.dto, item, {
                  excludeExtraneousValues: true,
                }),
              )
            : plainToClass(this.dto, data, {
                excludeExtraneousValues: true,
              }),
        };
      }),
    );
  }
}
