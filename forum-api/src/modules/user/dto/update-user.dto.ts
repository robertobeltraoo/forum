import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class UpdateUserDto {
  @Field({ nullable: false })
  @IsNotEmpty()
  @IsNumber({}, { message: 'Id: Precisa ser uma string.' })
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Nome: Precisa ser uma string.' })
  @MinLength(5, { message: 'Nome: Precisa ter pelo menos 5 caracteres.' })
  @MaxLength(50, { message: 'Nome: Máximo de 50 caracteres.' })
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail({}, { message: 'Email: email inválido.' })
  @MaxLength(50, { message: 'Email: Máximo de 50 caracteres.' })
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Senha: Precisa ser uma string.' })
  @MinLength(8, { message: 'Senha: Precisa ter pelo menos 8 caracteres.' })
  password?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Senha: Precisa ser uma string.' })
  @MinLength(8, { message: 'Senha: Precisa ter pelo menos 8 caracteres.' })
  comparePassword?: string;
}
