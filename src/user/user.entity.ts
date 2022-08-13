import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUserAlreadyExist } from './is-user-name-already-exist.validator';

export class User {
  id: number;

  @IsUserAlreadyExist({
    message: 'Nome de usuário precisa ser único',
  })
  @IsNotEmpty({
    message: 'Nome de usuário é obrigatório',
  })
  @IsString({
    message: 'Nome de usuário precisa ser uma string',
  })
  userName: string;

  @IsEmail({}, { message: 'Email precisa ser um endereço de email válido' })
  email: string;

  @Exclude({
    toPlainOnly: true,
  })
  @IsNotEmpty({
    message: 'Senha é obrigatório',
  })
  password: string;

  @IsNotEmpty({
    message: 'Nome completo é obrigatório',
  })
  fullName: string;
  joinDate: Date;
}
