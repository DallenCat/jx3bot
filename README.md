# Gubot

咕！ bot，一个开源免费的用于提供剑网三相关功能的一个 QQ 群机器人。  
**注意，机器人通过响应来自[go-cqhttp](https://github.com/Mrs4s/go-cqhttp)的请求来实现自动回复消息等**  
由于忙于学(mo)业(yu)，缺乏时间写机器人，然后由于大部分够用了就有些懒得写了 Orz 有兴趣的小伙伴可以自己写着玩噢。欢迎贡献源代码（

# TODOLIST

- [x] 开服播报/奇遇播报
- [x] 全群广播
- [ ] 斗图功能
- [x] 语音生成
- [ ] ~~更聪明的对话~~
- [x] websocket 自动重连
- [ ] 各种命令回显的美化
- [ ] ~~抄其他机器人的功能~~

# 快速开始 Quick Start

首先，你需要安装依赖，本项目使用纯 node 实现，同时使用了 mysql、redis 等服务，只需要保证运行的机器有 node 环境与 mysql 即可。 redis 并不是必备的服务

```bash
cd /path/to/gubot
npm install
```

然后，你需要创建`env.json`作为机器人的配置文件，项目为您提供了配置模板`env.example.json`，您只需要将其复制一份进行自己的修改。
配置文件主要包括数据库信息，某些 api 的 token，某些功能的开启、关闭与配置等。

```bash
cp env.example.json env.json
vi env.json
//进行机器人配置
```

然后你需要创建数据库结构，程序为您准备好了迁移文件，您只需要创建好对应的数据库执行下述脚本即可。

```bash
node src/database/db_sync.js
```

然后确保 go-cqhttp 处于运行状态，运行 app.js 即可

```bash
node app.js
```

# 项目结构 Project Structure

- app.js **程序入口**
- env.example.json **项目配置模板**
- storage/ **储存程序运行期间生成的 html 模板以及图片**
- tests/ **编写测试用例，但是由于我懒得写，所以是空的**
- src
  - assets/ **资源文件夹，您并不需要关注**
    - json/ **存放需要用到的一些 json 数据**
    - images/ **存放可能需要用到的一些图片**
  - commands/ **命令文件夹，需要添加新的功能的时候在这里添加，具体可以参考文档的“添加新功能”部分(还没写)**
  - database/ **存放了一些数据库结构迁移相关的脚本**
  - model/ **数据实体的定义，包括群，别名，用户等**
  - service/ **服务**
    - httpApi/ **提供 http api 调用**
    - wsApi/ **wsApi 的抽象**
    - iamgesGenerator.js **提供图片支持，支持从 url 抓取图片/从数组生成图片，使用 html 模板生产图片等**
    - game.js **提供了游戏本身的一些功能（其实目前只有测试是否开服相关的内容）**
    - cqhttp.js **是一个 go-cqhttp 实例的抽象，提供简单的 api 调用**
    - bot.js **项目本身运行实例的抽象**
    - websocket.js **ws 客户端的抽象，提供了不完善的请求-响应函数**
  - templates **存放图片模板的位置，使用 art-template 模板引擎**

# 项目配置项

咕咕咕

# 项目讲解

项目入口是 app.js  
基本上整个项目都被抽象进了 Bot 类里面，这个类在`./src/service/bot.js`里面，所以基本看这个文件的代码就可以明白项目结构了（  
启动的时候 bot 会根据 ENV 内的内容初始化 redis 连接，如果 ENV 没有启动 redis 的话会生成一个代理，在项目内调用代理的 get/set 什么的函数统统返回 null。  
然后初始化 Sequelize，也就是数据库 ORM 的连接，这个不能没有，所以一定要配置好数据库。  
在之后初始化图片生成器，这个东西依赖的是 puppeteer 库，如果在 ENV 里没有启用的话也会生成一个代理，这个代理只会返回`./src/assets/images/error/image_generator_disable.jpg`。  
再然后会根据 ENV 里定义的 cqhttp 去分别生成 cqhttp 实例，然后由 cqhttp 实例自己负责生成自己的 ws 客户端和 cqhttp 程序连接。  
然后就是初始化命令列表，其实就是载入 commands 下面的 index 文件（  
后面就没啥好说的了（其实是不知道怎么解释屎山了

# 咕咕咕

懒得写文档了 Orz 我好懒 为什么会有我这么懒的人

# Linux 操作指令

查看全部进程

```bash
ps -aux
```

删除进程

```bash
kill -9 pid号
```

永久启动

```bash
nohup ./go-cqhttp > log.text 2>&1 &
```
