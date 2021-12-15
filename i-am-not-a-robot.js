let human = false

const iAmNotARobot = (btn, cb) => {
  btn.onclick(() => {
    new Promise(resolve => (
      human = true, resolve()
    ))
  })
  btn.onclick(() => {
    human ?
      cb('human')
      : cb('robot')
  })
}
