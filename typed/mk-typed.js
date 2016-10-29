// /* @flow */
//
// import type {List, Pair} from './lib';
// type Var = number;
//
// const {
//   assv,
//   car,
//   cdr,
//   cons,
//   empty,
//   isPair,
//   list,
// } = require('./lib');
//
// function dEqual(u, v) {
//   return function(sOrC) {
//     let s = car(sOrC);
//     s = unify(find(u, s), find(v, s), s);
//
//     return s ?
//       list(cons(s, cdr(sOrC))) :
//       list();
//   }
// }
//
// function isVar(x: any): boolean {
//   return typeof x === 'number';
// }
//
// function makeVar(x: number): number {
//   return x;
// }
//
// function unify<A>(u, v, s) {
//   if (u === v) {
//     return s;
//   } else if (isVar(u)) {
//     return extS(u, v, s);
//   } else if (isVar(v)) {
//     return unify(v, u, s);
//   } else if (isPair(u) && isPair(v)) {
//     const s = unify(
//       find(car(u), s),
//       find(car(v), s),
//       s
//     );
//     return s && unify(
//       find(cdr(u), s),
//       find(cdr(v), s),
//       s
//     );
//   }
//   return false;
// }
//
// function extS(x, u, s) {
//   if (doesOccur(x, u, s)) {
//     return false;
//   }
//
//   return cons(cons(x, u), s);
// }
//
// function find<A>(u, s: List<List<A>>) {
//   const pr: false | List<A> = isVar(u) && assv(u, s);
//   return pr ?
//     find(cdr(pr), s) :
//     u;
// }
//
// function doesOccur(x, u, s): boolean {
//   if (isVar(u)) {
//     return x === u;
//   } else if (isPair(u)) {
//     return (
//       doesOccur(x, find(car(u), s), s) ||
//       doesOccur(x, find(cdr(u), s), s)
//     );
//   }
//
//   return false;
// }
//
// function callFresh(f) {
//   return function(sOrC) {
//     const c = cdr(sOrC);
//     return f(makeVar(c))(
//       cons(car(sOrC), c + 1)
//     );
//   }
// }
