import Animal from '../../lib/Animal.class'
import { Item, Select, ColorInput } from './ui'

export default Item({
  id: 'loading',
  title: { zh: '让动物问个问题', en: 'make a animal to ask a question.' },
  options: [
    Select({
      name: '方向',
      model: 'loading.direction',
      options: [
        { name: '水平', value: 'row' },
        { name: '垂直', value: 'column' },
      ]
    }),
    ColorInput('遮罩层背景', 'loading.BG_mask'),
    ColorInput('文字颜色', 'loading.COLOR_text'),
  ],
  main: {
    inputValue: 'loading...',
    placeholder: 'loading text',
    click(question) {
      Animal.loading(question)
      setTimeout(() => Animal.quiet('loading'), 1111)
    },
  }
})
