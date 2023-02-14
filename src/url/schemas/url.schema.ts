/* eslint-disable prettier/prettier */
// Schema for saving our url and shortened urls
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlModel = Url & Document;

@Schema()
export class Url {
  @Prop({ unique: true })
  original_url: string;

  @Prop({ unique: true })
  shortened_url: string;
}


export const UrlSchema = SchemaFactory.createForClass(Url);
