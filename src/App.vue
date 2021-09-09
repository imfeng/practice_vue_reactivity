<template>
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="live-cycle-cont">

        <button v-on:click="toggleLifeCycleExample">
            Normal LifeCycleExample
        </button>
        <button v-on:click="toggleLifeCycleExampleKeepAlive">
            Keep-alive LifeCycleExample
        </button>
        <!-- <LifeCycleExample

            v-bind:name="'Normal LifeCycleExample'"
            v-if="LifeCycleExample"
        ></LifeCycleExample>
        <KeepAlive>
            <LifeCycleExample v-bind:name="'Keep-alive LifeCycleExample'" v-if="LifeCycleExampleKeepAlive"></LifeCycleExample>
        </KeepAlive> -->
        <LifeCycleExampleV3

            v-bind:name="'Normal LifeCycleExampleV3'"
            v-if="LifeCycleExample"
        ></LifeCycleExampleV3>
        <KeepAlive>
            <LifeCycleExampleV3 v-bind:name="'Keep-alive LifeCycleExampleV3'" v-if="LifeCycleExampleKeepAlive"></LifeCycleExampleV3>
        </KeepAlive>
    </div>
    <!-- VUE STORE -->
    <!-- <div class="flex-box">
        <StoreExample name="1" v-bind:data="{ a: 'foo' }">
            <StoreExampleSub name="1-1">
                <StoreExampleSub name="1-1-1"></StoreExampleSub>
            </StoreExampleSub>
            <StoreExampleSub name="1-2"></StoreExampleSub>
        </StoreExample>
        <StoreExample name="2" v-bind:data="{ a: 'bar' }">
            <StoreExampleSub name="2-1"></StoreExampleSub>
            <StoreExampleSub name="2-2"></StoreExampleSub>
        </StoreExample>
    </div> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import LifeCycleExample from './components/LifeCycleExample/LifeCycleExample.vue';
import LifeCycleExampleV3 from './components/LifeCycleExample/LifeCycleExampleV3.vue';
import StoreExample from './components/StoreExample/StoreExample.vue';
import StoreExampleSub from './components/StoreExample/StoreExampleSub.vue';

export default defineComponent({
  name: 'App',
  components: {
    // HelloWorld,
    // StoreExample,
    // StoreExampleSub,
    LifeCycleExample,
    LifeCycleExampleV3
  },
  setup() {
    const LifeCycleExample = ref(false);
    const LifeCycleExampleKeepAlive = ref(false);

    const toggleLifeCycleExample = () => {
      LifeCycleExample.value = !LifeCycleExample.value;
    };
    const toggleLifeCycleExampleKeepAlive = () => {
      LifeCycleExampleKeepAlive.value = !LifeCycleExampleKeepAlive.value;
    };

    return {
      LifeCycleExample,
      LifeCycleExampleKeepAlive,
      toggleLifeCycleExample,
      toggleLifeCycleExampleKeepAlive
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
