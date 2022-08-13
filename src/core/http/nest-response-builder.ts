/* eslint-disable @typescript-eslint/ban-types */
import { NestResponse } from './nest-response';

export class NestResponseBuilder {
  private response: NestResponse = {
    status: 200,
    headers: {},
    body: {},
  };

  public withStatus(status: number): NestResponseBuilder {
    this.response.status = status;
    return this;
  }

  public withHeaders(headers: Object): NestResponseBuilder {
    this.response.headers = headers;
    return this;
  }

  public withBody(body: Object): NestResponseBuilder {
    this.response.body = body;
    return this;
  }

  public build(): NestResponse {
    return new NestResponse(this.response);
  }
}
