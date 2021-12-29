import { ref } from 'vue';

export default function useCapacity() {
  const capacity = ref(0);
  const increaseCapacity = () => {
    capacity.value++;
  };

  return {
    capacity,
    increaseCapacity
  };
}
