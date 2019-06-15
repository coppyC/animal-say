/** animal manager */

/** @type {Object<string,string>} */
const animals = {
  chameleon: 'https://unpkg.com/animal-say/animals/chameleon.png',
}

Object.defineProperty(animals, 'random', {
  enumerable: false,
  get(){
    const keys = Object.keys(this)
    const name = keys [~~ (Math.random() * keys.length)]
    return this[name]
  }
})

export default animals
