import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

export const categories = [
  'Электроника',
  'Одежда',
  'Косметика',
  'Бытовая техника',
];
export const colors = ['Черный', 'Белый', 'Синий', 'Красный'];
export const delivery = ['ozon', 'wb', 'cdek', 'pek'];

@Injectable()
export class MongoService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findProductsByCategory(category: string): Promise<Product[]> {
    return await this.productModel
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
  }

  async findCharacteristicsByCategory(
    category: string,
  ): Promise<Record<string, any>[]> {
    const products = await this.productModel
      .find({
        'characteristics.category': category,
      })
      .exec();

    return products.map((product) => {
      return product['characteristics'];
    });
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

    return product.customers.map((customer) => customer.name);
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

    return product.customers
      .filter((customer) => customer.deliveryService === deliveryService)
      .map((customer) => customer.name);
  }

  public async getAllCustomers() {
    return this.userModel.find().exec();
  }

  public async getAllProducts() {
    return this.productModel.find().exec();
  }

  async getAllCategories() {
    return categories;
  }

  async getColors() {
    return colors;
  }
}
