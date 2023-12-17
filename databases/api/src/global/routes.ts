export namespace Routes {
  export const make = (prefix: string, route: string) => prefix + route;

  export namespace Redis {
    const prefix = 'redis/';
    export const SET_TEXT_DATA = make(prefix, 'set-text-data');
    export const GET_TEXT_DATA = make(prefix, 'get-text-data');
    export const GET_USERS = make(prefix, 'get-users');
    export const GET_FONTS = make(prefix, 'get-fonts');
  }

  export namespace Mongo {
    const prefix = 'mongo/';

    export const TASK_1 = make(prefix, 'categories/:categoryName');
    export const TASK_2 = make(prefix, 'characteristics/:categoryName');
    export const TASK_3 = make(prefix, 'customers/:customerName');
    export const TASK_4 = make(prefix, ':color');
    export const TASK_5 = make(prefix, 'total-sales-amount');
    export const TASK_6 = make(prefix, 'products/total/:category');
    export const TASK_7 = make(prefix, 'users/by-product-name/:productName');
    export const TASK_8 = make(
      prefix,
      'customers/:productName/:deliveryService',
    );

    export const ALL_COLORS = make(prefix, 'all-colors');
    export const ALL_CATEGORIES = make(prefix, 'all-categories');
    export const ALL_CUSTOMERS = make(prefix, 'all-customers');
    export const ALL_PRODUCTS = make(prefix, 'all-products');
  }
}
