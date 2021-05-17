import { isReactive, nextTick, reactive, ref, watch } from 'vue';
import { once } from '../../src/utils/once';
import { effect } from '../ref/ref';
jest.setTimeout(30000);

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const foo = ref(1);
    effect(() => {
      foo.value = 2;
    });
    expect(foo.value).toEqual(2);
  });
});

describe('watch reactivity', () => {
  it('trigger in same time', async () => {
    let count = 0;
    const foo = ref('a');
    watch(foo, () => {
      count += 1;
    }, {
      immediate: true
    });
    expect(count).toEqual(1);

    foo.value = 'b';
    await nextTick();
    expect(count).toEqual(2);

    foo.value = 'c';
    await nextTick();
    foo.value = 'd';
    await nextTick();
    expect(count).toEqual(4);
  });

  it('watch handler use async function', async () => {
    const fakeApiProxy = <T>(response: T, time: number): Promise<T> => new Promise((resolve) => {
      setTimeout(() => resolve(response), time);
    });
    const oddsMap: any = {
      0: null,
      1: 1.23,
      2: 2.34,
      3: 3.45
    };
    const match = reactive({
      id: 0
    });
    const odds = ref<number | null>(null);
    const loading = ref(false);
    watch(match, async (newMatch) => {
      loading.value = true;
      odds.value = await fakeApiProxy(oddsMap[newMatch.id], Math.random() * 1000);
      loading.value = false;
    });

    match.id = 1;
    await nextTick();

    await once(loading, val => val === false);
    expect(odds.value).toEqual(1.23);

    // match.id = 2;
    // await nextTick();
    // match.id = 3;
    // await nextTick();

    // await once(loading, val => val === false);
    // expect(odds.value).toEqual(3.45);
  });
});

describe('Edge cases', () => {
  it('a reactive for array of object', () => {
    const obj: any = {};
    // const obj: any = reactive({});
    const arr = reactive([obj]);
    expect(arr.indexOf(obj)).toEqual(0);
    expect(isReactive(obj)).toEqual(false);

    obj.other = 123;
    console.log(arr);
  });
});
