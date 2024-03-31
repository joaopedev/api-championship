import {
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Body,
    UseGuards,
    Request,
    Get,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { AuthGuard } from './auth.guard';
  import { Roles } from './roles/role.decorator';
  import { RolesGuard } from './roles/roles.guard';
  import { SingInDto } from './dto/sing-in.dto';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.ACCEPTED)
    @Post('email/login')
    async singIn(@Body() singInDto: SingInDto) {
      const response = await this.authService.singIn(singInDto);
      return response;
    }
  
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('patient', 'admin', 'doctor')
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }
  