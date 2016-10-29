const {
  append,
  callWithFresh,
  callWithInitialState,
} = require('../mk');

const {
  list,
  toString,
} = require('../lib');

it('should match snapshots', () => {
  const result1 = toString(callWithInitialState(
    false,
    callWithFresh((q) => append(
      list('t', 'u', 'v'),
      list('w', 'x'),
      q
    ))
  ));

  expect(result1).toMatchSnapshot();

  const result2 = toString(callWithInitialState(
    false,
    callWithFresh(
      (q) => callWithFresh(
        (p) => append(
          q,
          p,
          list('t', 'u', 'v', 'w', 'x')
        )
      )
    )
  ));

  expect(result2).toMatchSnapshot();
});
