/*
 * @Descripttion:
 * @version:
 * @Author: dal
 * @Date: 2021-12-02 11:22:46
 * @LastEditors: dal
 * @LastEditTime: 2021-12-02 12:24:12
 */
function xf_filter(xf) {
  let arr = [
    { name: ['冰心', '冰心决'], xf: "冰心诀" },
    { name: ['奶秀', '云裳'], xf: "云裳心经" },
    { name: ['花间'], xf: "花间游" },
    { name: ['奶花', '离经'], xf: "离经易道" },
    { name: ['奶毒', '补天'], xf: "补天诀" },
    { name: ['奶歌'], xf: "相知" },
    { name: ['傲血', '天策'], xf: "傲血战意" },
    { name: ['策T', 'CT'], xf: "铁牢律" },
    { name: ['和尚'], xf: "易筋经" },
    { name: ['和尚T', 'HST'], xf: "洗髓经" },
    { name: ['焚影', '明教'], xf: "焚影圣诀" },
    { name: ['明尊', 'MJT'], xf: "明尊琉璃体" },
    { name: ['苍云', '分山', '王八'], xf: "分山劲" },
    { name: ['苍云T', '铁骨'], xf: "铁骨衣" },
    { name: ['气纯', '紫霞', '渣男'], xf: "紫霞功" },
    { name: ['剑纯', '太虚', '备胎'], xf: "太虚剑意" },
    { name: ['田螺'], xf: "天罗诡道" },
    { name: ['鲸鱼'], xf: "惊羽诀" },
    { name: ['藏剑'], xf: "问水诀" },
    { name: ['丐帮'], xf: "笑尘诀" },
    { name: ['霸刀'], xf: "北傲诀" },
    { name: ['蓬莱'], xf: "凌海诀" },
    { name: ['凌雪', '凌血'], xf: "隐龙诀" },
    { name: ['衍天', '演员'], xf: "太玄经" },
    { name: ['药总', '药宗'], xf: "无方" },
    { name: ['奶药', '药奶'], xf: "灵素" }
  ]
  let i = arr.find(v => v.name.some(n => n === xf))
  let name = i ? i.xf : xf
  return name
}

module.exports = {
  xf_filter
}