import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch() // Catch ANY thrown error
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const res = ctx.getResponse<Response>();
      const req = ctx.getRequest<Request>();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let error = 'Internal Server Error';
      let message: unknown = 'Unexpected error';
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const payload = exception.getResponse();
        if (typeof payload === 'string') {
          message = payload;
          error = payload;
        } else if (payload && typeof payload === 'object') {
          const p: any = payload;
          message = p.message ?? message;
          error = p.error ?? error;
        }
      }
  
      const messages = Array.isArray(message) ? message : [message];
  
      res.status(status).json({
        success: false,
        statusCode: status,
        error,
        messages,
        path: req.url,
        timestamp: new Date().toISOString(),
      });
    }
  }
  