import Animal from '../../lib/Animal.class'
import { Item, Select, TextInput } from './ui'

Animal.conf.dialog.placeholder = 'type here'

export default Item({
  id: 'ask',
  title: { zh: '让动物问个问题', en: 'make a animal to ask a question.' },
  options: [
    Select({
      name: '回答为必填写项',
      model: 'dialog.required',
      options: [true,false].map(x => ({name:'--',value:x}))
    }),
    TextInput('提示文字', 'dialog.placeholder'),
 ],
  main: {
    inputValue: `What's your favorite movie ?`,
    placeholder: 'the question you want to ask',
    click(question) {
      Animal.ask(question)
        .then(({answer}) => Animal.say(answer? 'your answer is ' + answer : 'you say yes but don\'t have answer'))
        .catch(({answer}) => Animal.say('you reject to answer my question.' + (answer && 'Reason is ' + answer)))
    },
  }
})
