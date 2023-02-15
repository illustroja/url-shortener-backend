/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlController } from './url.controller';
import { UrlSchema } from './schemas/url.schema';
import { UrlService } from './url.service';

@Module({
  imports: [
    // forFeature to allow creating collections in database
    MongooseModule.forFeature([
      {
        name: 'Url',
        schema: UrlSchema,
      },
    ]),
  ],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
