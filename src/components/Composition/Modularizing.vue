<template>
    <div class="basic">
        <h1>Modularizing Component</h1>
        <pre>capacity = {{ capacity }}</pre>
        <pre>attending = {{ attending }}</pre>
        <pre>spacesLeft = {{ spacesLeft }}</pre>

        <div class="control">
            <button v-on:click="increaseCapacity()">
                increaseCapacity
            </button>
            <div class="attend-ctrl">

                <label for="attending"></label>
                <input v-model="inputAttend" type="text">
                <button v-on:click="addAttending()">
                    add attending
                </button>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useMovieSpace } from './useMovieSpace';
export default defineComponent({
  name: 'Modularizing',
  props: {
    msg: {
      type: String,
      default: () => ''
    }
  },
  setup() {
    console.log('=========== START Modularizing COMPONENT ==========');
    // const capacity = ref(4);
    // const attending = ref(['Bell', 'Louis', 'Felix']);
    // const inputAttend = ref('');

    // const spacesLeft = computed(() => {
    //   return capacity.value - attending.value.length;
    // });
    // function increaseCapacity() {
    //   capacity.value++;
    // }

    // function addAttending() {
    //   const attend = inputAttend.value?.trim();
    //   if (!attend || attending.value.find(v => v.toLowerCase() === attend.toLowerCase())) {
    //     return alert('輸入錯誤');
    //   }
    //   attending.value.push(attend);
    // }

    const {
      capacity, attending, spacesLeft, inputAttend,
      increaseCapacity, addAttending
    } = useMovieSpace(6);

    console.log('=========== END Modularizing COMPONENT ==========');
    return { capacity, attending, spacesLeft, inputAttend, increaseCapacity, addAttending };
  }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
