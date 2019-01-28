import Animal from '../../lib/Animal.class'
import { Item, Select, ColorInput } from './ui'

Animal.add('hamster', 'https://avatars2.githubusercontent.com/u/25004510?s=40&v=4')

const animations = [
  { name: '淡入淡出', value: 'fade' },
  { name: '滑动', value: 'slide' },
  { name: '滚动', value: 'scroll' },
  { name: '无', value: 'none' },
]

export default Item({
  id: 'say',
  title: { zh: '让动物说一句话', en: 'make a animal to say a word.' },
  options: [
    Select({
      name: '动物的名字',
      model: 'animal.name',
      options: [
        { name: '变色龙', value: 'chameleon' },
        { name: '仓鼠', value: 'hanster' },
        { name: '随机', value: 'random' },
      ]
    }),
    Select({
      name: '动物的动画',
      model: 'animal.animation',
      options: animations,
    }),
    Select({
      name: '挂载元素(support css selector)',
      model: 'msg.mount',
      options: [
        { name: '默认（default）' },
        { name: 'class-selector', value: '.header' },
        { name: 'id-selector', value: '#test-box' },
      ]
    }),
    Select({
      name: '提示时长',
      model: 'msg.duration',
      options: [
        { name: '自动', value: 'auto' },
        { name: '1500ms', value: 1500 },
        { name: '3000ms', value: 3000 },
        { name: '{base:1000,increase:100}', value: {base:1000,increase:100} },
      ]
    }),
    Select({
      name: '消息动画',
      model: 'msg.animation',
      options: animations,
    }),
    Select({
      name: '背景色(alias CSS background)',
      model: 'msg.BG_primary',
      options: [
        { name: '默认（default）', value: 'rgba(20, 23, 24, .8)' },
        { name: 'linear-gradient', value: 'linear-gradient(90deg, rgba(0,0,0,.3) 0, #333 100%)' },
        { name: 'hex color', value: '#6aab20' },
      ]
    }),
    ColorInput('字体色(default: #fff)', 'msg.COLOR_primary'),
  ],
  main: {
    inputValue: 'hello world',
    placeholder: 'the word you want to say',
    click: text => Animal.say(text),
  }
})
