import Animal from '../../lib/Animal.class'
import { Item, Select, ColorInput, TextInput } from './ui'

export default Item({
  id: 'tell',
  title: { zh: '让动物告诉你一件事', en: 'make a animal to tell you something.' },
  options: [
    Select({
      name: '自动关闭',
      model: 'dialog.autoClose',
      options: [
        { name: 'click the button to close', value: true },
        { name: 'need to use code to close', value: false },
      ]
    }),
    ColorInput('遮罩层背景', 'dialog.BG_mask'),
    ColorInput('对话框背景', 'dialog.BG_dialog'),
    ColorInput('确认按钮背景', 'dialog.BG_confirm'),
    ColorInput('对话框文字颜色', 'dialog.COLOR_dialog'),
    ColorInput('确认按钮文字颜色', 'dialog.COLOR_confirm'),
    TextInput('确认按钮文字', 'dialog.TEXT_confirm'),
  ],
  main: {
    inputValue: 'I am here',
    placeholder: 'something you want to tell',
    click: text => Animal.tell(text),
  }
})
