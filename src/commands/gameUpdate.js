const Api = require('../service/api');
const Image = require('../service/image');

module.exports = class ServerStatusHandler{
    async handle(ctx) {
        //get args from state
        let args = ctx.state.args;
        let redis_key = 'GameUpdate';
        //get data from redis
        let result = await redis.get(redis_key);

        //check data is empty?
        if(result == null) {
            result = await Image.getFromUrl('https://jx3.xoyo.com/launcher/update/latest.html', {selector: 'body div:first-of-type'});
            await redis.set('GameUpdate', result);
            await redis.expire('GameUpdate', 600);
        }

        return `[CQ:image,file=file://${result}]
        --------------
        以上内容来自官方公告`.replace(/[ ]{2,}/g,"");
    }

    static argsList() {
        return [{
            name: 'update',
            alias: null,
            type: 'boolean',
            defaultIndex: 1,
            shortArgs: 'u',
            longArgs: 'update',
            limit: null,
            nullable: true,
            default: false
        }];
    }

    static argsMissingError() {
        return this.helpText();
    }

    static helpText() {
        return `游戏更新内容命令，可用命令有更新，gu以及群管理员自定义的别名，接受0~1个参数
        1.更新(-u,--update)，可为空，默认不更新(5分钟刷新一次数据)
        `.replace(/[ ]{2,}/g,"");
    }
}