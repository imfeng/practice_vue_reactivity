import {
  useProductByProxy, useReactiveProduct,
  effect, ref, computed
} from '../../src/practice/reactivity_chap2';

describe('Reactivity chapter 2', () => {
  it('verify proxy result', () => {
    // arr: Array<{price: number, quantity: number}>
    const { product: product1 } = useProductByProxy(5, 2);
    const { product: product2 } = useProductByProxy(10, 3);
    expect(product1.price).toEqual(5);
    expect(product1.quantity).toEqual(2);

    expect(product2.price).toEqual(10);
    expect(product2.quantity).toEqual(3);
  });

  it('can use reactive object by use Proxy', () => {
    const { product } = useReactiveProduct(5, 2);

    let total = 0;

    effect(() => {
      // console.log(`effect: ${product.price}, ${product.quantity}`);
      total = product.price * product.quantity;
    });

    // track(product1, 'price', effect1);
    // track(product2, 'price', effect2);

    expect(total).toEqual(10);

    product.price = 6;
    // trigger(product, 'price');
    expect(total).toEqual(12);

    product.price = 12;
    // trigger(product, 'price');
    expect(total).toEqual(24);
  });

  it('test ref', () => {
    const foo = ref(5);

    expect(foo.value).toEqual(5);
    foo.value = 1;
    expect(foo.value).toEqual(1);
  });

  it('test computed', () => {
    const price = ref(5);
    const quantity = ref(2);
    const comp = computed(() => price.value * quantity.value);
    expect(comp.value).toEqual(10);

    price.value = 10;
    expect(comp.value).toEqual(20);

    quantity.value = 3;
    expect(comp.value).toEqual(30);
  });
});

// add proxy

/** Problem: Multiple Properties
     * 每一次改 product.price 都要 trigger
     */
/** Problem: Multiple Properties
     * 每一次改 product.price 都要 trigger
     */
