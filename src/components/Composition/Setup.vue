<template>
    <div class="basic">
        <h1>SETUP Component</h1>
        <pre>props.msg = {{ msg }}</pre>
        <pre>props.attr1 = {{ attr1 }}</pre>
        <pre>attrs = {{ attrs }}</pre>
        <pre>slots = {{ Object.keys(slots) }}</pre>

        <div class="control">
            <button v-on:click="triggerCustomEvent()">
                triggerCustomEvent
            </button>
        </div>
        <slot name="slot1"></slot>
        <!-- <slot name="slot2"></slot> -->
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
    attr1: {
      type: Number,
      default: () => 0
    }
  },
  setup(props, context) { // created
    console.log('=========== START SETUP COMPONENT ==========');
    console.log(`props.msg=${props.msg}`);

    console.log('attrs=', context.attrs);
    console.log('slots=', context.slots);
    console.log('context.emit=', context.emit);

    const attrs = computed(() => context.attrs);
    const slots = computed(() => context.slots);

    const triggerCustomEvent = () => {
      const e = { customEvent: Math.random() };
      console.log('triggerCustomEvent', e);
      context.emit('customEvent', e);
    };
    console.log('=========== END SETUP COMPONENT ==========');
    return {
      attrs,
      slots,
      triggerCustomEvent
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
