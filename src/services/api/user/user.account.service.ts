import {
  LIKE_USER,
  LOGIN_USER_WITH_OTP,
  SAVE_WHOLE_DATA,
  SEND_OTP,
  SIMPLE_SEARCH_USER_MOBILE,
  USER_CREATE,
  USER_LISTING,
  USER_LOGIN_WITH_PASSWORD,
  USER_PROFILE,
} from '../../../common/user.urls';

import {HttpService} from '../http.service';

export class UserAccountService extends HttpService {
  constructor() {
    super();
  }

  async sendOTP(mobile: string) {
    return await this.get(SEND_OTP(mobile));
  }

  async simpleUserMobileExist(mobile: string) {
    console.log(
      'SIMPLE_SEARCH_USER_MOBILE(mobile)',
      SIMPLE_SEARCH_USER_MOBILE(mobile),
    );
    return await this.get(SIMPLE_SEARCH_USER_MOBILE(mobile));
  }

  async verifyOTP(mobile: string, otp: string) {
    return await this.post(LOGIN_USER_WITH_OTP, {mobile, otp});
  }

  async likeUser(_id: string) {
    return await this.get(LIKE_USER(_id));
  }

  async listing(payload: any) {
    return await this.get(USER_LISTING, payload);
  }

  async getSingleUserProfile(_id: string) {
    return await this.get(USER_PROFILE(_id));
  }

  async createUser(payload: any) {
    return await this.post(USER_CREATE, payload);
  }

  async loginUserWithPassword(payload: any) {
    return await this.post(USER_LOGIN_WITH_PASSWORD, payload);
  }

  async update(_id: string, payload: any) {
    return await this.put(USER_LISTING, _id, payload);
  }

  async saveWholeData() {
    return await this.get(SAVE_WHOLE_DATA);
  }
  async loginOTPVerify(payload: any) {
    return await this.post(LOGIN_USER_WITH_OTP, payload);
  }

  async addAddress(payload: any) {
    return await this.post(USER_PROFILE('add-address'), payload);
  }

  async updateAddress(payload: any) {
    return await this.put(USER_PROFILE('update-address'), payload);
  }

  async deleteAddress(payload: any) {
    return await this.delete(USER_PROFILE('delete-address'), payload);
  }

  async setDefaultAddress(payload: any) {
    return await this.put(USER_PROFILE('set-default-address'), payload);
  }

  // async changePassword(payload: any) {
  //   return await this.put(USER_PROFILE('change-password'), payload);
  // }

  async getAddresses() {
    return await this.get(USER_PROFILE('get-addresses'));
  }
}

export const _userAccountService = new UserAccountService();
