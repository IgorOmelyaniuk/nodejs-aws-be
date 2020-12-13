import { All, Controller, Get, Req, Res, UseInterceptors, CacheInterceptor, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { ProxyService } from 'src/proxy/proxy.service';

@Controller('product')
export class ProductsController {
  constructor(private productsService: ProxyService, private configService: ConfigService) {}

  @Get('products')
  @UseInterceptors(CacheInterceptor)
  handleProducts(@Req() request: Request, @Res() response: Response): any {
    const recipientUrl = this.configService.get<string>('product');
    const url = `${recipientUrl}/products`;
    return this.productsService.handleRequest(url, request, response);
  }

  @All()
  handleRequest(@Req() request: Request, @Res() response: Response): any {
    const urlParams = request.originalUrl.slice(1).split('/');
    const recipient = urlParams[0];
    const recipientUrl = this.configService.get<string>(recipient);

    if (recipientUrl) {
      const url = `${recipientUrl}/${urlParams.slice(1).join('/')}`;
      return this.productsService.handleRequest(url, request, response);
    }

    return {
      statusCode: HttpStatus.NOT_IMPLEMENTED,
      message: 'Can not handle this request'
    }
  }
}

