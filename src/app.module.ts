import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UrlModule } from 'c:/Dev/url__shortener/url_shortener/url-short-backend/src/url/url.module';
import { UrlModule } from './url/url.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // forRoot is to allow connection to database
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
    UrlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
