import R from 'ramda';
import { Maybe, Either } from 'ramda-fantasy';

/**
 * Function to rapidly extract a value from Maybe or Either monad.
 * But it should be used only when we're sure that we should have a value,
 * otherwise it will throw an exception.
 *
 * @private
 * @function explode
 * @param {Maybe|Either}
 * @returns {*}
 * @throws Error
 */
export const explode = R.cond([
  [Maybe.isJust, R.unnest],
  [Maybe.isNothing, () => { throw new Error('Maybe is expected to be Just, but its Nothing.'); }],
  [Either.isRight, R.unnest],
  [Either.isLeft, (val) => { throw new Error(`Either expected to be Right, but its Left with value: ${val}`); }],
  [R.T, (input) => { throw new Error(`Maybe or Either should be passed into explode function. Passed: ${input}`); }],
]);

export default { explode };
