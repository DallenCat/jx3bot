/*
 * @Descripttion: 
 * @version: 
 * @Author: dal
 * @Date: 2021-12-02 10:15:58
 * @LastEditors: dal
 * @LastEditTime: 2021-12-30 17:11:57
 */
const axios = require('axios');
const md5 = require('js-md5');
const ENV = require('../../env.json');
const fs = require("fs")

class Api {
    static async getDouTuFromJx3Api() {
        let url = `https://jx3api.com/extend/expression`;
        let response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',
                'Accept': 'application/json, text/plain, */*'
            }
        });
        if (response.data.code == 200) {
            let result = response.data.data.url;
            return result;
        } else {
            throw '获取图片异常。';
        }
    }
    static async getStaticImage() {
        let files = fs.readdirSync(`${__dirname}/../../storage/emojis`)
        let max = files.length
        let random = Math.floor(Math.random() * (0 - max) + max);
        return __dirname + `../../../storage/emojis/${files[random]}`
    }
}

module.exports = Api;
