<template>
    <div class="LifeCycleErrorExample">
        <button v-on:click="triggerError">
            Trigger ERROR
        </button>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const triggerError = () => {
      console.log('triggerError!!');
      throw new Error('triggerError!!');
    };

    return {
      triggerError
    };
  }
});
</script>

<style>

</style>
