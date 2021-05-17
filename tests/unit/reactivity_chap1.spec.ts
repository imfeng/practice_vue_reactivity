import {
  useProduct, useProduct2, useProduct3,
  useProduct4, useReactiveUtil
} from '../../src/practice/reactivity_chap1';
describe('Reactivity chapter 1', () => {
  it('simple effect', () => {
    const { product, effect } = useProduct(5, 2);
    expect(product.total).toEqual(10);

    product.price = 20;
    effect();
    expect(product.total).toEqual(40);

    product.price = 30;
    effect();
    expect(product.total).toEqual(60);
  });

  it('can use multiple `effects`, and all should get re-run when value change', () => {
    const { product, setPrice } = useProduct2(5, 2);
    expect(product.total).toEqual(10);
    expect(product.onSaleTotal).toEqual(8);

    setPrice(20);
    expect(product.total).toEqual(40);
    expect(product.onSaleTotal).toEqual(32);

    setPrice(30);
    expect(product.total).toEqual(60);
    expect(product.onSaleTotal).toEqual(48);
  });

  it('can use multiple `Properties`, and all should get re-run when value change', () => {
    const { product, track, trigger, effect, effect2 } = useProduct3(5, 2);

    track('price', effect);
    track('price', effect2);

    expect(product.total).toEqual(10);
    expect(product.onSalePrice).toEqual(4);

    product.price = 10;
    expect(product.total).toEqual(10);
    expect(product.onSalePrice).toEqual(4);
    trigger('price');
    expect(product.total).toEqual(20);
    expect(product.onSalePrice).toEqual(8);
  });

  it('can use multiple reactive object', () => {
    // arr: Array<{price: number, quantity: number}>
    const { product: product1, effect: effect1 } = useProduct4(5, 2);
    const { product: product2, effect: effect2 } = useProduct4(10, 3);
    const { track, trigger } = useReactiveUtil();

    track(product1, 'price', effect1);
    track(product2, 'price', effect2);

    expect(product1.total).toEqual(10);
    expect(product2.total).toEqual(30);

    product1.price = 6;
    trigger(product1, 'price');
    expect(product1.total).toEqual(12);

    product2.price = 12;
    trigger(product2, 'price');
    expect(product2.total).toEqual(36);
  });
});

// add proxy

/** Problem: Multiple Properties
     * 每一次改 product.price 都要 trigger
     */
/** Problem: Multiple Properties
     * 每一次改 product.price 都要 trigger
     */
