/*
 * @Descripttion: 舔狗话术
 * @version: 
 * @Author: dal
 * @Date: 2021-12-31 09:19:13
 * @LastEditors: dal
 * @LastEditTime: 2021-12-31 09:56:02
 */
const Jx3api = require('../service/httpApi/jx3api');
const moment = require('moment');
const CqHttp = require('../service/cqhttp');



module.exports = class DogeHandler {
  async handle() {
    let file = `${__dirname}../../assets/images/error/tiangou.jpg`
    let img = CqHttp.imageCQCode(file)
    let today = moment().locale('zh-cn').format('YYYY年MM月DD日')
    let weather = ['晴', '大雨', '阴天', '晴转多云', '小雨', '多云'], random = Math.floor(Math.random() * (0 - weather.length) + weather.length);
    let doge = await Jx3api.doge()
    return img + `今天是${today} ${weather[random]}，${doge}`;
  }
}
