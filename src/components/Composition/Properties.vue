<template>
    <div class="basic">
        <h1>Properties Component</h1>
        <pre>count = {{ count }}</pre>
        <pre>countComputed = {{ countComputed }}</pre>
        <pre>countReactive = {{ countReactive }}</pre>
        <pre>cnt = {{ cnt }}</pre>
        <pre>others = {{ others }}</pre>

        <pre>countReadOnly = {{ countReadOnly }}</pre>

        <pre>cnt = {{ cnt }}</pre>
        <pre>others = {{ others }}</pre>

        <div class="control">
            <button v-on:click="addCount()">
                addCount
            </button>
        </div>

        <pre>customCount = {{ customCount }}</pre>
        <p>customeComputed = {{ customeComputed }}</p>
    </div>
</template>

<script lang="ts">
import { computed, customRef, defineComponent, reactive, readonly, ref, toRefs, watch, watchEffect } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: () => ''
    }
  },
  setup() {
    console.log('=========== START Properties COMPONENT ==========');
    const count = ref(0);

    const countComputed = computed(() => count.value * 2);
    const countReactive = reactive({
      cnt: 0, /// => const cnt = ref(...)
      others: 0
    });

    const countReadOnly = readonly({ cnt: 0 });

    const customCount = useDebouncedRef(0, 1000);
    const customeComputed = computed(() => {
      return customCount.value;
    });

    const a = toRefs(countReactive);
    a.cnt.value += 1;
    const addCount = () => {
      count.value++;
      // countReactive.cnt++;
      // a.cnt.value += 1;
      countReactive.others++;
      customCount.value++;
      console.log('customCount.value', customCount.value);
      // countReadOnly.cnt++;
    };

    console.log('=========== END Properties COMPONENT ==========');
    return {
      count, // ref
      countComputed,
      countReactive,
      countReadOnly,
      customCount,
      addCount,
      ...toRefs(countReactive),

      customeComputed

    };
  }
});

function useDebouncedRef(value: number, delay = 200) {
  return customRef((track, trigger) => {
    const timeout = ref(0);
    return {
      get() {
        track(); // 訂閱事件，當 set 發生時 去call 自己當前的 effect (computed function)
        return value;
      },
      set(newValue: number) {
        clearTimeout(timeout.value);
        timeout.value = setTimeout(() => {
          value = newValue;
          trigger(); // trigger
        }, delay);
      }
    };
  });
}

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
