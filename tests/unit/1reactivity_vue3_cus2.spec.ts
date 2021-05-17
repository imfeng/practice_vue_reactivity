// import { effect } from '../ref/ref';
const targetMap = new WeakMap();
const dep = new Set<Function>();
let activeEffect: Function | null = null; // The active effect running
function effect (eff: Function) {
  activeEffect = eff;
  eff();
  activeEffect = null;
}

function track (target: any, key: any) {
  if (activeEffect) {
    // We need to make sure this effect is being tracked.
    let depsMap = targetMap.get(target); // Get the current depsMap for this target
    if (!depsMap) {
      // There is no map.
      targetMap.set(target, (depsMap = new Map())); // Create one
    }
    let dep = depsMap.get(key); // Get the current dependencies (effects) that need to be run when this is set
    if (!dep) {
      // There is no dependencies (effects)
      depsMap.set(key, (dep = new Set())); // Create a new Set
    }
    dep.add(activeEffect); // Add effect to dependency map
  }
}

function trigger (target: any, key: any) {
  const depsMap = targetMap.get(target); // Does this object have any properties that have dependencies (effects)
  if (!depsMap) {
    return;
  }
  const dep = depsMap.get(key); // If there are dependencies (effects) associated with this
  if (dep) {
    dep.forEach((effect: Function) => {
      // run them all
      effect();
    });
  }
}

function reactive<T> (target: T) {
  const handler = {
    get (target: any, key: any, receiver: any) {
      const result = Reflect.get(target, key, receiver);
      track(target, key);
      return result;
    },
    set (target: any, key: any, value: any, receiver: any) {
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);
      if (result && oldValue !== value) { // Only if the value changes
        trigger(target, key);
      }
      return result;
    }
  };
  return new Proxy(target, handler);
}

describe('Reactivity v2', () => {
  it('test effect function', () => {
    const product = reactive({ price: 5, quantity: 2 });
    let total = 0;
    effect(() => {
      total = product.price * product.quantity;
      // console.log(`trigger: total=${product.price}*${product.quantity}=`, total);
    });

    let discountTotal = 0;
    effect(() => {
      discountTotal = product.price * product.quantity * 0.5;
    });

    expect(total).toEqual(10);
    expect(discountTotal).toEqual(5);

    product.price = 20;
    expect(total).toEqual(40);
    expect(discountTotal).toEqual(20);

    product.quantity = 4;
    expect(total).toEqual(80);
    expect(discountTotal).toEqual(40);
  });
});
