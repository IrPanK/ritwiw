import {
  Controller,
  Body,
  UseGuards,
  Get,
  Post,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser, GetUserDTO } from 'src/common/get-user/get-user.decorator';
import { TwitDTO } from './dto';
import { TwitService } from './twit.service';

@Controller('twit')
export class TwitController {
  constructor(private readonly twitService: TwitService) {}

  @Get()
  async getAllTwit() {
    const data = await this.twitService.getAllTwit();

    const response = {
      responseCode: HttpStatus.OK,
      content: data,
    };

    return response;
  }

  @Get('someone/:id')
  async getSomeoneTwit(@Param('id') id: string) {
    const data = await this.twitService.getSomeoneTwit(id);

    const response = {
      responseCode: HttpStatus.OK,
      content: data,
    };

    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-twit')
  async getMyTwit(@GetUser() user: GetUserDTO) {
    const data = await this.twitService.getMyTwit(user);

    const response = {
      responseCode: HttpStatus.OK,
      content: data,
    };

    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('logged-user-twit')
  async getLoggedUserTwit(@GetUser() user: GetUserDTO) {
    const data = await this.twitService.getLoggedUserTwit(user);

    const response = {
      responseCode: HttpStatus.OK,
      content: data,
    };

    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async postTwit(@Body() data: TwitDTO, @GetUser() user: GetUserDTO) {
    await this.twitService.postTwit(data, user);

    const response = {
      responseCode: HttpStatus.CREATED,
      content: 'data created',
    };

    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async updateTwit(@Body() data: TwitDTO) {
    await this.twitService.updateTwit(data);

    const response = {
      responseCode: HttpStatus.CREATED,
      content: 'data updated',
    };

    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteTwit(@Body() data: TwitDTO) {
    await this.twitService.deleteTwit(data);

    const response = {
      responseCode: HttpStatus.OK,
      content: 'data deleted',
    };

    return response;
  }
}
