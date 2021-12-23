<template>
    <div class="basic">
        <h1>{{ msg }}</h1>
        <p>Capacity: {{ capacity }}</p>

        <button v-on:click="increaseCapacity()">
            Increase Capacity
        </button>

    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs, watch, watchEffect } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: () => ''
    },
    num: {
      type: Number,
      default: () => 0
    }
  },
  setup(props, context) {
    console.log(props.num);
    console.log(props.msg);

    // ref data
    const capacity = ref(3);
    const attending = ref(['Felix', 'Bell', 'Apple']);
    // The Reactive Syntax
    // const event = reactive({
    //   capacity: 4,
    //   attending: ['Felix', 'Bell', 'Apple']
    // });

    // Methods
    const increaseCapacity = () => {
      capacity.value++;
    };
    function increaseCapacityN() {
      capacity.value++;
    }

    return {
      // ...toRefs(event),
      // event,
      capacity,
      attending,
      increaseCapacity,
      increaseCapacityN
    };
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
