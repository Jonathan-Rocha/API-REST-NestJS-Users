/* eslint-disable @typescript-eslint/ban-types */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core/adapters/http-adapter';
import { HttpAdapterHost } from '@nestjs/core/helpers/http-adapter-host';
import { map, Observable } from 'rxjs';
import { NestResponse } from './nest-response';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((responseOfController: NestResponse) => {
        if (responseOfController instanceof NestResponse) {
          const ctx = context.switchToHttp();
          const response = ctx.getResponse();
          const { headers, status, body } = responseOfController;

          const namesOfHeaders = Object.getOwnPropertyNames(headers);

          namesOfHeaders.forEach((nameOfHeader: keyof Object): void => {
            const headerValue: any = headers[nameOfHeader];
            this.httpAdapter.setHeader(response, nameOfHeader, headerValue);
          });
          this.httpAdapter.status(response, status);

          return body;
        }
        return responseOfController;
      }),
    );
  }
}
