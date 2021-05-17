// reactivity: effects list
const dep = new Set<Function>();
let activeEffect: Function | null = null;
const effect = (eff: Function) => {
  activeEffect = eff;
  activeEffect();
};

function track () {
  dep.add(effect);
}

function trigger () {
  dep.forEach((effect) => {
    effect();
  });
}
describe('Reactivity v1', () => {
  it('test effect function', () => {
    const product = { price: 5, quantity: 2 };
    const total = 0;

    track(); // run it later
    expect(total).toEqual(10);

    product.price = 20;
    trigger(); // set 後觸發變化
    expect(total).toEqual(40);

    product.price = 30;
    trigger(); // set 後觸發變化
    expect(total).toEqual(60);

    // add proxy

    /** Problem: Multiple Properties
     * 每一次改 product.price 都要 trigger
     */
    /** Problem: Multiple Properties
     * 每一次改 product.price 都要 trigger
     */
  });
});
