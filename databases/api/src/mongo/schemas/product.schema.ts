import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User, UserSchema } from './user.schema'; // Импортируем схему пользователя

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  manufacturer: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: Map, of: mongoose.Schema.Types.Mixed }) // Используем Map для произвольных характеристик
  characteristics: Map<string, any>;

  @Prop({ type: [UserSchema] }) // Используем ссылку на схему пользователя для массива пользователей
  customers: User[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
