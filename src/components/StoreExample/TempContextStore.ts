import { defineContextStore } from '@/store/store';

export const {
  provideStore: provideTempContextStore,
  injectStore: useTempContextStore
} = defineContextStore('Temp', () => {
  const data = {
    a: 'foo',
    b: 'bar',
    count: 0
  };
  return data;
});
