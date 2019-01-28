import Animal from '../lib/Animal.class'
import SAY from './components/SAY'
import TELL from './components/TELL'
import CONFIRM from './components/CONFIRM'
import ASK from './components/ASK'
import LOADING from './components/LOADING'
import PROGRESS from './components/PROGRESS'

Animal.say('点击蓝色小标题显示更多选项。')
Animal.say('click the blue mini title to show configures.')

const $content = document.querySelector('#content')
$content.innerHTML = ''
$content.append(
  SAY, TELL, CONFIRM, ASK, LOADING, PROGRESS
)
