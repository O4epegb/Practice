function repeat(operation, num) {
  // modify this so it can be interrupted
  setTimeout(() => {
    if (num <= 0) return
    operation()
    return repeat(operation, --num)
  }, 0)
}

module.exports = repeat;