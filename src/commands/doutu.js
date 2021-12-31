/*
 * @Descripttion: 
 * @version: 
 * @Author: dal
 * @Date: 2021-12-02 10:15:58
 * @LastEditors: dal
 * @LastEditTime: 2021-12-29 17:02:03
 */
const Api = require('../service/api');
const CqHttp = require('../service/cqhttp');

module.exports = class DouTuHandler {
    async handle() {
        let doutu = await Api.getStaticImage();
        return CqHttp.imageCQCode(doutu);
    }

    static argsList() {
        return [];
    }
}