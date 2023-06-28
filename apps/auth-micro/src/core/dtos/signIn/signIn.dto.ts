import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDTO {
  @IsEmail(
    {},
    {
      message: 'email invalido',
    },
  )
  @IsNotEmpty({
    message: 'email requerido',
  })
  email: string;
  @IsNotEmpty({
    message: 'Contraseña requerida',
  })
  password: string;
}
