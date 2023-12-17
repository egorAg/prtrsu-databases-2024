import { Controller, Get, Param } from '@nestjs/common';
import { colors, delivery, MongoService } from './mongo.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Routes } from '../global/routes';

@Controller('mongo-connector')
@ApiTags('Mongo')
export class MongoController {
  constructor(private readonly productService: MongoService) {}

  @ApiOperation({
    summary: 'получение списка товаров по категории',
  })
  @Get(Routes.Mongo.TASK_1)
  async getProductNamesByCategory(@Param('categoryName') categoryName: string) {
    return this.productService.findProductsByCategory(categoryName);
  }

  @ApiOperation({
    summary: 'Получить список характеристик товаров заданной категории',
  })
  @Get(Routes.Mongo.TASK_2)
  async getCharacteristicsByCategory(
    @Param('categoryName') categoryName: string,
  ) {
    return this.productService.findCharacteristicsByCategory(categoryName);
  }

  @ApiOperation({
    summary:
      'получить список названий и стоимости товаров, купленных заданным покупателем',
  })
  @Get(Routes.Mongo.TASK_3)
  async findProductsByCustomerName(
    @Param('customerName') customerName: string,
  ) {
    return this.productService.findProductsByCustomerName(customerName);
  }

  @Get(Routes.Mongo.TASK_4)
  @ApiOperation({
    summary:
      'Получить список названий, производителей и цен на товары, имеющие заданный цвет',
  })
  @ApiParam({
    name: 'color',
    schema: {
      enum: colors,
    },
    required: true,
  })
  async getProductsByColor(@Param('color') color: string) {
    return this.productService.findProductsByColor(color);
  }

  @Get(Routes.Mongo.TASK_5)
  @ApiOperation({
    summary: 'Получить общую сумму проданных товаров',
  })
  async getTotalSalesAmount() {
    return this.productService.getTotalSalesAmount();
  }

  @ApiOperation({
    summary: 'Получить количество товаров в каждой категории',
  })
  @Get(Routes.Mongo.TASK_6)
  async getProductsCountByCategory() {
    return this.productService.getProductsCountByCategory();
  }

  @Get(Routes.Mongo.TASK_7)
  @ApiOperation({
    summary: 'Получить список имен покупателей заданного товара',
  })
  @ApiParam({
    name: 'productName',
    required: true,
  })
  async getCustomerNamesByProduct(@Param('productName') productName: string) {
    return this.productService.getCustomerNamesByProduct(productName);
  }

  @Get(Routes.Mongo.TASK_8)
  @ApiOperation({
    summary:
      'Получить список имен покупателей заданного товара, с доставкой фирмы с заданным названием.',
  })
  @ApiParam({
    name: 'productName',
    required: true,
  })
  @ApiParam({
    name: 'deliveryService',
    required: true,
    enum: delivery,
  })
  async getCustomerNamesByProductAndDeliveryService(
    @Param('productName') productName: string,
    @Param('deliveryService') deliveryService: string,
  ) {
    return this.productService.getCustomerNamesByProductAndDeliveryService(
      productName,
      deliveryService,
    );
  }

  @Get(Routes.Mongo.ALL_PRODUCTS)
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(Routes.Mongo.ALL_CUSTOMERS)
  async getAllCustomers() {
    return this.productService.getAllCustomers();
  }

  @Get(Routes.Mongo.ALL_CATEGORIES)
  async getCategories() {
    return this.productService.getAllCategories();
  }

  @Get(Routes.Mongo.ALL_COLORS)
  async getColors() {
    return this.productService.getColors();
  }
}
