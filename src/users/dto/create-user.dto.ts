export class CreateUserDto {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  cpf: string;
  sex: string;
  birth: Date;
  otp?: string;
}

  