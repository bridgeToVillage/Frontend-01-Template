function match(string) {
    let state = start
    for (let char of string) {
      state = state(char)
    }
    return state === end
  }
  function start(char) {
    if (char === 'a')
      return findA1
    else
      return start
  }
  function end(char) {
    return end
  }
  function findA1(char) {
    if (char === 'b')
      return findB1
    else
      return start(char)
  }
  function findB1(char) {
    if (char === 'a')
      return findA2
    else
      return start(char)
  }
  function findA2(char) {
    if (char === 'b')
      return findB2
    else
      return start(char)
  }
  function findB2(char) {
    if (char === 'x')
      return end
    else
      return findB1(char)
  }
  console.log(match("I aacbabababx grood."))