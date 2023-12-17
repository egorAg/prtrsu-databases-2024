import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as chance from 'chance';

const CHANCE = new chance();
export const categories = [
  'Электроника',
  'Одежда',
  'Косметика',
  'Бытовая техника',
];
export const colors = ['Черный', 'Белый', 'Синий', 'Красный'];

@Injectable()
export class MongoService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findProductsByCategory(category: string): Promise<Product[]> {
    const products = await this.productModel
      .find({
        'characteristics.category': category,
      })
      .exec()
      .then((res) => {
        res.map((product) => {
          product.customers = [];

          return product;
        });

        return res;
      });

    return products;
  }

  async findCharacteristicsByCategory(
    category: string,
  ): Promise<Record<string, any>[]> {
    const products = await this.productModel
      .find({
        'characteristics.category': category,
      })
      .exec();

    const characteristicsList = products.map((product) => {
      return product['characteristics'];
    });

    return characteristicsList;
  }

  async findProductsByCustomerName(
    customerName: string,
  ): Promise<{ name: string; price: number }[]> {
    const products = await this.productModel
      .find({
        'customers.name': customerName,
      })
      .exec();

    Logger.log(products);

    const customerProducts: { name: string; price: number }[] = [];

    for (const product of products) {
      customerProducts.push({
        name: product.name,
        price: product.price,
      });
    }

    return customerProducts;
  }

  async findProductsByColor(
    color: string,
  ): Promise<{ name: string; manufacturer: string; price: number }[]> {
    const products = await this.productModel
      .find({
        'characteristics.color': color,
      })
      .exec();

    const colorProducts: {
      name: string;
      manufacturer: string;
      price: number;
    }[] = [];

    products.forEach((product) => {
      colorProducts.push({
        name: product.name,
        manufacturer: product.manufacturer,
        price: product.price,
      });
    });

    return colorProducts;
  }

  async getTotalSalesAmount(): Promise<number> {
    const products = await this.productModel.find().exec();

    Logger.log(products);

    let totalAmount = 0;

    products.forEach((product) => {
      product.customers.forEach((customer) => {
        if (customer.purchaseDate && customer.purchaseDate instanceof Date) {
          totalAmount += product.price;
        }
      });
    });

    return totalAmount;
  }

  async getProductsCountByCategory(): Promise<Record<string, number>> {
    const products = await this.productModel.aggregate([
      { $group: { _id: '$characteristics.category', count: { $sum: 1 } } },
    ]);

    const productsCountByCategory: Record<string, number> = {};

    products.forEach((category) => {
      productsCountByCategory[category._id] = category.count;
    });

    return productsCountByCategory;
  }

  async getCustomerNamesByProduct(productName: string): Promise<string[]> {
    const product = await this.productModel
      .findOne({ name: productName })
      .exec();

    if (!product) {
      return [];
    }

    const customerNames = product.customers.map((customer) => customer.name);

    return customerNames;
  }

  async getCustomerNamesByProductAndDeliveryService(
    productName: string,
    deliveryService: string,
  ): Promise<string[]> {
    const product = await this.productModel
      .findOne({ name: productName })
      .exec();

    if (!product) {
      return [];
    }

    const customersWithDeliveryService = product.customers
      .filter((customer) => customer.deliveryService === deliveryService)
      .map((customer) => customer.name);

    return customersWithDeliveryService;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async getAllCustomers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getAllCategories() {
    return categories;
  }

  async getColors() {
    return colors;
  }

  async createUsers() {
    const users: User[] = [];
    for (let i = 0; i < 5; i++) {
      const newUser: User = {
        name: CHANCE.name(),
        purchaseDate: this.generateRandomDate(),
        review: CHANCE.sentence(),
        deliveryService: CHANCE.company(),
      };
      users.push(newUser);

      const model = await this.userModel.create(newUser);
      await model.save();
    }

    return users;
  }

  async createProducts() {
    const products: Product[] = [];
    const users = await this.getAllCustomers();
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
