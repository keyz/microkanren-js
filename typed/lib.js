// /* @flow */
//
// type Pair<A, D> = {
//   car: A,
//   cdr: D,
// };
//
// type List<A> = '__EMPTY__' | Pair<A, List<A>>;
//
// const hasOwnProperty = Object.prototype.hasOwnProperty;
//
// const empty = '__EMPTY__';
//
// function isEmpty(x: any): boolean {
//   return x === empty;
// }
//
// function cons<A, D>(a: A, d: D): Pair<A, D> {
//   return {
//     car: a,
//     cdr: d,
//   };
// }
//
// function car<A>(pair: List<A>): A {
//   if (pair === '__EMPTY__') {
//     throw new Error('car cannot take an empty list');
//   }
//   return pair.car;
// }
//
// function cdr<A>(pair: List<A>): List<A> {
//   if (pair === '__EMPTY__') {
//     throw new Error('cdr cannot take an empty list');
//   }
//   return pair.cdr;
// }
//
// function list<A>(...args: Array<A>): List<A> {
//   return args.reduceRight(
//     (res, x) => cons(x, res),
//     '__EMPTY__',
//   );
// }
//
// function isPair(x: any): boolean {
//   return typeof x === 'object' &&
//     Object.keys(x).length === 2 &&
//     hasOwnProperty.call(x, 'car') &&
//     hasOwnProperty.call(x, 'cdr');
// }
//
// function isList(x: any): boolean {
//   if (x === '__EMPTY__') {
//     return true;
//   }
//   return isPair(x) && isList(cdr(x));
// }
//
// function assv<A>(
//   x: any,
//   lss: List<List<A>>
// ): List<A> | false {
//   let cursor = lss;
//   while (cursor !== '__EMPTY__') {
//     if (x === car(car(cursor))) {
//       return car(cursor);
//     }
//     cursor = cdr(cursor);
//   }
//   return false;
// }
//
// function foldl<A, B>(ls: List<A>, fn: (acc: B, x: A) => B, init: B): B {
//   let result = init;
//   let cursor = ls;
//
//   while (cursor !== '__EMPTY__') {
//     result = fn(result, car(cursor));
//     cursor = cdr(cursor);
//   }
//
//   return result;
// }
//
// function toString(x: any): string {
//   if (isPair(x) && !isList(x)) {
//     return `(${toString(car(x))} . ${toString(cdr(x))})`;
//   } else if (isList(x)) {
//     let cursor = x;
//     let stack = [];
//     while (cursor !== '__EMPTY__') {
//       stack.push(toString(car(cursor)));
//       cursor = cdr(cursor);
//     }
//     return `(${stack.join(' ')})`;
//   } else {
//     return x.toString();
//   }
// }
//
// const log = (x: any): void => console.log(toString(x));
//
// export type {List, Pair};
//
// module.exports = {
//   assv,
//   car,
//   cdr,
//   cons,
//   empty,
//   foldl,
//   isEmpty,
//   isList,
//   isPair,
//   list,
//   log,
// };
