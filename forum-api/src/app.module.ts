import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { database } from './config/database';

@Module({
  imports: [database],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
