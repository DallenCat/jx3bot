const Tencentcloud = require('../service/httpApi/tencentcloud');
const Group = require('../model/group');
const md5 = require('js-md5');

module.exports = class TalkHandler {
    async handle(ctx) {
        let message = ctx.args.message;
        message = message.replace(/你/g, 'avoid_swap_wo');
        message = message.replace(/我/g, '你');
        message = message.replace(/avoid_swap_wo/g, '我');
        let voice_type;
        if (ctx.data.group_id != undefined) {
            voice_type = await bot.redis.get(`GroupVoiceType:${ctx.data.group_id}`);
            if (voice_type == null) {
                voice_type = (await Group.findOne({ where: { group_id: ctx.data.group_id } })).bot_voice_type;
                await bot.redis.set(`GroupVoiceType:${ctx.data.group_id}`, voice_type);
            }
        } else {
            voice_type = 101016;
        }
        let redis_key = `TTS:${md5(message)}:${voice_type}`;
        let result = bot.redis.get(redis_key);
        if(result || !await fs.exist(result)) {
            result = await Tencentcloud.tts(message, parseInt(voice_type));
            await bot.redis.set(redis_key, result);
        }
        return `[CQ:record,file=file://${result}]`;
    }

    static argsList() {
        return [{
            name: 'message',
            alias: null,
            displayName: '消息',
            type: 'string',
            defaultIndex: 1,
            shortArgs: null,
            longArgs: 'message',
            limit: null,
            nullable: false
        }];
    }
}