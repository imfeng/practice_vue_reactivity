import { computed, ref } from 'vue';

export function useMovieSpace(_capacity: number) {
  const capacity = ref(_capacity);
  const attending = ref(['Bell', 'Louis', 'Felix']);
  const inputAttend = ref('');

  const spacesLeft = computed(() => {
    return capacity.value - attending.value.length;
  });
  function increaseCapacity() {
    capacity.value++;
  }

  function addAttending() {
    const attend = inputAttend.value?.trim();
    if (!attend || attending.value.find(v => v.toLowerCase() === attend.toLowerCase())) {
      return alert('輸入錯誤');
    }
    attending.value.push(attend);
    inputAttend.value = '';
  }

  return { capacity, attending, spacesLeft, inputAttend, increaseCapacity, addAttending };
}
