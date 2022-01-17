/*
 * @Descripttion: 
 * @version: 
 * @Author: dal
 * @Date: 2022-01-17 10:49:45
 * @LastEditors: dal
 * @LastEditTime: 2022-01-17 13:26:50
 */
const Jx3api = require('../service/httpApi/jx3api');


module.exports = class RequireHandler {
  async handle(ctx) {
    let img = await Jx3api.require(ctx.args);
    return `[CQ:image,file=${img}]`;
  }

  static argsList() {
    return [
      {
        name: 'name',
        alias: null,
        displayName: '奇遇名称',
        type: 'string',
        defaultIndex: 1,
        shortArgs: null,
        longArgs: 'flower',
        limit: null,
        nullable: true,
        default: '阴阳两界'
      }
    ];
  }
}