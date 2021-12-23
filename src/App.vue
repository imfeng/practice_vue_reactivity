<template>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <div class="app">
        <Basic>
        <Lifecycle>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Basic from './components/Basic.vue';
import Lifecycle from './components/Life.vue';
import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
  name: 'App',
  components: {
    Basic,
    Lifecycle,
    // HelloWorld
  },
  setup() {
    return {

    };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
