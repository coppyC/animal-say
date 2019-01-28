import render, { styled } from './render'
import animals from './animals'

const keyframes = styled.animation `
  @keyframes scroll {

  }
`

const $box = styled.div `
  position: fixed;
  user-select: none;
  background: rgba(255,255,255,.5);
  left: 0;
  width: 100vw;
  padding: 10px 0;
  z-index: 99;
  background-image: linear-gradient( 135deg, transparent 0, transparent 45%, rgba(255, 255, 255, .3) 0, rgba(255, 255, 255, .3) 55%, transparent 0),
                    linear-gradient( 225deg, transparent 0, transparent 45%, rgba(255, 255, 255, .3) 0, rgba(255, 255, 255, .3) 55%, transparent 0);
  background-color: rgba(230, 230, 230, .6);
  background-size: 100px 100px;
  background-repeat: repeat;
`
const $progressBox = styled.div `
  width: 95%;
  margin: 20px auto;
  height: 30px;
  border-radius: 15px;
  box-sizing: border-box;
  overflow: hidden;
  background: rgba(255,255,255,.7);
`

const $progress = styled.div `
  position: relative;
  background: #6aab20;
  transition: all 500ms linear;
  width: 50%;
  height: 100%;
`
const $animal = styled.img `
  position: absolute;
  width: 30px;
  height: 30px;
  transform: rotateY(180deg) scale(1.2);
  top: calc(50% - 15px);
  right: -15px;
`
const $text = styled.div `
  display: flex;
  height: 100%;
  color: #fff;
  align-items: center;
  justify-content: center;
`

$box.append($progressBox)
$progressBox.append($progress)
$progress.append($animal, $text)

export default {
  running: false,
  /**
   * @param {Number} percentage
   * @param {import('./Animal.class').Configure} conf
   */
  start(percentage, conf) {
    percentage = Math.max(percentage, 0)
    percentage = Math.min(percentage, 100)
    if(percentage >= 100)
      setTimeout(() => this.stop(), conf.progress.keep)
    $box.style.background = conf.progress.BG_mask
    $box.style[conf.progress.position] = 0
    $box.style[{top:'bottom',bottom:'top'}[conf.progress.position]] = 'unset'
    $progress.style.transitionDuration = (conf.progress.keep * 0.7) + 'ms'
    $progress.style.width = percentage + '%'
    $progress.style.background = conf.progress.BG_progress
    $text.style.color = conf.progress.COLOR_text
    $text.innerText = percentage + '%'
    if(!this.running){
      $animal.src = animals[conf.animal.name]
      render($box)
      this.running = true
    }
  },
  stop() {
    $box.remove()
    this.running = false
  }
}
