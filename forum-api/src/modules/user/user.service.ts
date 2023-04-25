import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import bcrypt from 'bcrypt';
import { IUser } from '../../shared/interfaces/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {}

  async create(createDto: CreateUserDto): Promise<IUser> {
    try {
      const emailAlreadyExists: User | null = await this.userModel.findOne({ where: { email: createDto.email } });
      if (emailAlreadyExists) {
        throw new HttpException(
          {
            message: 'Email já existe.',
          },
          HttpStatus.CONFLICT
        );
      }
      return await this.userModel.create(createDto as User);
    } catch (error) {
      const { message, status } = error;
      const statusCode = status || HttpStatus.BAD_REQUEST;
      const msgError = message || 'Falha ao criar usuário.';
      throw new HttpException({ message: msgError }, statusCode);
    }
  }

  async findAll(): Promise<IUser[]> {
    try {
      return await this.userModel.findAll();
    } catch (error) {
      const { message, status } = error;
      const statusCode = status || HttpStatus.BAD_REQUEST;
      const msgError = message || 'Falha ao buscar usuários.';
      throw new HttpException({ message: msgError }, statusCode);
    }
  }

  async findOne(id: number): Promise<IUser> {
    try {
      const user = await this.userModel.findByPk(id);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      return user;
    } catch (error) {
      const { message, status } = error;
      const statusCode = status || HttpStatus.BAD_REQUEST;
      const msgError = message || 'Falha ao buscar usuário.';
      throw new HttpException({ message: msgError }, statusCode);
    }
  }

  async update(updateDto: UpdateUserDto): Promise<IUser> {
    try {
      const user = await this.userModel.findByPk(updateDto.id);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      if (updateDto?.password && updateDto?.comparePassword) {
        bcrypt.compare(updateDto.comparePassword, user.password);
        updateDto.password = await bcrypt.hash(updateDto.password, 10);
        delete updateDto?.comparePassword;
      }
      const updatedUser = await user.update(Object.assign(user, updateDto));
      return updatedUser;
    } catch (error) {
      const { message, status } = error;
      const statusCode = status || HttpStatus.BAD_REQUEST;
      const msgError = message || 'Falha ao atualizar usuário.';
      throw new HttpException({ message: msgError }, statusCode);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const user = await this.userModel.findByPk(id);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      await user.destroy();
      return { message: 'Usuário deletado com sucesso' };
    } catch (error) {
      const { message, status } = error;
      const statusCode = status || HttpStatus.BAD_REQUEST;
      const msgError = message || 'Falha ao deletar usuário.';
      throw new HttpException({ message: msgError }, statusCode);
    }
  }
}
