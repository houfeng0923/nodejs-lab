test = (a) ->
  console.log a
  a = yield a + 1
  console.log a


g = test 1
console.log g.next()
console.log g.next(3)
