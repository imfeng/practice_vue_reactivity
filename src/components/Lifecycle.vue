<template>
    <div class="lifecycle">

    </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, onActivated, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onErrorCaptured, onMounted, onUnmounted, onUpdated, reactive, ref, toRefs, watch, watchEffect
} from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  setup(props, context) {
    onBeforeMount(() => {
      console.log('Before Mount!');
    });
    onMounted(() => {
      console.log('Mounted!');
    });
    onBeforeUpdate(() => {
      console.log('Before Update!');
    });
    onUpdated(() => {
      console.log('Updated!');
    });
    onBeforeUnmount(() => {
      console.log('Before Unmount!');
    });
    onUnmounted(() => {
      console.log('Unmounted!');
    });
    onActivated(() => {
      console.log('Activated!');
    });
    onDeactivated(() => {
      console.log('Deactivated!');
    });
    onErrorCaptured(() => {
      console.log('Error Captured!');
    });

    return {

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
