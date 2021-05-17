/* eslint-disable @typescript-eslint/no-unused-vars */

export function useProductByProxy(price: number, quantity: number) {
  const product = {
    price,
    quantity
  };

  const productProxy = new Proxy(product, {
    get(target, propKey, receiver) {
      return Reflect.get(target, propKey, receiver);
    },
    set(target, propKey, value, receiver) {
      return Reflect.set(target, propKey, value, receiver);
    }
  });

  // total: 0,
  // onSalePrice: 0

  // const effect = () => {
  //   product.total = product.price * product.quantity;
  // };

  return {
    product: productProxy
    // effect
  };
}

export const { track, trigger, effect, ref, computed } = useReactiveUtil();

export function useReactiveProduct(price: number, quantity: number) {
  const product = {
    price,
    quantity
  };

  const productProxy = new Proxy(product, {
    get(target: any, propKey: string, receiver) {
      const result = Reflect.get(target, propKey, receiver);
      // console.log(`proxy get value: ${propKey} = ${result}`);
      track(target, propKey);
      return result;
    },
    set(target: any, propKey: string, value, receiver) {
      const oldValue = target[propKey];
      // console.log(oldValue, value);
      const result = Reflect.set(target, propKey, value, receiver);
      if (result && oldValue !== value) {
        // console.log('proxy trigger:', propKey);
        trigger(target, propKey);
      }
      return result;
    }
  });

  // total: 0,
  // onSalePrice: 0

  // const effect = () => {
  //   product.total = product.price * product.quantity;
  // };

  return {
    product: productProxy
  };
}

export function useReactiveUtil() {
  const targetMap = new WeakMap<any, Map<string, Set<Function>>>();
  let activeEffect: Function | null = null;

  function effect(eff: Function) {
    activeEffect = eff;
    // if there has track properties inside function then show go track first due to Proxy
    activeEffect();
    activeEffect = null;
  }

  function track(target: any, propKey: string) {
    if (activeEffect) {
      // need to make sure this effect is being tracked.
      let depsMap = targetMap.get(target);

      if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
      }

      let dep = depsMap.get(propKey);
      if (!dep) {
        dep = new Set<Function>();
        depsMap.set(propKey, dep);
      }
      // console.log('track: add effect');
      dep.add(activeEffect);
    }
  }

  //  re-run when property changed
  function trigger(target: any, propKey: string) {
    // Does this object have any properties that have dependencies (effects)
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }

    const dep = depsMap.get(propKey);
    if (dep) {
      dep.forEach(eff => eff());
    }
  }

  // function ref(intialValue: any) {
  //   return reactive({ value: intialValue });
  // }

  function ref(raw: any) {
    const r = {
      get value() {
        track(r, 'value');
        return raw;
      },
      set value(newVal) {
        raw = newVal;
        trigger(r, 'value');
      }
    };
    return r;
  }

  function computed(getter: Function) {
    const result = ref(null); // Create a new reactive reference

    effect(() => (result.value = getter())); // Set this value equal to the return value of the getter

    return result; // return the reactive reference
  }

  return {
    computed,
    ref,
    effect,
    track,
    trigger
  };
}
