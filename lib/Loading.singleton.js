import render, { styled } from './render'
import animals from './animals';

const $box = styled.div `
  height: 30px;
  user-select: none;
  background-image: linear-gradient( 90deg, transparent 0, transparent 75%, rgba(255, 255, 255, .3) 0),
                    linear-gradient(180deg, transparent 0, transparent 75%, rgba(255, 255, 255, .3) 0);
  background-color: rgba(230, 230, 230, .8);
  background-size: 80px 80px;
  background-repeat: repeat;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
`
const $animal = styled.img `
  width: 60px;
  height: 60px;
`
const $text = styled.div `
  font-size: 20px;
  margin: 5px 10px;
`
$box.append($animal, $text)

export default {
  /**
   * @param {String} tipText
   * @param {import('./Animal.class').Configure} conf
   */
  start(tipText='', conf) {
    $animal.src = animals[conf.animal.name]
    $text.innerText = tipText
    $box.style.background = conf.loading.BG_mask
    $box.style.flexDirection = conf.loading.direction
    render($box)
  },
  stop() {
    $box.remove()
  }
}
