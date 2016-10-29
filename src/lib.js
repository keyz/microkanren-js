const hasOwnProperty = Object.prototype.hasOwnProperty;

const isPair = (x) => {
  if (Array.isArray(x) && x.length !== 0) {
    return true;
  }

  return typeof x === 'object' &&
    Object.keys(x).length === 2 &&
    hasOwnProperty.call(x, 'car') &&
    hasOwnProperty.call(x, 'cdr');
};

const isList = (x) => Array.isArray(x);

const isEmpty = (x) => isList(x) && x.length === 0;

const cons = (a, d) => {
  if (Array.isArray(d)) {
    return [a, ...d];
  }

  return {
    car: a,
    cdr: d,
  };
};

const car = (x) => {
  if (Array.isArray(x)) {
    if (x.length === 0) {
      throw new Error('car cannot take an empty list');
    }
    return x[0];
  }

  return x.car;
};

const cdr = (x) => {
  if (Array.isArray(x)) {
    if (x.length === 0) {
      throw new Error('cdr cannot take an empty list');
    } else if (x.length === 1) {
      return [];
    }
    return x.slice(1);
  }

  return x.cdr;
};

const list = (...args) => args;

const assv = (x, lss) => {
  for (let i = 0; i < lss.length; i++) {
    if (car(lss[i]) === x) {
      return lss[i];
    }
  }
  return false;
};

const toString = (x) => {
  if (Array.isArray(x)) {
    return `(${x.map((y) => toString(y)).join(' ')})`;
  } else if (isPair(x)) {
    return `(${toString(car(x))} . ${toString(cdr(x))})`;
  }

  return x.toString();
};

class Delayed {
  constructor(thunk) {
    this.val = thunk;
    this.evaluated = false;
  }

  force() {
    if (this.evaluated) {
      return this.val;
    }
    this.val = this.val();
    this.evaluated = true;
    return this.val;
  }
}

const delay = (thunk) => new Delayed(thunk);

const isDelayed = (x) => x instanceof Delayed;

const force = (delayed) => delayed.force();

const print = (x) => console.log(toString(x));

module.exports = {
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
  toString,
};
