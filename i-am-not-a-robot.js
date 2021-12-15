const iAmNotARobot = (btn, cb) => {
  let human = false
  btn.onclick(() => {
    new Promise(resolve => (
      human = true, resolve()
    ))
  })
  btn.onclick(event => {
    cb(event, human)
    human = false
  })
}
