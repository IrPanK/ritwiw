import { Injectable } from '@nestjs/common';
import { GetUserDTO } from 'src/common/get-user/get-user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { TwitDTO } from './dto';

@Injectable()
export class TwitService {
  constructor(private prisma: PrismaService) {}

  async getAllTwit() {
    const result = await this.prisma.twit.findMany({
      where: {
        isPublic: true,
      },
    });
    return result;
  }

  async getSomeoneTwit(id: string) {
    const result = await this.prisma.twit.findMany({
      where: {
        isPublic: true,
        userId: id,
      },
    });

    return result;
  }

  async getMyTwit(user: GetUserDTO) {
    const result = await this.prisma.twit.findMany({
      where: {
        userId: user.googleId,
      },
    });
    return result;
  }

  async getLoggedUserTwit(user: GetUserDTO) {
    const publicResult = await this.getAllTwit();
    const privateResult = await this.prisma.twit.findMany({
      where: {
        isPublic: false,
        shownTo: {
          has: user.googleId,
        },
      },
    });

    // concat result and sort based on create
    const result: any = publicResult.concat(privateResult);
    result.sort((a, b) => a.createdAt - b.createdAt);
    return result;
  }

  async postTwit(data: TwitDTO, user: GetUserDTO) {
    const userData = await this.prisma.user.findUnique({
      where: { googleId: user.googleId },
    });

    await this.prisma.twit.create({
      data: {
        content: data.content,
        isPublic: data.isPublic,
        author: userData.username,
        authorPicture: userData.photo,
        shownTo: userData.closefriends.concat(user.googleId),
        userId: user.googleId,
      },
    });
  }

  async updateTwit(data: TwitDTO) {
    await this.prisma.twit.update({
      where: {
        id: data.id,
      },
      data: {
        content: data.content,
      },
    });
  }

  async deleteTwit(data: TwitDTO) {
    await this.prisma.twit.delete({
      where: { id: data.id },
    });
  }
}
