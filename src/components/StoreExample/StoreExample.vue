<template>
    <div class="store-example">
        <hr>
        <h3>Name: {{ name }}
            <button v-on:click="updateCounter(-1)">
                -
            </button>
            <button v-on:click="updateCounter(1)">
                +
            </button>
        </h3>
        <p class="local-counter">
            counter: {{ temp.counter }}
        </p>
        <p class="global-counter">
            global counter: {{ globalCounter }}
        </p>
        <!-- <pre>{{ temp }}</pre> -->

        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue';
import { useGlobalStore } from '../../store/GlobalStore';

export default defineComponent({
  name: 'StoreExample',
  //   components: {
  //     StoreExampleSub
  //   },
  props: {
    name: {
      type: String,
      default: () => ''
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { counter: globalCounter, updateCounter: updateGlobalCounter } = useGlobalStore;
    const temp = ref({
      name: props.name,
      data: props.data,
      counter: 0
    });
    const updateCounter = (num: number) => {
      temp.value.counter += num;
      updateGlobalCounter(num);
    };
    provide('StoreExampleProvide', temp);
    return {
      temp,
      updateCounter,
      globalCounter,
      updateGlobalCounter
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
button {
  font-size: 1.5rem;
  width: 50px;
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
