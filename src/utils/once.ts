/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ref, watch } from 'vue';
/**
 * Return a promise which will be resolved when the *condition* being met.
 *
 * @example
 * const count = ref(0)
 * await once(count, (newCount) => newCount === 99)
 * // do something after count is 99
 */
export function once<T> (ref: Ref<T>, condition: (refValue: T) => boolean) {
  if (condition(ref.value)) return Promise.resolve(true);

  return new Promise((resolve) => {
    const stop = watch(ref, (newVal) => {
      if (condition(newVal)) {
        stop();
        resolve(true);
      }
    });
  });
}

// const count = ref(0)
// await once(count, (val) => val === 1)
//   //do something
