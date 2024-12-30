import { HttpStatus, HttpException } from "@nestjs/common";

export class NotExistsException extends HttpException {
  constructor() {
    super("없습니다.", HttpStatus.NOT_FOUND);
  }
}
