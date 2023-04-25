import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { database } from './config/database';
import { graphql } from './config/graphql';
import { CodePostModule } from './modules/code-post/code-post.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [database, graphql, UserModule, CodePostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
