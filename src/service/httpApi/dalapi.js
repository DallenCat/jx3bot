/*
 * @Descripttion: 
 * @version: 
 * @Author: dal
 * @Date: 2021-12-02 15:54:33
 * @LastEditors: dal
 * @LastEditTime: 2021-12-02 16:14:31
 */
const { $zuanbot, $happy } = require('./axios');

class dalapi {
    static apiDisplayName = 'chp.shadiao';

    static async happy() {
        let response;
        try {
            response = await $happy.get();
        } catch (error) {
            console.log(error)
            throw `错误： 服务器异常，不要问我，我只是数据的搬运工`;
        }
        console.log(response)
        if (response.status == 200) {
            return response.data
        } else {
            throw `错误： 服务器异常，不要问我，我只是数据的搬运工`;
        }
    }

    static async angry() {
        let response;
        try {
            response = await $zuanbot.get();
        } catch (error) {
            throw `错误： 服务器异常，不要问我，我只是数据的搬运工`;
        }
        if (response.status == 200) {
            return response.data
        } else {
            throw `错误： 服务器异常，不要问我，我只是数据的搬运工`;
        }

    }

}

module.exports = dalapi;