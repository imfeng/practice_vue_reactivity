/* eslint-disable @typescript-eslint/no-unused-vars */

export function useProductByProxy(price: number, quantity: number) {
  const product = {
    price,
    quantity
  };

  const productProxy = new Proxy(product, {
    get(target, propKey, receiver) {
      // TODO: ...
    }
    // set(target, propKey, value, receiver) {
    //   // TODO: ...
    // }
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
      // TODO: ...
    }
    // set(target: any, propKey: string, value, receiver) {
    //   // TODO: ...
    // }
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
  const activeEffect: Function | null = null;

  function effect(eff: Function) {
    // TODO: ...
  }

  function track(target: any, propKey: string) {
    if (activeEffect) {
      // TODO: ...
    }
  }

  //  re-run when property changed
  function trigger(target: any, propKey: string) {
    // Does this object have any properties that have dependencies (effects)
    const depsMap = targetMap.get(target);
    // TODO: ...
  }

  // function ref(intialValue: any) {
  //   return reactive({ value: intialValue });
  // }

  function ref(raw: any) {
    const r = {
      // TODO: ...
    };
    return r;
  }

  function computed(getter: Function) {
    // TODO: ...
  }

  return {
    computed,
    ref,
    effect,
    track,
    trigger
  };
}
