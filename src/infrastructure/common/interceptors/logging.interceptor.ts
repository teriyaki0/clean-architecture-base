import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MyLoggerService } from 'src/infrastructure/logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: MyLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, body, query } = context.switchToHttp().getRequest();

    const serviceName = context.getClass().name;
    const methodName = context.getHandler().name;

    const assign = {
      path: `${serviceName}/${methodName}`,
    };

    let payload: any;
    if (method === 'POST') payload = body;
    else payload = query;

    if (Object.keys(payload).length !== 0) Object.assign(assign, { payload: payload });
    const reqId = this.logger.log({ method: method, payload: payload, path: assign.path });

    if (method === 'POST') body.reqId = reqId;
    else query.reqId = reqId;

    return next.handle();
  }
}
