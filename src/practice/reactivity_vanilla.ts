
export function getProduct(price: number, quantity: number) {
  const product = { price, quantity };
  const total = product.price * product.quantity;

  return {
    product,
    total
  };
}

export function getProductAndGetTotalFn(price: number, quantity: number) {
  const product = { price, quantity };
  const getTotal = () => product.price * product.quantity;

  return {
    product,
    getTotal
  };
}

export function getProductByAccessors(price: number, quantity: number) {
  const product = {
    price,
    quantity,
    get total() {
      return this.price * this.quantity;
    }
  };
  // note: or Object.defineProperty
  //   Object.defineProperty(product, 'total', {
  //     get: function () {
  //       return this.price * this.quantity;
  //     }
  //   });

  return {
    product
  };
}

// https://blog.techbridge.cc/2018/05/27/js-proxy-reflect/
export function getProductByProxy(price: number, quantity: number) {
  const product: any = {
    price,
    quantity
  };
  const productProxy = new Proxy(product, {
    get: function(target: any, propKey: any, receiver) {
      switch (propKey) {
        case 'total':
          return target.price * target.quantity;
        default:
          return target[propKey];
      }
      // if (propKey in target) {
      //   return target[propKey];
      // } else {
      //   throw new ReferenceError('Prop name "' + propKey + '" does not exist.');
      // }
    }
  });

  return {
    product: productProxy
  };
}

// 攔截和監視外部對對象的訪問
// 1. 使用Proxy保障數據類型的準確性
export function getStrongTypeProduct(price: any, quantity: any) {
  const product = {
    price,
    quantity,
    get total() {
      return this.price * this.quantity;
    }
  };
  const typeValidator: any = {
    price: 'number',
    quantity: 'number'
  };
  const productProxy = new Proxy(product, {
    set: function(target: any, propKey: string, value: any, receiver) {
      if (typeValidator[propKey] && typeof value !== typeValidator[propKey]) {
        return false; // Type Error
        // throw new Error('Input value type invalid!');
      }
      target[propKey] = value;
      return true;
    }
  });
  return {
    product: productProxy
  };
}

// 2. private properties
export function getProductHasPrivate(price: any, quantity: any) {
  const product = {
    _price: price,
    quantity,
    get total() {
      return this._price * this.quantity;
    }
  };
  const productProxy = new Proxy(product, {
    get(target: any, propKey: string) {
      if (propKey[0] === '_') {
        throw new Error('cannot access private properties!');
      }
      return target[propKey];
    }
  });
  return {
    product: productProxy
  };
}

// special case
export function getProductByProxyForcePrice10(price: any, quantity: any) {
  class Product {
        public price = 0;
        public quantity = 0;
        constructor(_price: any, _quantity: any) {
          this.price = _price;
          this.quantity = _quantity;
        }

        get total(): any {
          console.log('getter Total');
          return this.price * this.quantity;
        }

        getTotal() {
          console.log('getTotal Func');
          return this.price * this.quantity;
        }

        public arrowTotal = () => {
          console.log('arrowTotal Func');
          return this.price * this.quantity;
        }
  }
  const product = new Product(price, quantity);
  //   const product = {
  //     price,
  //     quantity,
  //     get total() {
  //       console.log('getter Total');
  //       return this.price * this.quantity;
  //     },
  //     getTotal() {
  //       console.log('getTotal Func');
  //       return this.price * this.quantity;
  //     },
  //     arrowTotal() {
  //       console.log('arrowTotal Func');
  //       return this.price * this.quantity;
  //     }
  //   };

  const productProxy = new Proxy(product, {
    get(target: any, propKey: string, receiver: any) {
      if (propKey === 'price') {
        return 10;
      }
      console.log(`productProxy get: ${propKey}`);

      const raw = target[propKey];
      console.log(`productProxy get: target[propKey]: ${propKey} `, raw); // this in foo getter references "target" - logs 3

      const refl = Reflect.get(target, propKey, receiver); // equal receiver[propKey]
      console.log(`productProxy get: Reflect.get: ${propKey} `, refl); // this in foo getter references Proxy instance; logs 2
      //   if (typeof target[propKey] === 'function') {
      //     return target[propKey].bind(product);
      //   }
      return raw;
    //   return Reflect.get(target, propKey, receiver);
    }
  });
  const productUseReflect = new Proxy(product, {
    get(target: any, propKey: string, receiver: any) {
    //   console.log(`productProxy get: ${propKey}`);
    //   console.log(`target[propKey]: ${propKey} `, target[propKey]); // this in foo getter references "target" - logs 3
    //   console.log(`Reflect.get: ${propKey} `, Reflect.get(target, propKey, receiver)); // this in foo getter references Proxy instance; logs 2
      if (propKey === 'price') {
        return 10;
      }
      return Reflect.get(target, propKey, receiver);
    }
  });
  return {
    product,
    productProxy,
    productUseReflect
  };
}
