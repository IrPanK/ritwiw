import {
  Controller,
  UseGuards,
  Get,
  HttpStatus,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser, GetUserDTO } from 'src/common/get-user/get-user.decorator';
import { UserDTO } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUser(@GetUser() user: GetUserDTO) {
    const result = await this.userService.getUser(user);

    const response = {
      responseCode: HttpStatus.OK,
      content: result,
    };

    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all-user')
  async getAllUser() {
    const result = await this.userService.getAllUser();

    const response = {
      responseCode: HttpStatus.OK,
      content: result,
    };

    return response;
  }

  @Get(':id')
  async getSomeUser(@Param('id') id: string) {
    const result = await this.userService.getSomeUser(id);

    const response = {
      responseCode: HttpStatus.OK,
      content: result,
    };

    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async UpdateUser(@Body() data: UserDTO, @GetUser() user: GetUserDTO) {
    await this.userService.UpdateUser(data, user);

    const response = {
      responseCode: HttpStatus.CREATED,
      content: 'data updated',
    };

    return response;
  }
}
