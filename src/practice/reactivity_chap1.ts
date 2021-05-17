/* eslint-disable @typescript-eslint/no-unused-vars */
export function useProduct(price: number, quantity: number) {
  const product = {
    price,
    quantity,
    total: 0
  };

  // TODO: ...

  return {
    product
    // effect
  };
}

// for multiple effects in same property
// Solution: dep Set
export function useProduct2(price: number, quantity: number) {
  const product = {
    price,
    quantity,
    total: 0,
    onSaleTotal: 0
  };

  // TODO: ...

  return {
    product
    // setPrice

  };
}

// for multiple effects in multiple properties
// Solution: depsMap
export function useProduct3(price: number, quantity: number) {
  const product = {
    price,
    quantity
  };

  // TODO: ...

  return {
    product
    // effect2,
    // effect,
    // trigger,
    // track

  };
}

// different reactive object to use multiple effects in multiple properties
// Solution: WeakMap
// targetMap stores the effects that each object should re-run when it's updated

export function useProduct4(price: number, quantity: number) {
  const product = {
    price,
    quantity,
    total: 0,
    onSalePrice: 0
  };

  const effect = () => {
    product.total = product.price * product.quantity;
  };

  return {
    product,
    effect
  };
}

export function useReactiveUtil() {
  const targetMap = new WeakMap<any, Map<string, Set<Function>>>();

  function track(target: any, propKey: string, eff: Function) {
    // TODO: ...
  }

  //  re-run when property changed
  function trigger(target: any, propKey: string) {
    // TODO: ...
  }

  return {
    track,
    trigger
  };
}
