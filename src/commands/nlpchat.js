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
    // let group_id = ctx.data.group_id;
    // let redis_key = `GroupInfo:${group_id}`;
    // let result = await bot.redis.get(redis_key);
    // if (result == null) {
    //   let group = await Group.findOne({
    //     where: {
    //       group_id: group_id
    //     }
    //   });
    //   if (group == null) {
    //     group = await Group.create({
    //       group_id: group_id,
    //       server: '梦江南',
    //       groupname: group_id
    //     });
    //   }
    // }
    let nickname = "咕咕"
    let question = ctx.data.message
    return await Jx3api.nlpchat(nickname, question);
  }

  static argsList() {
    return [];
  }
}