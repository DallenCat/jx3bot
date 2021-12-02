const { $next, $helper, $spider, $oss, $server, $cms } = require('./axios');

class Jx3box {
    static apiDisplayName = 'JX3BOX';

    static async flower(params) {
        let response;
        try {
            response = await $spider.get('/flower', { params: params });
        } catch (error) {
            throw `错误：[${Jx3box.apiDisplayName}]的接口[spider/flower] 服务器异常，不要问我，我只是数据的搬运工`;
        }
        if (response.data.code == 0) {
            if (JSON.stringify(response.data.data) == '{}') {
                throw `错误：[${Jx3box.apiDisplayName}]的接口[spider/flower]返回值异常，请检查参数。`;
            }
            let result = response.data.data
            if (result == undefined || result.length < 1) {
                throw `错误：[${Jx3box.apiDisplayName}]的接口[spider/flower]返回为空，请检查参数。`;
            }
            return result;
        } else {
            throw `错误：[${Jx3box.apiDisplayName}]的接口[spider/flower]返回为空，请检查参数。`;
        }
    }

    static async exam(key) {
        let response;
        try {
            response = await $next.get('/api/exam', { params: { search: key } })
        } catch (error) {
            throw `错误：[${Jx3box.apiDisplayName}]的接口[/api/exam] 服务器异常，不要问我，我只是数据的搬运工`;
        }
        let hits = response.data['hits'];
        let qa = {}
        for (let i in hits) {
            if (i < 5) {
                let options = JSON.parse(hits[i]['_source']['options']);
                let answer = JSON.parse(hits[i]['_source']['answer']);
                qa[hits[i]['_source']['title']] = answer.map(x => options[x]).join(',');
            }
        }
        return qa;
    }

    static async servers() {
        let response;
        try {
            response = await $spider.get('/jx3servers')
        } catch (error) {
            throw `错误：[${Jx3box.apiDisplayName}]的接口[/jx3servers] 服务器异常，不要问我，我只是数据的搬运工`;
        }
        if (response.data.code != 0) {
            throw `错误：[${Jx3box.apiDisplayName}]的接口[spider/jx3servers]调用异常，无法获取服务器列表。`;
        }
        let servers = {}
        let datas = response.data.data;
        for (let server of datas) {
            servers[server.serverName] = {
                zoneName: server.zoneName,
                serverName: server.serverName,
                ipAddress: server.ipAddress,
                ipPort: server.ipPort,
                mainServer: server.mainServer
            }
        }
        return servers;
    }

    static async achievementSearch(keyword) {
        let response;
        try {
            response = await $helper.get('/api/achievement/search', { params: { limit: 3, keyword: keyword } })
        } catch (error) {
            throw `错误：[${Jx3box.apiDisplayName}]的接口[helper/achievement/search] 服务器异常，不要问我，我只是数据的搬运工`;
        }
        if (response.data.code == 200 && response.data.data.achievements.length > 0) {
            return response.data.data.achievements[0].ID;
        } else {
            throw `错误：[${Jx3box.apiDisplayName}]的接口[helper/achievement/search]返回为空，请确定成就是否存在`;
        }
    }

    //https://helper.jx3box.com/api/wiki/post?type=achievement&source_id=8487&supply=1
    static async achievementPost(ID) {
        let response;
        try {
            response = await $helper.get(`/api/wiki/post`, { params: { type: 'achievement', supply: 1, source_id: ID } });
        } catch (error) {
            throw `错误：[${Jx3box.apiDisplayName}]的接口[helper/achievement/get] 服务器异常，不要问我，我只是数据的搬运工`;
        }
        let data = response.data;
        if (data.code == 200) {
            return data;
        } else {
            throw `错误：[${Jx3box.apiDisplayName}]的接口[helper/achievement/get]返回异常`
        }
    }

    static async serendipity(params) {
        params = Object.assign({
            start: 0,
            pageIndex: 1,
            pageSize: 50
        }, params);
        let response;
        try {
            response = await $next.get(`/api/serendipity`, { params: params });
        } catch (error) {
            throw `错误：[${Jx3box.apiDisplayName}]的接口[next/serendipity]返回异常，不要问我，我只是数据的搬运工`;
        }
        if (response.data.code == 0) {
            return response.data.data.data;
        } else {
            throw `错误：[${Jx3box.apiDisplayName}]的接口[next/serendipity]返回异常，请检查参数`;
        }
    }

