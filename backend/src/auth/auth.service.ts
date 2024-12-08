import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: { email: string; password: string }): Promise<{ name: string; firstname: string; }> {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    
    if (!user || !(await this.usersService.validatePassword(user, loginDto.password))) {
      throw new Error('Invalid credentials');
    }

    return { name: user.name, firstname: user.name};
  }

  async logout() {
    return { message: 'Logout successful' };
  }

  async signup(user: Partial<User>): Promise<User> {
    return this.usersService.create(user);
  }

  async generateJwt(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }
}
