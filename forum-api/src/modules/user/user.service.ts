import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
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
        throw new HttpException(
          {
            message: 'Usuário não encontrado.',
          },
          HttpStatus.NOT_FOUND
        );
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
        throw new HttpException(
          {
            message: 'Usuário não encontrado.',
          },
          HttpStatus.NOT_FOUND
        );
      }

      if (updateDto?.password && updateDto?.oldPassword) {
        const correctPassword = await user.comparePassword(updateDto.oldPassword);
        if (!correctPassword) {
          throw new HttpException(
            {
              message: 'Senha incorreta.',
            },
            HttpStatus.BAD_REQUEST
          );
        }
        updateDto.password = await bcrypt.hash(updateDto.password, 10);
        delete updateDto?.oldPassword;
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
      const user: User | null = await this.userModel.findByPk(id);
      if (!user) {
        throw new HttpException(
          {
            message: 'Usuário não encontrado.',
          },
          HttpStatus.NOT_FOUND
        );
      }
      await user.destroy();
      return { message: 'Usuário deletado com sucesso.' };
    } catch (error) {
      const { message, status } = error;
      const statusCode = status || HttpStatus.BAD_REQUEST;
      const msgError = message || 'Falha ao deletar usuário.';
      throw new HttpException({ message: msgError }, statusCode);
    }
  }
}
