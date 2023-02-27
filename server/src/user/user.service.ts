import { Injectable } from '@nestjs/common';
import { GetUserDTO } from 'src/common/get-user/get-user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(user: GetUserDTO) {
    const result = await this.prisma.user.findUnique({
      where: {
        googleId: user.googleId,
      },
    });
    return result;
  }

  async getAllUser() {
    const result = await this.prisma.user.findMany();

    return result;
  }

  async getSomeUser(id: string) {
    const result = await this.prisma.user.findUnique({
      where: { googleId: id },
    });

    return result;
  }

  async UpdateUser(data: UserDTO, user: GetUserDTO) {
    await this.prisma.user.update({
      where: {
        googleId: user.googleId,
      },
      data,
    });

    if (data?.closefriends) {
      await this.prisma.twit.updateMany({
        where: {
          userId: user.googleId,
        },
        data: { shownTo: data.closefriends },
      });
    }

    if (data?.username) {
      await this.prisma.twit.updateMany({
        where: {
          userId: user.googleId,
        },
        data: { author: data.username },
      });
    }

    if (data?.photo) {
      await this.prisma.twit.updateMany({
        where: {
          userId: user.googleId,
        },
        data: { authorPicture: data.photo },
      });
    }
  }
}
