// cart.service.ts
import {
  ADD_ITEM_TO_CART,
  GET_CART,
  REMOVE_ITEM_FROM_CART,
  UPDATE_ITEM_QUANTITY_IN_CART,
} from '../../../common/cart.urls';

import {HttpService} from '../http.service';

export class CartService extends HttpService {
  constructor() {
    super();
  }

  async addItemToCart(payload: {
    productId: string;
    quantity: number;
    pricePerUnit: number;
    options: any;
  }) {
    return await this.post(ADD_ITEM_TO_CART, payload);
  }

  async removeItemFromCart(itemId: string) {
    return await this.delete(REMOVE_ITEM_FROM_CART(itemId));
  }

  async updateItemQuantity(itemId: string, quantity: number) {
    return await this.patch(UPDATE_ITEM_QUANTITY_IN_CART(itemId), {quantity});
  }

  async getCart() {
    return await this.get(GET_CART);
  }
}

export const _cartService = new CartService();
