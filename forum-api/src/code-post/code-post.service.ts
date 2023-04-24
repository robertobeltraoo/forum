import { Injectable } from '@nestjs/common';
import { CreateCodePostInput } from './dto/create-code-post.input';
import { UpdateCodePostInput } from './dto/update-code-post.input';

@Injectable()
export class CodePostService {
  create(createCodePostInput: CreateCodePostInput) {
    return 'This action adds a new codePost';
  }

  findAll() {
    return `This action returns all codePost`;
  }

  findOne(id: number) {
    return `This action returns a #${id} codePost`;
  }

  update(id: number, updateCodePostInput: UpdateCodePostInput) {
    return `This action updates a #${id} codePost`;
  }

  remove(id: number) {
    return `This action removes a #${id} codePost`;
  }
}
