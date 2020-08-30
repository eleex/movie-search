export class ErrorResponse {
  response: string;
  error: string;

  constructor(res: string, er: string) {
    this.response = res;
    this.error = er;
  }
}
