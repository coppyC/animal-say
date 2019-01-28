import Animal from '../../lib/Animal.class'
import { Item, ColorInput, Select } from './ui'

export default Item({
  id: 'progress',
  title: { zh: '动物不想说话，只想加载进度', en: 'make a animal to show a loading.' },
  options: [
    Select({
      name: '位置',
      model: 'progress.position',
      options: [
        {name:'顶部', value:'top'},
        {name:'底部', value:'bottom'},
      ]
    }),
    ColorInput('遮罩层背景', 'progress.BG_mask'),
    ColorInput('进度条背景', 'progress.BG_progress'),
    ColorInput('百分比文字颜色', 'progress.COLOR_text'),
  ],
  main: {
    progressId: null,
    inputValue: 0,
    placeholder: 'the loading text',
    click(text) {
      let percentage = +text
      if(this.progressId) clearTimeout(this.progressId)
      Animal.progress(percentage)
      this.progressId = setTimeout(function run() {
        if(percentage >= 100) return
        percentage += ~~(Math.random() * 20)
        Animal.progress(percentage)
        this.progressId = setTimeout(run, Math.random() * 300)
      }, 100)
    },
  }
})
