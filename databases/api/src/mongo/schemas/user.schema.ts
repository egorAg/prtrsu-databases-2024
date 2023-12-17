import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  purchaseDate: Date;

  @Prop()
  review: string;

  @Prop()
  deliveryService: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
