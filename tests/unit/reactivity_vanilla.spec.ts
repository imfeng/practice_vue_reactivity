/* eslint-disable @typescript-eslint/no-unused-vars */
import { getProduct, getProductAndGetTotalFn, getProductByAccessors, getProductByProxy, getProductByProxyForcePrice10, getProductHasPrivate, getStrongTypeProduct } from '../../src/practice/reactivity_vanilla';

describe('try to use reactive data in vanilla js', () => {
  it('verify total: simple calculate', () => {
    const { product, total } = getProduct(5, 2);

    expect(total).toEqual(10);

    // product.price = 20;
    // expect(total).toEqual(40); // failed
  });

  it('verify total: In function invoked', () => {
    const { product, getTotal } = getProductAndGetTotalFn(5, 2);
    expect(getTotal()).toEqual(10);

    product.price = 20;
    expect(getTotal()).toEqual(40);
    product.price = 30;
    expect(getTotal()).toEqual(60);
  });

  // https://ithelp.ithome.com.tw/articles/10197827
  it('verify total: In ES6 getter/setter Accessors descriptor', () => {
    const { product } = getProductByAccessors(5, 2);
    expect(product.total).toEqual(10);

    product.price = 20;
    expect(product.total).toEqual(40);
    product.price = 30;
    expect(product.total).toEqual(60);
  });

  it('verify total: In ES6 Proxy', () => {
    const { product } = getProductByProxy(5, 2);
    expect(product.total).toEqual(10);
    product.price = 20;
    expect(product.total).toEqual(40);
    product.price = 30;
    expect(product.total).toEqual(60);

    // TODO:
    // expect(targetProxy.rawValue).toEqual();
    // expect(targetProxy.value).toEqual();
  });

  it('test proxy: strong type', () => {
    const { product } = getStrongTypeProduct(5, 2);
    expect(product.total).toEqual(10);
    product.price = 20;
    expect(product.total).toEqual(40);

    expect(() => {
      product.price = '123';
    }).toThrow(TypeError);
  });

  it('test proxy: private properties and methods', () => {
    const { product } = getProductHasPrivate(5, 2);
    expect(product.quantity).toEqual(2);
    try {
      const price = product._price;
      fail('it should not reach here');
    } catch (error: any) {
      expect(error.message).toEqual('cannot access private properties!');
    }
  });

  it('test proxy: specical case', () => {
    const { product, productProxy, productUseReflect } = getProductByProxyForcePrice10(5, 2);
    // expect(product.price).toEqual(5);
    // expect(productProxy.price).toEqual(10);
    // expect(productUseReflect.price).toEqual(10);

    // expect(product.total).toEqual(10);
    // expect(productProxy.getTotal()).toEqual(10);
    // expect(productUseReflect.total).toEqual(20);

    // expect(product.getTotal()).toEqual(10);
    // expect(productProxy.getTotal()).toEqual(20); // ??
    // expect(productUseReflect.getTotal()).toEqual(20);
  });
});
