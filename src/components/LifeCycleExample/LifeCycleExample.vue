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
import LifeCycleErrorExample from './LifeCycleErrorExample.vue';

export default {
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
  data() {
    return {
      componentMsg: 0
    };
  },
  computed: {
    computedVar: function() {
      return 123;
    }
  },
  beforeCreate() {
    // this.debug();
    console.log(`${this.$props.name} 創建之前，this 為：`, this);
    console.log(`${this.$props.name} 創建之前，this.data 為：`, this.$data);
    console.log(`${this.$props.name} 創建之前，this.props 為：`, this.$props);
    console.log(`${this.$props.name} 創建之前，this.computedVar 為：`, this.computedVar);
    console.log(`${this.$props.name} 創建之前，componentMsg 為：`, this.$data.componentMsg); // ${this.$props.name} 創建之前，componentMsg 為 undefined
    console.log('------------------');
  },
  created() {
    this.debug();
    console.log(`${this.$props.name} 創建完成，this 為：`, this);
    console.log(`${this.$props.name} 創建完成 this.data 為：`, this.$data);
    console.log(`${this.$props.name} 創建完成，this.props 為：`, this.props);
    console.log(`${this.$props.name} 創建之前，this.computedVar 為：`, this.computedVar);
    console.log(`${this.$props.name} 創建完成，componentMsg 為：`, this.$data.componentMsg); // ${this.$props.name} 創建完成，componentMsg 為： 0
    console.log('------------------');
  },
  beforeMount() {
    console.log(`${this.$props.name} DOM 掛載之前，this.$el 為：`, this.$el);
    console.log(`${this.$props.name} DOM 掛載之前，<a> 為：`, document.querySelector('.LifeCycleExample a'));
    console.log('------------------');
  },
  mounted() {
    const ele = document.querySelector('.LifeCycleExample a');
    console.log(`${this.$props.name} DOM 掛載完成，this.$el 為：`, this.$el);
    console.log(`${this.$props.name} DOM 掛載完成，<a> 為：`, document.querySelector('.LifeCycleExample a'));
    console.log('------------------');
  },
  beforeUpdate() {
    const ele = document.querySelector('.LifeCycleExample a');
    console.log(`${this.$props.name} 數據已更新，但 DOM 尚未重新渲染，<a> 內容為：${ele.innerText}`);
    // console.log(`${this.$props.name} 數據已更新，但 DOM 尚未重新渲染，<a> 內容為：${ele.innerText}, componentMsg : ${this.componentMsg}}} `);
    // this.$nextTick(() => {
    //   console.log(`${this.$props.name} beforeUpdate 的 nextTick <a> 內容為：${ele.innerText}, componentMsg : ${this.componentMsg} `); // 數據已更新，DOM 已重新渲染，<a> 內容為： num+1
    // });
    console.log('------------------');
  },
  updated() {
    const ele = document.querySelector('.LifeCycleExample a');
    console.log(`${this.$props.name} 數據已更新，DOM 已重新渲染，<a> 內容為：${ele.innerText}, componentMsg : ${this.componentMsg} `); // 數據已更新，DOM 已重新渲染，<a> 內容為： num+1
    console.log('------------------');
  },
  // 有使用 <keep-alive>，不會觸發 beforeDestroy 與 destroyed
  // 無使用 <keep-alive>，${this.$props.name} 會 destroyed
  // Vue2:  beforeDestroy()
  beforeUnmount() {
    console.log(`${this.$props.name} 被銷毀之前`);
    console.log(`${this.$props.name} 被銷毀之前，this 為：`, this);
    console.log(`${this.$props.name} 被銷毀之前，this.data 為：`, this.$data);
    console.log(`${this.$props.name} 被銷毀之前，this.props 為：`, this.$props);
    console.log(`${this.$props.name} 被銷毀之前，this.computedVar 為：`, this.computedVar);
    console.log(`${this.$props.name} 被銷毀之前，<a> 為：`, document.querySelector('.LifeCycleExample a'));
    console.log('------------------');
  },
  // Vue2: unmounted()
  unmounted() {
    console.log(`${this.$props.name} 被銷毀完成`);
    console.log(`${this.$props.name} 被銷毀完成，this 為：`, this);
    console.log(`${this.$props.name} 被銷毀完成，this.data 為：`, this.$data);
    console.log(`${this.$props.name} 被銷毀完成，this.props 為：`, this.$props);
    console.log(`${this.$props.name} 被銷毀完成，this.computedVar 為：`, this.computedVar);
    console.log(`${this.$props.name} 被銷毀完成，<a> 為：`, document.querySelector('.LifeCycleExample a'));
    console.log('------------------');
  },
  // 有使用 <keep-alive>，會觸發 activated 與 deactivated
  // 無使用 <keep-alive>，不會觸發 activated 與 deactivated
  activated() {
    console.log(`${this.$props.name} activated!`);
    console.log(`${this.$props.name} activated，this 為：`, this);
    console.log(`${this.$props.name} activated，this.data 為：`, this.$data);
    console.log(`${this.$props.name} activated，this.props 為：`, this.$props);
    console.log(`${this.$props.name} activated，this.computedVar 為：`, this.computedVar);
    console.log(`${this.$props.name} activated, <a> 為：`, document.querySelector('.LifeCycleExample a'));
    console.log('------------------');
  },
  deactivated() {
    console.log(`${this.$props.name} deactivated!`);
    console.log(`${this.$props.name} deactivated，this 為：`, this);
    console.log(`${this.$props.name} deactivated，this.data 為：`, this.$data);
    console.log(`${this.$props.name} deactivated，this.props 為：`, this.$props);
    console.log(`${this.$props.name} deactivated，this.computedVar 為：`, this.computedVar);
    console.log(`${this.$props.name} deactivated, <a> 為：`, document.querySelector('.LifeCycleExample a'));
  },
  errorCaptured(err, instance, info) {
    console.log(`== ${this.$props.name} errorCaptured ==`);
    console.log(err, instance, info);
    console.log('------------------');
  },

  methods: {
    debug() {
      console.log(`${this.$props.name} 呼叫 DEBUG`);
    },
    updateData() {
      this.componentMsg++;
    //   this.componentMsg++;
    }
  }
};
</script>

<style>
.LifeCycleExample a {
    font-size: 1.5rem;
    padding: 1rem;
}
</style>
