import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateCodePostInput {
  @Field()
  @IsNotEmpty({ message: 'Título: Campo obrigatório.' })
  @IsString({ message: 'Título: Precisa ser uma string.' })
  @MinLength(5, { message: 'Título: Precisa ter pelo menos 5 caracteres.' })
  @MaxLength(50, { message: 'Título: Máximo de 50 caracteres.' })
  title: string;

  @Field()
  @IsNotEmpty({ message: 'Descrição: Campo obrigatório.' })
  @IsString({ message: 'Descrição: Precisa ser uma string.' })
  @MinLength(5, { message: 'Descrição: Precisa ter pelo menos 5 caracteres.' })
  @MaxLength(500, { message: 'Descrição: Máximo de 500 caracteres.' })
  describe: string;

  @Field()
  @IsNotEmpty({ message: 'Code: Campo obrigatório.' })
  @IsString({ message: 'Code: Precisa ser uma string.' })
  @MinLength(5, { message: 'Code: Precisa ter pelo menos 5 caracteres.' })
  code: string;

  //uma forest key pra pegar o id da tabela tecnológia, no front sera um select
  @Field()
  @IsNotEmpty({ message: 'Tecnológia: Campo obrigatório.' })
  @IsNumber({}, { message: 'Tecnológia: Campo numérico.' })
  @IsInt({ message: 'Tecnológia: Valor precisa ser um número inteiro.' })
  technology: number;

  //uma forest key pra pegar o id da tabela color, no front sera um select
  @Field()
  @IsNumber({}, { message: 'Tecnológia: Campo numérico.' })
  @IsInt({ message: 'Tecnológia: Valor precisa ser um número inteiro.' })
  color: number;
}
