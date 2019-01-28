import { Item, ColorInput, TextInput } from './ui'
import Animal from '../../lib/Animal.class'

export default Item({
  id: 'confirm',
  title: { zh: '让动物确认一件事', en: 'make a animal to confirm something.' },
  options: [
    ColorInput('取消按钮背景', 'dialog.BG_cancel'),
    ColorInput('取消按钮文字颜色', 'dialog.COLOR_cancel'),
    TextInput('取消按钮文字', 'dialog.TEXT_cancel'),
  ],
  main: {
    inputValue: 'Do you like this project ?',
    placeholder: 'something you want to confirm',
    click(text) {
      Animal.confirm(text)
        .then(() => Animal.say('you choose yes.'))
        .catch(() => Animal.say('you choose no.'))
    },
  }
})
