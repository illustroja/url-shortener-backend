/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from './schemas/url.schema';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(Url.name)
    private urlModel: Model<Url>,
  ) {}

  string_clean(string) {
    return string.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');
  }

  shortenUrl(url) {
    // General length of shortened url should be 6-10 chars long
    // input: https://www.google.com/
    // output: goocom
    let short = '';
    const arr_sub_strings = url.split('.');
    const temp_arr = [];
    for (const sub of arr_sub_strings) {
      // strip away 'www' and whatever is left of it
      if (!sub.includes('www')) {
        if (sub.length > 3) {
          temp_arr.push(sub.slice(0, 3));
        } else {
          temp_arr.push(sub);
        }
      }
    }
    short = temp_arr.join('');
    return (short = this.string_clean(short));
  }

  async findAll(): Promise<Url[]> {
    const urls = await this.urlModel.find();
    return urls;
  }

  async addNewUrl(url: Url): Promise<Url> {
    // Get all shortened Urls from DB and check if already exists
    const urls = await this.urlModel.find();

    // Check if shortenred ver already exists,
    let try_shorting = await this.shortenUrl(url.original_url);

    // Store an array of ALL shortened urls
    const all_shorts = [];
    for (const url_obj of urls) {
      all_shorts.push(url_obj.shortened_url);
    }

    while (all_shorts.includes(try_shorting)) {
      // Algo to randomise try_shorting
      try_shorting =
        try_shorting +
        '.' +
        url.original_url.charAt(
          Math.floor(Math.random() * url.original_url.length - 1),
        );
    }
    // Add into db
    const newUrl = new this.urlModel({
      original_url: url.original_url,
      shortened_url: try_shorting,
    });

    const res = await this.urlModel.create(newUrl);
    return res;
  }
  async deleteUrl(id): Promise<Url> {
    return await this.urlModel.findByIdAndDelete(id);
  }
}
