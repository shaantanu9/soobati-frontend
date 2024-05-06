// product.service.ts
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_IMAGEKIT_AUTH,
  GET_PRODUCT_BY_ID,
  LIST_PRODUCTS_BY_CATEGORY,
  UPDATE_PRODUCT,
} from '../../../common/product.urls';

import {HttpService} from '../http.service';

export class ProductService extends HttpService {
  constructor() {
    super();
  }

  async createProduct(payload: any) {
    return await this.post(CREATE_PRODUCT, payload);
  }

  // async getAllProducts(params?: any) {
  //   return await this.get(GET_ALL_PRODUCTS, params);
  // }

  async getAllProducts(query: any) {
    return await this.get(GET_ALL_PRODUCTS, query);
  }

  async getProductById(id: string) {
    return await this.get(GET_PRODUCT_BY_ID(id));
  }

  async updateProduct(id: string, payload: any) {
    return await this.patch(UPDATE_PRODUCT(id), payload);
  }

  async deleteProduct(id: string) {
    return await this.delete(DELETE_PRODUCT(id));
  }

  async listProductsByCategory(category: string) {
    return await this.get(LIST_PRODUCTS_BY_CATEGORY(category));
  }
  async getImageKitAuth() {
    return await this.get(GET_IMAGEKIT_AUTH);
  }
}

export const _productService = new ProductService();
