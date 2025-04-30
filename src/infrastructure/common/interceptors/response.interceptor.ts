import { Injectable } from '@nestjs/common';
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();

        if (data && data.statusCode && data.message) {
          return data;
        }

        return {
          statusCode: response.statusCode,
          message: 'Operation successful',
          data: data || null,
        };
      }),
    );
  }
}
