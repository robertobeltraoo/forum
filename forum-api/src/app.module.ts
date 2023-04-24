import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CodePostModule } from './code-post/code-post.module';

@Module({
  imports: [UserModule, CodePostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
