import { styled } from './render'

const animations = styled.animation `
.fade {
  opacity: 0;
}
.slide {
  transform: translateX(150%);
}
.scroll {
  transform: translateX(150%) rotate(360deg);
}
`

export default animations

/** @typedef {'fade'|'slide'|'scroll'|'none'} AnimationName */

/** execute the origin animation
 * @param {HTMLElement} element
 * @param {AnimationName} animation
 * @param {Number} duration ms */
export function execOriginalAnimatiom(element, animation, duration=100) {
  if(animation==='none') return
  animation = animations[animation]
  element.style.animationDuration = duration + 'ms'
  element.style.animationName = animation
  element.style.visibility = 'visible'
  return new Promise(resolve =>
    setTimeout(resolve, duration)
  )
}

/** execute the animation
 * @param {HTMLElement} element
 * @param {AnimationName|CSSStyleDeclaration} animation
 * @param {Number} duration ms */
export function execAnimatiom(element, animation, duration=100) {
  if(animation==='none') return
  element.style.transitionProperty = 'all'
  element.style.transitionDuration = duration + 'ms'
  if(typeof animation === 'string')
    element.classList.add(animations[animation])
  else
    Object.assign(element.style, animation)
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

export function delay(ms) {
  return new Promise(resolve =>
    setTimeout(resolve, ms)
  )
}

/**
   * @param {Function[]} animationList
   * @param {Number} duration */
export function queueAnimation(animationList) {
  function exec() {
    if(i>=animationList.length) return
    animation = animationList[i++]
    let promise = animation()
    if(promise instanceof Promise)
      promise.then(exec)
    else
      exec()
  }
  let i = 0
  let animation
  exec()
}
