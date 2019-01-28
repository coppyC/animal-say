import render, { styled } from './render'
import { execAnimatiom, queueAnimation, execOriginalAnimatiom, delay } from './animation'
import animals from './animals'

const $msgBox = styled.div `
  position: fixed;
  top: 4px;
  max-width: 95vw;
  z-index: 10;
  right: 4px; `
render($msgBox)

const elements = [
  styled.div `
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-end;
    align-items: center;`,
  styled.img `
    visibility: hidden;
    width: 38px;
    height: 38px;
    margin: 0 4px; `,
  styled.div `
    visibility: hidden;
    font-size: 16px;
    color: #fff;
    line-height: 30px;
    min-height: 30px;
    padding: 0 14px;
    border-radius: 20px; `
]

export default class Message {
  /**
   * @param {Object} param0
   * @param {String} param0.word
   * @param {'primary'|'warn'|'danger'} param0.type
   * @param {import('./Animal.class').Configure} param0.conf
   */
  constructor({ word, conf, type='primary' }) {
    /** @type {HTMLElement[]} */
    const [$item, $animal, $word] = elements.map(el => el.cloneNode())
    $animal.src = animals[conf.animal.name]
    $word.innerText = word
    $word.style.background = conf.msg['BG_' + type]
    $word.style.color = conf.msg['COLOR_' + type]
    $item.append($word, $animal)
    $item.addEventListener('click', e => $item.remove())
    render($item, conf.msg.mount || $msgBox)
    let {duration} = conf.msg
    if(typeof duration === 'number')
      duration = { base: duration, increase: 0 }
    queueAnimation([
      () => execOriginalAnimatiom($animal, conf.animal.animation, 300),
      () => execOriginalAnimatiom($word, conf.msg.animation, 200),
      () => delay((duration.base || 1500) + (duration.increase || 50) * word.length),
      () => $item.style.height = ($item.offsetHeight + 'px'),
      () => execAnimatiom($word, conf.msg.animation, 150),
      () => execAnimatiom($animal, conf.animal.animation, 300),
      () => execAnimatiom($item, { height:0, marginBottom:0 }, 1000),
      () => $item.remove(),
    ])
  }
}
