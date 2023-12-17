import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoController } from './mongo.controller';
import { MongoService } from './mongo.service';
import { Product, ProductSchema } from './schemas/product.schema';
import { User, UserSchema } from './schemas/user.schema';
import { MongoStartService } from './mongo.start.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [MongoController],
  providers: [MongoService, MongoStartService],
  exports: [MongoService, MongoStartService],
})
export class MongoModule {}
