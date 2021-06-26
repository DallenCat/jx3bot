const Websocket = require('./websocket');

class CqHttp{
    wsApi;
    wsEvent;
    bot;
    qq;
    name;

    constructor(config, bot) {
        this.ws = new Websocket(`${config.url}/${config.access_token ? '?access_token='+config.access_token : ''}`, `Ws:${config.name}`);
        this.name = config.name;
        this.qq = config.qq;
        this.bot = bot;
        let cqhttp = this;
        this.ws.handleMessageStack.push(async function(message) {
            let request = JSON.parse(message);
            let result = await cqhttp.bot.handleRequest(request);
            //object
            if(typeof result == 'object') {
                cqhttp.send(result);
            }
            //string
            if(typeof result == 'string') {
                if(request.message_type == 'group') {
                    let group_id = request.group_id;
                    cqhttp.sendGroupMessage(result, group_id);
                }
                if(request.message_type == 'private') {
                    let user_id = request.user_id;
                    cqhttp.sendPrivateMessage(result, user_id)
                }
            }
        });
    }

    sendPrivateMessage(message, user_id) {
        this.send({
            action: "send_private_msg",
            params: {
                user_id: user_id,
                message: message
            }
        });
    }

    sendGroupMessage(message, group_id){
        this.send({
            action: "send_group_msg",
            params: {
                group_id: group_id,
                message: message
            }
        });
    }

    async getGroupList() {
        const Group = require('../model/group');
        let cqhttp = this;
        let groupList = await this.ws.request({
            action: 'get_group_list'
        }, (m) => (m.data[0] && m.data[0].group_id != undefined));
        groupList = groupList.data;
        let groups = Group.findAll({
            where: {
                bot_id: cqhttp.qq,
                group_id: groupList.map(group => `${group.group_id}`)
            }
        });
        return groups;
    }

    send(object){
        this.ws.sendJSON(object);
    }
}

module.exports = CqHttp;