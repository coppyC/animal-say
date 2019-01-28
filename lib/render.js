/**
 * @typedef {{ classname: String[], style: CSSStyleDeclaration }} Option
 */

/** mount element into page
 * @param {Element} el
 * @param {String|Element} target */
export default function render(el, target) {
  if(!target)
    document.body.appendChild(el)
  else if(typeof target == 'string')
    document.querySelector(target).appendChild(el)
  else if(target instanceof Element)
    target.appendChild(el)
  else
    console.error('target should be a string or HTMLelement')
}

/** render element
 * @param {String} tagName
 * @param {Option} option
 * @param {Element[]} children
 * @returns {HTMLElement} */
export function h(tagName, option, children) {
  const el = document.createElement(tagName)
  if(option) {
    if(typeof option.classname == 'string')
      el.classname = option.classname
    else if(typeof option.classname == 'object')
      el.classList.add(...option.classname)
    if(typeof option.style == 'string')
      el.style.cssText = option.style
    else if(typeof option.style == 'object')
      Object.assign(el.style, option.style)
  }
  if(children) {
    if(typeof children == 'string')
      el.innerHTML = children
    else if(children instanceof Array)
      el.append(...children)
  }
  return el
}

/** parse css to module object  */
function parseCss(css, createAnimation) {
  const uniCode = String(Math.random()).slice(2)
  let keyframes = ''
  const cssObj = {}
  css = String(css).replace(/\.([^.,{ ]+) *\n? *{([^}]*)}/g, function(stylesheel, classname, ctx) {
    const uniname = classname + '-animal-say-' + uniCode
    cssObj[classname] = uniname
    if(createAnimation)
      keyframes += `@keyframes ${uniname} { 0% { ${ctx} } } \n`
    return stylesheel.replace(classname, uniname)
  })
  css = keyframes + css
  render(h('style', null, css), 'head')
  return cssObj
}

export const styled = {
  div(...css) {
    return h('div', { style: String.raw(...css) })
  },
  /** @returns {HTMLImageElement} */
  img(...css) {
    return h('img', { style: String.raw(...css) })
  },
  form(...css) {
    return h('form', { style: String.raw(...css) })
  },
  /** @returns {HTMLInputElement} */
  input(...css) {
    return h('input', { style: String.raw(...css) })
  },
  /** @returns {HTMLButtonElement} */
  button(...css) {
    return h('button', { style: String.raw(...css) })
  },
  /** css module */
  css(...style) {
    return parseCss(String.raw(...style))
  },
  /** animation module */
  animation(...style) {
    return parseCss(String.raw(...style), true)
  },
  keyframes(...keyframes) {
    return {}
  }
}

export const css = String.raw
