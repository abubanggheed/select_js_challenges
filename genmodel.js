
const genModel = (...fields) => class {

  constructor(...values) {
    const capsule = [...values]
    fields.forEach((field, index) => {
      this[`get${field}`] = () => capsule[index]
      this[`set${field}`] = newValue => { capsule[index] = newValue }
    }) 
  }

}
