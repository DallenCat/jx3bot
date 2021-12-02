/*
 * @Descripttion:
 * @version:
 * @Author: dal
 * @Date: 2021-12-02 15:53:21
 * @LastEditors: dal
 * @LastEditTime: 2021-12-02 15:53:21
 */
const dalapi = require('../service/httpApi/dalapi');

module.exports = class HappyHandler {
  async handle() {
    return await dalapi.happy();
  }

  static argsList() {
    return [];
  }
}