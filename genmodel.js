
const genModel = (...fields) => class {

  constructor(...values) {
    this.constructor.apply(this, ...values)
  }

  static apply(funcObj, ...values) {
    const capsule = [...values]
    fields.forEach((field, index) => {
      this[`get${field}`] = () => capsule[index]
      this[`set${field}`] = newValue => { capsule[index] = newValue }
    })
    return funcObj
  }

}
