import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';
export class UserDTO {
  @AutoMap()
  id?: string;
  @AutoMap()
  @IsNotEmpty({
    message: 'Contraseña requerida',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: `Contraseña debe tener al menos una letra en mayuscula\n
    Contraseña debe tener al menos una letra en minuscula\n
    Contraseña debe tener al menos un nummero o simbolo`,
  })
  @MinLength(6, {
    message: `Contraseña debe tener minimo 6 caracteres`,
  })
  password: string;
  statusId?: number;
}
