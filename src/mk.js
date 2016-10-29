const {
  assv,
  car,
  cdr,
  cons,
  delay,
  force,
  isDelayed,
  isEmpty,
  isPair,
  list,
  print,
} = require('./lib');

const dEqual = (u, v) => (sc) => {
  let s = car(sc);
  s = unify(find(u, s), find(v, s), s);
  return s ?
    list(cons(s, cdr(sc))) :
    list();
};

// NOTE: `(eqv? '() '())` is true, but `[] === []` isn't
const areEqv = (x, y) =>
  isEmpty(x) && isEmpty(y) ? true : x === y;

const unify = (u, v, s) => {
  if (areEqv(u, v)) {
    return s;
  } else if (isVar(u)) {
    return extS(u, v, s);
  } else if (isVar(v)) {
    return unify(v, u, s);
  } else if (isPair(u) && isPair(v)) {
    const s1 = unify(find(car(u), s), find(car(v), s), s);
    return s1 && unify(find(cdr(u), s1), find(cdr(v), s1), s1);
  }
  return false;
};

const find = (u, s) => {
  const pr = isVar(u) && assv(u, s);
  return pr ?
    find(cdr(pr), s) :
    u;
};

const extS = (x, u, s) => {
  if (doesOccur(x, u, s)) {
    return false;
  }

  return cons(cons(x, u), s);
};

const doesOccur = (x, u, s) => {
  if (isVar(u)) {
    return areEqv(x, u);
  } else if (isPair(u)) {
    return (
      doesOccur(x, find(car(u), s), s) ||
      doesOccur(x, find(cdr(u), s), s)
    );
  }

  return false;
};

const makeVar = (x) => x;

const isVar = (x) => typeof x === 'number';

const callWithInitialState = (n, g) =>
  take(n, pull(g(cons(list(), 0))));

const take = (n, $) => {
  if (isEmpty($)) {
    return list();
  } else if (n && n === 1) {
    return list(car($));
  }

  return cons(
    car($),
    take(n && n - 1, pull(cdr($)))
  );
};

const pull = ($) => isDelayed($) ? pull(force($)) : $;

const callWithFresh = (f) => (sc) => {
  const c = cdr(sc);
  const fn = f(makeVar(c));
  return fn(cons(car(sc), c + 1));
};

const disj = (g1, g2) => (sc) => $append(g1(sc), g2(sc));

const conj = (g1, g2) => (sc) => $appendMap(g1(sc), g2);

const $append = ($1, $2) => {
  if (isEmpty($1)) {
    return $2;
  } else if (isDelayed($1)) {
    return delay(() => $append($2, force($1)));
  }

  return cons(car($1), $append(cdr($1), $2));
};

const $appendMap = ($, g) => {
  if (isEmpty($)) {
    return list();
  } else if (isDelayed($)) {
    return delay(() => $appendMap(force($), g));
  }

  return $append(g(car($)), $appendMap(cdr($), g));
};

const ifte = (g0, g1, g2) => (sc) => {
  const loop = ($) => {
    if (isEmpty($)) {
      return g2(sc);
    } else if (isDelayed($)) {
      return delay(() => loop(force($)));
    }
    return $appendMap($, g1);
  };

  return loop(g0(sc));
};

const once = (g) => (sc) => {
  const loop = ($) => {
    if (isEmpty($)) {
      return list();
    } else if (isDelayed($)) {
      return delay(() => loop(force($)));
    }

    return list(car($));
  };

  return loop(g(sc));
};

const append = (l, s, o) => (sc) => delay(() => {
  const fn = disj(
    conj(dEqual(l, list()), dEqual(s, o)),
    callWithFresh(
      (a) => callWithFresh(
        (d) => conj(
          dEqual(l, cons(a, d)),
          callWithFresh(
            (r) => conj(dEqual(o, cons(a, r)), append(d, s, r))
          )
        )
      )
    )
  );

  return fn(sc);
});

const isList = (l) => (sc) => delay(() => {
  const fn = disj(
    dEqual(l, list()),
    callWithFresh(
      (a) => callWithFresh(
        (d) => conj(dEqual(cons(a, d), l), isList(d))
      )
    )
  );

  return fn(sc);
});

module.exports = {
  append,
  callWithFresh,
  callWithInitialState,
};
