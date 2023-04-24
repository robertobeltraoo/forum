import { Module } from '@nestjs/common';
import { CodePostService } from './code-post.service';
import { CodePostResolver } from './code-post.resolver';

@Module({
  providers: [CodePostResolver, CodePostService]
})
export class CodePostModule {}
