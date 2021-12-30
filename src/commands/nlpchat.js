/*
 * @Descripttion: 
 * @version: 
 * @Author: dal
 * @Date: 2021-12-28 17:28:18
 * @LastEditors: dal
 * @LastEditTime: 2021-12-29 17:33:28
 */
const Jx3api = require('../service/httpApi/jx3api');

module.exports = class NlpChatHandler {
  async handle(ctx) {
    let nickname = "咕咕"
    let question = ctx.data.message
    return await Jx3api.nlpchat(nickname, question);
  }

  static argsList() {
    return [];
  }
}