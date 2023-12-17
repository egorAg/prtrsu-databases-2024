import { Controller, Get, Logger, Param } from '@nestjs/common';
import { colors, MongoService } from './mongo.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('mongo')
@ApiTags('Mongo')
export class MongoController {
  constructor(private readonly productService: MongoService) {}

  //Задание 1 - получение списка товаров по категории
  @ApiOperation({
    summary: 'получение списка товаров по категории',
  })
  @Get('categories/:categoryName')
  async getProductNamesByCategory(@Param('categoryName') categoryName: string) {
    return this.productService.findProductsByCategory(categoryName);
  }

  //Задание 2 - Получить список характеристик товаров заданной категории
  @ApiOperation({
    summary: 'Получить список характеристик товаров заданной категории',
  })
  @Get('characteristics/:categoryName')
  async getCharacteristicsByCategory(
    @Param('categoryName') categoryName: string,
  ) {
    return this.productService.findCharacteristicsByCategory(categoryName);
  }

  //Задание 3 - получить список названий и стоимости товаров, купленных заданным покупателем
  @ApiOperation({
    summary:
      'получить список названий и стоимости товаров, купленных заданным покупателем',
  })
  @Get('customers/:customerName')
  async findProductsByCustomerName(
    @Param('customerName') customerName: string,
  ) {
    return this.productService.findProductsByCustomerName(customerName);
  }

  // Задание 4 - Получить список названий, производителей и цен на товары, имеющие заданный цвет
  @Get('/:color')
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

  // Задание 5 - Получить общую сумму проданных товаров
  @Get('total-sales-amount')
  async getTotalSalesAmount() {
    return this.productService.getTotalSalesAmount();
  }

  @Get('customers/:productName')
  async getCustomerNamesByProduct(@Param('productName') productName: string) {
    return this.productService.getCustomerNamesByProduct(productName);
  }

  @Get('customers/:productName/:deliveryService')
  async getCustomerNamesByProductAndDeliveryService(
    @Param('productName') productName: string,
    @Param('deliveryService') deliveryService: string,
  ) {
    return this.productService.getCustomerNamesByProductAndDeliveryService(
      productName,
      deliveryService,
    );
  }

  @Get('products-count-by-category')
  async getProductsCountByCategory() {
    return this.productService.getProductsCountByCategory();
  }

  @Get('all-products')
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('all-customers')
  async getAllCustomers() {
    return this.productService.getAllCustomers();
  }

  @Get('all-categories')
  async getCategories() {
    return this.productService.getAllCategories();
  }

  @Get('all-colors')
  async getColors() {
    return this.productService.getColors();
  }
}
