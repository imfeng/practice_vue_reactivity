import { provide, inject } from 'vue';

type StoreHookFunction<T> = () => T;

const storeMap = new Map<string, any>(); // name -> state

export function defineStore<T>(name: string, hook: StoreHookFunction<T>) {
  const useStore = () => {
    if (storeMap.has(name)) {
      return storeMap.get(name) as T;
    }
    const state = hook();
    storeMap.set(name, state);
    return state as T;
  };

  return useStore;
}

export function defineContextStore<T>(name: string, hook: StoreHookFunction<T>) {
  const provideStore = (): T => {
    const store = hook();
    provide(name, store);

    return store;
  };

  const injectStore = (): T => {
    const store = inject<T>(name);
    if (!store) {
      throw new Error(`cannot find context store '${name}' !`);
    }
    return store;
  };

  return {
    provideStore,
    injectStore
  };
}
