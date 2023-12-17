import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { categories, colors, delivery } from './mongo.service';
import * as Chance from 'chance';

const CHANCE = new Chance();

@Injectable()
export class MongoStartService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getAllProductsAtStart(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async getAllCustomersAtStart(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createUsers() {
    const users: User[] = [];
    for (let i = 0; i < 5; i++) {
      const randomDelivery = CHANCE.integer({
        min: 0,
        max: delivery.length - 1,
      });
      const newUser: User = {
        name: CHANCE.name(),
        purchaseDate: this.generateRandomDate(),
        review: CHANCE.sentence(),
        deliveryService: delivery[randomDelivery],
      };
      users.push(newUser);

      const model = await this.userModel.create(newUser);
      await model.save();
    }

    return users;
  }

  async createProducts() {
    const products: Product[] = [];
    const users = await this.getAllCustomersAtStart();
    for (let i = 0; i < 20; i++) {
      const randomCategoryIndex = CHANCE.integer({
        min: 0,
        max: categories.length - 1,
      });
      const randomColorIndex = CHANCE.integer({
        min: 0,
        max: colors.length - 1,
      });
      const newProduct: Product = {
        name: CHANCE.word(),
        manufacturer: CHANCE.company(),
        price: CHANCE.floating({ min: 1, max: 1000, fixed: 2 }),
        characteristics: new Map<string, any>([
          ['category', categories[randomCategoryIndex]],
          ['color', colors[randomColorIndex]],
        ]),
        customers: CHANCE.pickset(users, CHANCE.integer({ min: 1, max: 5 })), // Связываем случайных пользователей с продуктом
      };

      const model = await this.productModel.create(newProduct);
      await model.save();
      products.push(newProduct);
    }

    return products;
  }

  private generateRandomDate(): Date {
    const currentDate = new Date();
    const pastDate = new Date(currentDate);
    pastDate.setMonth(currentDate.getMonth() - 6);
    return new Date(CHANCE.date({ min: pastDate, max: currentDate }));
  }
}
