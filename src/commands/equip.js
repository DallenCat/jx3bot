/*
 * @Descripttion: 
 * @version: 
 * @Author: dal
 * @Date: 2022-01-17 10:49:45
 * @LastEditors: dal
 * @LastEditTime: 2022-01-17 13:31:08
 */
const Jx3api = require('../service/httpApi/jx3api');


module.exports = class EquipHandler {
  async handle(ctx) {
    let data = await Jx3api.equip(ctx.args);
    return `${data.name}PVE配装推荐：[CQ:image,file=${data.pve}]${data.name}PVP配装推荐：[CQ:image,file=${data.pvp}]`;
  }

  static argsList() {
    return [
      {
        name: 'name',
        alias: null,
        displayName: '心法名称',
        type: 'string',
        defaultIndex: 1,
        shortArgs: null,
        longArgs: 'flower',
        limit: null,
        nullable: true,
        default: '花间游'
      }
    ];
  }
}