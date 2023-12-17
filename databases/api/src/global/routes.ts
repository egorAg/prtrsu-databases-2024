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
  }
}
