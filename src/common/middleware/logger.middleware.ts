import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();
  use(req: Request, res: Response, next: NextFunction) {
    const endPoint = req.originalUrl.substring(1).toLocaleUpperCase();
    this.logger.log(`${req.method}:${decodeURI(endPoint)}`);
    next();
  }
}
