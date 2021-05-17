/* eslint-disable @typescript-eslint/no-unused-vars */
export function useProduct(price: number, quantity: number) {
  const product = {
    price,
    quantity,
    total: 0
  };

  //   step1
  //   product.total = product.price * product.quantity;

  //   step2
  const effect = () => {
    product.total = product.price * product.quantity;
  };
  effect();

  return {
    product,
    effect
  };
}

// for multiple effects in same property
// Solution: dep Set
export function useProduct2(price: number, quantity: number) {
  // a set of dependencies(effects) that should get re-run when value change (trigger)
  const dep = new Set<Function>();
  const product = {
    price,
    quantity,
    total: 0,
    onSaleTotal: 0
  };

  const effect = () => {
    product.total = product.price * product.quantity;
  };

  const effect2 = () => {
    product.onSaleTotal = product.price * product.quantity * 0.8;
  };

  const track = (eff: Function) => {
    dep.add(eff);
    eff();
  };

  //  re-run when property changed
  const trigger = () => {
    dep.forEach(eff => eff());
  };

  track(effect);
  track(effect2);

  const setPrice = (p: number) => {
    product.price = p;
    trigger();
  };

  return {
    product,
    setPrice

  };
}

// for multiple effects in multiple properties
// Solution: depsMap
export function useProduct3(price: number, quantity: number) {
  const depsMap = new Map<string, Set<Function>>(); // propKey -> effects(dep Set)
  const product = {
    price,
    quantity,
    total: 0,
    onSalePrice: 0
  };

  const effect = () => {
    product.total = product.price * product.quantity;
  };

  const effect2 = () => {
    product.onSalePrice = product.price * 0.8;
  };

  function track(propKey: string, eff: Function) {
    let dep = depsMap.get(propKey);
    if (!dep) {
      dep = new Set<Function>();
      depsMap.set(propKey, dep);
    }
    dep.add(eff);
    eff();
  }

  //  re-run when property changed
  function trigger(propKey: string) {
    const dep = depsMap.get(propKey);
    if (dep) {
      dep.forEach(eff => eff());
    }
  }

  return {
    product,
    effect2,
    effect,
    trigger,
    track

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
    dep.add(eff);
    eff();
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

  return {
    track,
    trigger
  };
}
