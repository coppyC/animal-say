import Animal from '../../lib/Animal.class'

/**
 * @param {Object} param0
 * @param {String} param0.name
 * @param {String} param0.model
 * @param {{name:String, value:String}[]} param0.options
 */
export function Select ({ name, model, options }) {
  if(!Select.id) Select.id = 0
  const comp = document.createElement('div')
  const [k1,k2] = model.split('.')
  comp.classList.add('form-group', 'row')
  comp.innerHTML = `
    <label class="col-sm-4 col-form-label">${name} / Configure.${model}</label>
    <div class="col-sm-8">
      <select class="form-control">
        ${ options.map(o => `<option value="${o.value}">${o.name}${o.value==undefined?'':` / ${o.value}`}</option>` ) }
      </select>
    </div>
  `
  const $select = comp.querySelector('select')
  $select.value = Animal.conf[k1][k2]
  $select.addEventListener('change', e => {
    Animal.conf[k1][k2] = options[e.target.selectedIndex].value
  })
  return comp
}

/**
 * @param {Object} param0
 * @param {String} param0.name
 * @param {String} param0.model
 * @param {'number'|'text'|'color'} param0.inputType
 */
function Input ({ name, model, inputType }) {
  if(!Input.id) Input.id = 0
  const comp = document.createElement('div')
  const [k1,k2] = model.split('.')
  comp.classList.add('form-group', 'row')
  comp.innerHTML = `
    <label class="col-sm-4 col-form-label">${name} / Configure.${model}</label>
    <div class="col-sm-8">
      <input type="${inputType||'text'}" class="form-control" style="height:38px">
    </div>
  `
  const $input = comp.querySelector('input')
  if(Animal.conf[k1][k2]!==undefined)
    $input.value = Animal.conf[k1][k2]
  $input.addEventListener('change', e => {
    Animal.conf[k1][k2] = e.target.value
  })
  return comp
}

export function TextInput(name, model) {
  return Input({ name, model, inputType:'text' })
}
export function ColorInput(name, model) {
  return Input({ name, model, inputType:'color' })
}
export function NumberInput(name, model) {
  return Input({ name, model, inputType:'number' })
}

/**
 * @param {Object} param0
 * @param {String} param0.id
 * @param {{en:String, zh:String}} param0.title
 * @param {{inputValue:String, inputType:'number'|'text',  placeholder:String, click:(text:String)=>{} }} param0.main
 * @param {HTMLElement[]} param0.options
 */
export function Item ({ id, title, main, options }) {
  const comp = document.createElement('div')
  comp.innerHTML = `
    <div class="title">
      <div class="main"><strong>${id.toUpperCase()}.</strong> <small>${title.zh}</small> </div>
      <div class="secondary">${title.en}</div>
    </div>
    <div class="options collapse show">
      <div id="collapse-${id}" class="card card-body">  </div>
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <button id="btn-${id}" class="btn btn-outline-secondary" type="button">
          ${id[0].toUpperCase()+id.slice(1).toLowerCase()}
        </button>
      </div>
      <input type="${main.inputType||'text'}" id="text-${id}" class="form-control" placeholder="${main.placeholder||''}" aria-describedby="basic-addon1" value="${main.inputValue}">
    </div>
  `
  /** @type {HTMLDivElement} */
  const $options = comp.querySelector('#collapse-'+id)
  $options.parentElement.hidden = true
  if(options) $options.append(...options)
  comp.querySelector('.title').addEventListener('click',
    () => $options.parentElement.hidden = !$options.parentElement.hidden)
  comp.querySelector('#btn-'+id).addEventListener('click',
    () => main.click && main.click(comp.querySelector('#text-'+id).value))
  return comp
}
