<template>
    <div class="LifeCycleExample">
        <hr>
        <h3>{{ name }}</h3>
        <button v-on:click="updateData" class="updateButton">
            點擊更新 component 數據
        </button>
        <a>{{ componentMsg }}</a>
        <LifeCycleErrorExample></LifeCycleErrorExample>
    </div>
</template>

<script>
import {
  defineComponent, ref,
  onUnmounted,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onActivated,
  onDeactivated,
  onErrorCaptured
} from 'vue';
import LifeCycleErrorExample from './LifeCycleErrorExample.vue';
import { computed } from '@/practice/reactivity_chap2';

export default defineComponent({
  name: 'LifeCycleExample',
  components: {
    LifeCycleErrorExample
  },
  props: {
    name: {
      type: String,
      default: () => ''
    }
  },
  setup(props) {
    const componentMsg = ref(0);
    const computedVar = computed(() => 123);
    const updateData = () => {
      componentMsg.value++;
    };

    const debug = (methods) => {
      console.log(`${props.name} ${methods}: this 為：`, this);
      console.log(`${props.name} ${methods}: computedVar 為：`, computedVar.value);
      console.log(`${props.name} ${methods}: componentMsg 為：`, componentMsg.value);
      console.log(`${props.name} ${methods}: <a> 內容為：${document.querySelector('.LifeCycleExample a')?.innerText}, componentMsg : ${componentMsg.value} `); // 數據已更新，DOM 已重新渲染，<a> 內容為： num+1
      console.log('------------------');
    };

    onBeforeMount(() => {
      // debug('onBeforeMounted');
      console.log(`${props.name} onBeforeMounted: this 為：`, this);
      console.log(`${props.name} onBeforeMounted: computedVar 為：`, computedVar.value);
      console.log(`${props.name} onBeforeMounted: componentMsg 為：`, componentMsg.value);
      console.log(`${props.name} onBeforeMounted: <a> 內容為：${document.querySelector('.LifeCycleExample a')?.innerText}, componentMsg : ${componentMsg.value} `); // 數據已更新，DOM 已重新渲染，<a> 內容為： num+1
      console.log('------------------');
    });
    onMounted(() => {
      debug('mounted');
    });
    onBeforeUpdate(() => {
      debug('onBeforeUpdate');
    });
    onUpdated(() => {
      debug('updated');
    });
    onBeforeUnmount(() => {
      debug('onBeforeUnmount');
    });
    onUnmounted(() => {
      debug('unmounted');
    });
    onActivated(() => {
      debug('onActivated');
    });
    onDeactivated(() => {
      debug('onDeactivated');
    });
    onErrorCaptured((err, instance, info) => {
      console.log({ err, instance, info });
      debug('onErrorCaptured');
    });
    return {
      componentMsg,
      updateData
    };
  }
});
</script>

<style>
.LifeCycleExample a {
    font-size: 1.5rem;
    padding: 1rem;
}
</style>
