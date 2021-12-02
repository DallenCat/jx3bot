/*
 * @Descripttion:
 * @version:
 * @Author: dal
 * @Date: 2021-12-02 15:53:15
 * @LastEditors: dal
 * @LastEditTime: 2021-12-02 15:53:16
 */
const dalapi = require('../service/httpApi/dalapi');

module.exports = class AngryHandler {
  async handle() {
    return await dalapi.angry();
  }

  static argsList() {
    return [];
  }
}