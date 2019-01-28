import animals from './animals'
import Message from './Message.class'
import Dialog from './Dialog.class'
import Loading from './Loading.singleton'
import Progress from './Progress.singleton'

export default class Animal {
  static get list() {
    return Object.keys(animals)
  }
  static add(name, source) {
    animals[name] = source
  }
  static remove(name) {
    delete animals[name]
  }
  static clear() {
    for(let name in animals)
      Animal.remove(name)
  }

  /** send a message use default configure */
  static say(word) {
    const {conf} = this
    new Message({ word, conf })
  }
  /** call a dialog only with confirm button */
  static tell(something) {
    return new Dialog({
      content: something,
      tools: ['yes'],
      conf: this.conf,
    }).promise
  }
  /** call a dialog only with yes and no button */
  static confirm(question) {
    return new Dialog({
      content: question,
      tools: ['no','yes'],
      conf: this.conf,
    }).promise
  }
  /** call a dialog with true and false buttons */
  static ask(question) {
    return new Dialog({
      content: question,
      tools: ['input', 'yes', 'no'],
      conf: this.conf,
    }).promise
  }
  /** show loading */
  static loading(tipText) {
    Loading.start(tipText, this.conf)
  }
  /** @param {Number} percentage 0~100 */
  static progress(percentage) {
    Progress.start(percentage, this.conf)
  }
  /** @param {'loading'|'progress'} type */
  static quiet(type='loading') {
    switch(type) {
      case 'loading':
        Loading.stop()
        break
      case 'progress':
        Progress.stop()
        break
    }
  }

  /** @param {Configure} conf */
  constructor(conf={}) {
    for(let name in conf)
      Object.setPrototypeOf(conf[name], Animal.conf[name])
    Object.setPrototypeOf(conf, Animal.conf)
    this.conf = conf
  }
  say(word) {
    Animal.say.call(this, word)
  }
  tell(something) {
    Animal.tell.call(this, something)
  }
  confirm(question) {
    Animal.confirm.call(this, question)
  }
  ask(question) {
    Animal.ask.call(this, question)
  }
  loading(tipText) {
    Animal.loading.call(this, tipText)
  }
  /** @param {Number} percentage 0~100 */
  progress(percentage) {
    Animal.progress.call(this, percentage)
  }
  /** @param {'loading'|'progress'} type */
  quiet(type='loading') {
    Animal.quiet.call(this, type)
  }
}

/** @type {Configure} */
Animal.conf = {
  animal: {
    name: "random",
    animation: 'scroll',
  },
  msg: {
    position: 'right',
    animation: 'fade',
    duration: 'auto',
    BG_primary: 'rgba(20, 23, 24, .8)',
    BG_warn: 'rgba(234, 113, 48, .85)',
    BG_danger: 'rgba(213, 41, 41, .9)',
  },
  dialog: {
    required: true,
    autoClose: true,
    BG_mask: 'rgba(0,0,0,.3)',
    BG_confirm: 'rgb(144,199,77)',
    COLOR_confirm: '#f9f9f9',
    TEXT_confirm: '✔',
    TEXT_cancel: '✘',
  },
  loading: {
    direction: 'column',
  },
  progress: {
    keep: 350,
    position: 'bottom',
  }
}

/**
 * @typedef {Object} Configure
 *
 * @property {Object} Configure.animal
 * @property {'chameleon'|'random'} Configure.animal.name
 * @property {'left'|'right'} Configure.animal.position !!! not support now
 * @property {'fade'|'slide'|'scroll'|'none'} Configure.animal.animation
 *
 * @property {Object} Configure.msg
 * @property {String|Element} Configure.msg.mount
 * @property {'left'|'right'} Configure.msg.position !!! not support now
 * @property {'auto'|Number|{base:Number,increase:Number}} Configure.msg.duration
 * @property {'fade'|'slide'|'scroll'|'none'} Configure.msg.animation
 * @property {String} Configure.msg.BG_primary the background color of say mode
 * @property {String} Configure.msg.BG_warn the background color of warn mode
 * @property {String} Configure.msg.BG_danger the background color of danger mode
 * @property {String} Configure.msg.COLOR_primary the text color for say mode
 * @property {String} Configure.msg.COLOR_warn the text color for warn mode
 * @property {String} Configure.msg.COLOR_danger the text color for danger mode
 *
 * @property {Object} dialog
 * @property {Boolean} dialog.autoClose auto close the dialog after click the confirm or cancel button
 * @property {Boolean} dialog.required must have an answer when click the confirm
 * @property {String} dialog.placeholder
 * @property {String} dialog.BG_mask
 * @property {String} dialog.BG_dialog
 * @property {String} dialog.BG_confirm
 * @property {String} dialog.BG_cancel
 * @property {String} dialog.COLOR_dialog
 * @property {String} dialog.COLOR_confirm
 * @property {String} dialog.COLOR_cancel
 * @property {String} dialog.TEXT_confirm
 * @property {String} dialog.TEXT_cancel
 *
 * @property {Object} loading
 * @property {'row'|'column'} loading.direction
 * @property {String} loading.BG_mask
 * @property {String} loading.COLOR_text
 *
 * @property {Object} progress
 * @property {Number} progress.keep the time(ms) to hide when the progress achieve 100%
 * @property {'top'|'bottom'} progress.position
 * @property {String} progress.BG_mask
 * @property {String} progress.BG_progress
 * @property {String} progress.COLOR_text
 */