    static async talentsList(version) {
        let response;
        try {
            response = await $oss.get(`/data/qixue/${version}.json`);
        } catch (error) {
            throw `错误：[${Jx3box.apiDisplayName}]的接口[/data/qixue] 服务器异常，不要问我，我只是数据的搬运工`;
        }
        let qixue_xf = response.data;
        if (qixue_xf == null) {
            throw `错误：[${Jx3box.apiDisplayName}] 抓取奇穴内容时出现错误`;
        }
        return qixue_xf;
    }

    static async macroRecommand() {
        let response;
        try {
            response = await $helper.get(`/api/menu_group/macro-rec`);
        } catch (error) {
            throw `错误：[${Jx3box.apiDisplayName}]的接口[/api/menu_group/macro-rec] 服务器异常，不要问我，我只是数据的搬运工`;
        }
        let data = response.data;
        if (data.code != 200) {
            throw `错误：[${Jx3box.apiDisplayName}] 抓取宏内容时出现错误`;
        }
        return data.data.menu_group.menus;
    }

    static async macroTops(xfid) {
        let response;
        try {
            response = await $next.get(`/api/macro/tops`, { params: { kungfu: xfid, size: 10 } });
        } catch (error) {
            throw `错误：[${Jx3box.apiDisplayName}]的接口[/api/macro/tops] 服务器异常，不要问我，我只是数据的搬运工`;
        }
        let data = response.data;
        if (data == null || data == 'null' || data.length == 0) {
            throw `错误：[${Jx3box.apiDisplayName}] 抓取该心法宏排行时出现错误`;
        }
        return data;
    }

    //https://cms.jx3box.com/api/cms/post/10800
    static async macroContent(pid) {
        let response;
        try {
            response = await $cms.get(`/api/cms/post/${pid}`)
        } catch (error) {
            throw `错误：[${Jx3box.apiDisplayName}]的接口[/api/cms/post] 服务器异常，不要问我，我只是数据的搬运工`;
        }
        let data = response.data;
        if (data.code != 0) {
            throw `错误：[${Jx3box.apiDisplayName}] 抓取宏内容时出现错误`;
        }
        return data.data;
    }

    static async itemSearch(name) {
        let response;
        try {
            response = await $helper.get(`/api/item/search`, { params: { keyword: name, page: NaN, limit: 10 } });
        } catch (error) {
            throw `错误：[${Jx3box.apiDisplayName}]的接口[/api/item/search] 服务器异常，不要问我，我只是数据的搬运工`;
        }
        let data = response.data;
        if (data.code != 200) {
            throw `错误：[${Jx3box.apiDisplayName}] 搜索物品失败`;
        }
        if (data.data.data && data.data.data.length == 0) {
            throw `错误：[${Jx3box.apiDisplayName}] 找不到物品 ${name}`;
        }
        return data.data.data;
    }

    static async itemInfo(id) {
        let response;
        try {
            response = await $helper.get(`/api/item/${id}`);
        } catch (error) {
            throw `错误：[${Jx3box.apiDisplayName}]的接口[/api/item] 服务器异常，不要问我，我只是数据的搬运工`;
        }
        let data = response.data;
        if (data.code != 200) {
            throw `错误：[${Jx3box.apiDisplayName}] 获取物品信息失败`;
        }
        return response.data.data.item;
    }

    static async itemPrices(id, server) {
        let response;
        try {
            response = await $helper.get(`/api/item/${id}/price/logs`, { params: { server: server, } });
        } catch (error) {
            throw `错误：[${Jx3box.apiDisplayName}]的接口[/api/item/${id}/price/logs] 服务器异常，不要问我，我只是数据的搬运工`;
        }
        let data = response.data;
        if (data.code != 200) {
            throw `错误：[${Jx3box.apiDisplayName}] 获取物品价格失败`;
        }
        return response.data.data;
    }
}

module.exports = Jx3box;