<template>
    <div class="app">
        <button
            v-on:click="testattrFunc"
        >testattrFunc {{ testattr }}</button>
        <Basic
            v-bind:msg="'setup tutorial'"
            v-bind:testattr="testattr"
            v-bind:num="testattr"
            v-on:customEvent="triggerBasic($event)"
        >
            <!-- <template v-slot:slot1>
                <h1>HI</h1>
            </template> -->
        </Basic>
    <!-- <Lifecycle /> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Basic from './components/Basic.vue';
import Lifecycle from './components/Lifecycle.vue';

export default defineComponent({
  name: 'App',
  components: {
    Basic,
    Lifecycle
  },
  setup() {
    const triggerBasic = (e: any) => {
      console.log('triggerBasic', e);
    };

    const testattr = ref(1);
    const testattrFunc = () => {
      testattr.value += 1;
    };
    return {
      testattr,
      testattrFunc,
      triggerBasic
    };
  }
});
</script>

<style lang="scss">
body {
  background-color: rgb(238, 238, 238);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;

}
pre {
    text-align: left;
}
.content {
  padding-left: 2rem;
}
h3 {
  color:rgb(49, 49, 49);
  margin: 40px 0 0;
}

.local-counter {
  color: rgb(34, 34, 55);
}
.global-counter {
  color: rgb(7, 27, 126);
}

.flex-box {
  width: 100vw;
  display: flex;
  .store-example {
    flex: 1;
  }
}
</style>
