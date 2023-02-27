import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async findAll() {
    return `This action returns all auth`;
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        googleId: loginDto.googleId,
      },
    });

    if (!user) {
      await this.prisma.user.create({
        data: {
          email: loginDto.email,
          googleId: loginDto.googleId,
          googleName: loginDto.googleName,
          username: loginDto.googleName,
          photo: loginDto.googlePicture,
        },
      });
    }

    return this.signToken(loginDto.googleId);
  }

  signToken(googleId: string) {
    const payload = { googleId };

    return this.jwt.signAsync(payload, {
      expiresIn: process.env.TOKEN_EXPIRED,
      secret: process.env.SECRET_KEY,
    });
  }
}
