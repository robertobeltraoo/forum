import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsNotEmpty({ message: 'Nome: Campo obrigatório.' })
  @IsString({ message: 'Nome: Precisa ser uma string.' })
  @MinLength(5, { message: 'Nome: Precisa ter pelo menos 5 caracteres.' })
  @MaxLength(50, { message: 'Nome: Máximo de 50 caracteres.' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Email: Campo obrigatório.' })
  @IsEmail({}, { message: 'Email: email inválido.' })
  @MaxLength(50, { message: 'Email: Máximo de 50 caracteres.' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Senha: Campo obrigatório.' })
  @IsString({ message: 'Senha: Precisa ser uma string.' })
  @MinLength(8, { message: 'Senha: Precisa ter pelo menos 8 caracteres.' })
  password: string;
}
