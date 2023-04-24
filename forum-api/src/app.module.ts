import { graphql } from './database/config/graphql';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { database } from './config/database';
import { UserModule } from './user/user.module';
import { CodePostModule } from './code-post/code-post.module';

@Module({
  imports: [database, graphql, UserModule, CodePostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
