import { Module } from '@nestjs/common';
import { TwitService } from './twit.service';
import { TwitController } from './twit.controller';

@Module({
  controllers: [TwitController],
  providers: [TwitService]
})
export class TwitModule {}
