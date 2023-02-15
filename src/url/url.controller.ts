/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Url } from './schemas/url.schema';
import { UrlDto } from './url.dto';
import { UrlService } from './url.service';

@Controller('urls') //http://localhost:3001/urls
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Get()
  async getAllUrls(): Promise<Url[]> {
    return this.urlService.findAll();
  }
  @Post('newUrl')
  async create(@Body() urlDto: UrlDto) {
    return this.urlService.addNewUrl(urlDto);
  }
  @Delete(':id')
  async deleteUrl(@Param('id') id: string) {
    return this.urlService.deleteUrl(id);
  }
}
