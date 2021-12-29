<template>
    <div class="basic">
        <h1>{{ msg }},num=  {{ num }}</h1>
        <p>Capacity: {{ capacity }}</p>
        <p>watch Capacity: {{ subCapacity }}</p>

        <button v-on:click="increaseCapacity()">
            Increase Capacity
        </button>
        <!-- <slot name="slot1"></slot>
        <slot name="slot2"></slot> -->
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
  setup(props, { attrs, slots, emit }) {
    console.log(`props.num=${props.num}`);
    console.log(`props.msg=${props.msg}`);
    console.log('attrs=', attrs);
    console.log('slots=', slots);

    watch(attrs, (a, b) => {
      console.log('attr a=', a);
    });

    // ref data
    const capacity = ref(3);
    const subCapacity = ref(0);

    const attending = ref(['Felix', 'Bell', 'Apple']);
    // The Reactive Syntax
    // const event = reactive({
    //   capacity: 4,
    //   attending: ['Felix', 'Bell', 'Apple']
    // });

    // Methods
    const increaseCapacity = () => {
      capacity.value++;
      emit('customEvent', { foo: 'bar' });
    };
    function increaseCapacityN() {
      capacity.value++;
    }

    const capacity2 = ref(66);
    const obj = ref({
      a: {
        b: 123
      },
      c: 66
    });
    setTimeout(() => {
      // obj.value.a.b = 666;
      // obj.value.c = 77;
      obj.value = {
        a: {
          b: 666
        },
        c: 777
      };
      console.log('change');
    }, 5000);
    watch([capacity, obj], ([n1, n2], oldVal) => {
      subCapacity.value = n1;
      console.log(obj.value);
      console.log(`subCapacity=${subCapacity.value}`);
    }, {
      flush: 'pre',
      immediate: false,
      deep: false
      // onTrigger(e) {
      //   debugger;
      // },
      // onTrack(e) {
      //   debugger;
      // }
    });

    const stopWatch = watchEffect(() => {

    }, {
      flush: 'sync'

    });

    return {
      subCapacity,
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
