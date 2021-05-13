
describe('try to use reactive data in vanilla js', () => {
  it('valid total', () => {
    const product = { price: 5, quantity: 2 };
    const total = product.price * product.quantity;

    expect(total).toEqual(10);

    product.price = 20;
    // expect(total).toEqual(40); // failed
  });

  it('valid total: In function invoked', () => {
    const product = { price: 5, quantity: 2 };
    const getTotal = () => product.price * product.quantity;

    expect(getTotal()).toEqual(10);

    product.price = 20;
    expect(getTotal()).toEqual(40);
  });

  // https://ithelp.ithome.com.tw/articles/10197827
  it('valid total: In ES6 getter/setter Accessors descriptor', () => {
    // note: or Object.defineProperty
    const product = {
      price: 5,
      quantity: 2,
      get total () {
        return this.price * this.quantity;
      }
    };
    expect(product.total).toEqual(10);

    product.price = 20;
    expect(product.total).toEqual(40);

    /**
     * equal to below
     */
    // Object.defineProperty(product, 'total', {
    //   get () {
    //     return this.price * this.quantity;
    //   }
    // });
  });
});
