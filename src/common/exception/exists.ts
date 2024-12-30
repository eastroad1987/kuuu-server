import { HttpStatus, HttpException } from "@nestjs/common";

export class ExistsException extends HttpException {
  constructor() {
    super("이미 있습니다.", HttpStatus.BAD_REQUEST);
  }
}
