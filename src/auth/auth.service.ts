import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SingInDto } from './dto/sing-in.dto';

export interface IResponseSingIn {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async singIn(singInDto: SingInDto): Promise<IResponseSingIn> {
    const user = await this.userService.findUserByUsername(singInDto.username);
    if (user) {
      const matchedPassword = comparePasswords(
        singInDto.password,
        user.password,
      );
      if (!matchedPassword) {
        throw new UnauthorizedException('incorrect username or password');
      }
    }
    const payload = {
      sub: user._id,
      username: user.username,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
