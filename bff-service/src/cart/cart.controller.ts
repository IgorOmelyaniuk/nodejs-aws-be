import { All, Controller, Req, Res, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { ProxyService } from 'src/proxy/proxy.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: ProxyService, private configService: ConfigService) {}

  @All()
  handleRequest(@Req() request: Request, @Res() response: Response): any {
    const urlParams = request.originalUrl.slice(1).split('/');
    const recipient = urlParams[0];
    const recipientUrl = this.configService.get<string>(recipient);

    if (recipientUrl) {
      const url = `${recipientUrl}/${urlParams.slice(1).join('/')}`;
      return this.cartService.handleRequest(url, request, response);
    }

    return {
      statusCode: HttpStatus.NOT_IMPLEMENTED,
      message: 'Can not handle this request'
    }
  }
}

