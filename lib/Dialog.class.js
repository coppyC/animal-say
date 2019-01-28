import render, { styled } from './render'
import animals from './animals'
import { queueAnimation, execOriginalAnimatiom } from './animation'

const FFFE = 'rgba(255,255,255,.93)'

const elements = [
  styled.div `
    /* display: none; */
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
  `,
  styled.div `
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
  `,
  styled.div `
    position: relative;
    background: linear-gradient(135deg, ${FFFE} 0, ${FFFE} 25%, #ddd 75%);
    transform: translateY(-50%);
    border-radius: 10px;
    border-bottom-right-radius: 50% 60px;
    padding: 1px;
    font-size: 20px;
    width: 380px;
    max-width: 90vw;
    margin: 45vh auto 0;
  `,
  styled.img `
    position: absolute;
    visibility: hidden;
    width: 60px;
    height: 60px;
    right: 0;
    bottom: 0;
  `,
  styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2e484c;
    line-height: 1.8em;
    box-sizing: border-box;
    margin: 15px 20px;
    overflow: scroll;
    min-height: 100px;
    max-height: 30vh;
  `,
  styled.form `
    display: flex;
    white-space: nowrap;
    height: 40px;
    width: 75%;
    padding-left: 15px;
  `,
  styled.input `
    display: inline-flex;
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    padding: 0 1em;
    border: 1px #ddd solid;
    border-radius: 15px;
    width: 100%;
    box-sizing: border-box;
    height: 30px;
    margin-right: 10px;
  `,
  styled.button `
    flex: 1 0 auto;
    display: inline-flex;
    cursor: pointer;
    max-width: 120px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: #fff;
    color: #ccc;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    padding: 0 .5em;
    border: 1px #ddd solid;
    border-radius: 15px;
    box-sizing: border-box;
    min-width: 30px;
    height: 30px;
    margin-right: 10px;
  `,
]

export default class Dialog {
  /**
   * @param {Object} param0
   * @param {String} param0.content
   * @param {('yes'|'no'|'input')[]} param0.tools
   * @param {import('./Animal.class').Configure} param0.conf
   */
  constructor({ content, tools, conf }) {
    function close() { $box.remove() }
    /** @type {HTMLElement[]} */
    const [$box, $mask, $dialog, $animal, $text, $form, $answer, $btn0] = elements.map(el => el.cloneNode())
    /** @type {HTMLButtonElement} */
    const $btn1 = $btn0.cloneNode()
    $btn0.type = 'button'
    $btn0.innerText = conf.dialog.TEXT_cancel
    $btn1.innerText = conf.dialog.TEXT_confirm
    $text.innerHTML = `<div>${content}</div>`
    $mask.style.background = conf.dialog.BG_mask
    $dialog.style.background = conf.dialog.BG_dialog
    $btn0.style.background = conf.dialog.BG_cancel
    $btn1.style.background = conf.dialog.BG_confirm
    $dialog.style.background = conf.dialog.COLOR_dialog
    $btn0.style.color = conf.dialog.COLOR_cancel
    $btn1.style.color = conf.dialog.COLOR_confirm
    $animal.src = animals[conf.animal.name]
    $answer.required = !!conf.dialog.required
    $answer.placeholder = conf.dialog.placeholder || ''
    $mask.addEventListener('click', close)
    $box.append($mask, $dialog)
    $dialog.append($text, $form, $animal)
    if(tools.length==1) {
      $form.style.width = '100%'
      $form.style.justifyContent = 'center'
    }
    for(let tool of tools) {
      $form.append({
        input: $answer,
        no: $btn0,
        yes: $btn1,
      }[tool])
    }
    /** @type {Promise<{ close:Function, answer:String }>} */
    this.promise = new Promise((resolve, reject) => {
      const options = {}
      let response = resolve
      if(!conf.dialog.autoClose) options.close = close
      function submitHandle(e) {
        e && e.preventDefault()
        if(conf.dialog.autoClose) close()
        if(~tools.indexOf('input'))
          options.answer = $answer.value
        response(options)
      }
      $form.addEventListener('submit', submitHandle)
      $btn0.addEventListener('click', () => {
        response = reject
        submitHandle()
      })
    })
    render($box)
    queueAnimation([
      () => execOriginalAnimatiom($animal, conf.animal.animation, 200)
    ])
  }
}
