import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ItemsController } from './items/items.controller';

@Module({
  imports: [AuthModule],
  controllers: [AppController, ItemsController],
  providers: [AppService],
})
export class AppModule {}
