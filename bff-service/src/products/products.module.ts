import { Module, CacheModule, HttpModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProductsController } from './products.controller';
import { ProxyService } from 'src/proxy/proxy.service';

@Module({
  imports: [HttpModule, CacheModule.register({ ttl: 120 })],
  controllers: [ProductsController],
  providers: [ConfigService, ProxyService],
})
export class ProductsModule {}

