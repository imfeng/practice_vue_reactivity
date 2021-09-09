<template>
    <div class="store-example-sub">
        <hr>
        <h3>Name: {{ name }}</h3>
        <!-- <pre>{{ temp }}</pre> -->
        <p class="local-counter">
            counter: {{ temp.counter }}
        </p>
        <p class="global-counter">
            global counter: {{ globalCounter }}
        </p>
        <!-- <button v-on:click="updateCounter(-1)">
            -
        </button>
        <button v-on:click="updateCounter(1)">
            +
        </button> -->
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { useGlobalStore } from '../../store/GlobalStore';

export default defineComponent({
  name: 'StoreExampleSub',

  props: {
    name: {
      type: String,
      default: () => ''
    }
  },
  setup() {
    const temp = inject('StoreExampleProvide', { });
    const { counter: globalCounter, updateCounter: updateGlobalCounter } = useGlobalStore;
    // const updateCounter = (num: number) => {
    //   updateGlobalCounter(num);
    // };

    return {
      temp,
      globalCounter
      // updateCounter
    };
  }
});
</script>
