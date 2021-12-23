import { ref } from 'vue';
import { defineStore } from '@/store/store';

const counter = ref(0);
const updateCounter = (num: number) => {
  counter.value += num;
};

export const useGlobalStore = {
  counter,
  updateCounter
};

// const initGlobalStore = () => {
//   const counter = ref(0);
//   const updateCounter = (num: number) => {
//     counter.value += num;
//   };
//   return {
//     counter,
//     updateCounter
//   };
// };
// export const useGlobalStore = initGlobalStore();

// export const useGlobalStore = defineStore('global', () => {
//   const counter = ref(0);
//   const updateCounter = (num: number) => {
//     counter.value += num;
//   };
//   return {
//     counter,
//     updateCounter
//   };
// });
