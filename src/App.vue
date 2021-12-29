<template>
    <div class="app">

        <!-- Composition API Chap 1: Setup -->
        <Setup
            msg="I am Setup"
            attr1="123"
            attr2="456"
            v-on:customEvent="onSetupCustomEvent($event)"
        >
            <template v-slot:slot1>
                <p>SLOT1</p>
            </template>
            <template v-slot:slot2>
                <p>SLOT2</p>
            </template>

        </Setup>
        <p>App: setupCustomEvent = {{ setupCustomEvent }}</p>

        <hr>

        <!--  -->
        <!-- <Properties></Properties> -->

        <!-- <Modularizing></Modularizing> -->
        <Reactivity></Reactivity>
    <!-- <Lifecycle /> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import Basic from './components/Basic.vue';
import Modularizing from './components/Composition/Modularizing.vue';
import Properties from './components/Composition/Properties.vue';
import Reactivity from './components/Composition/Reactivity.vue';
import Setup from './components/Composition/Setup.vue';
import Lifecycle from './components/Lifecycle.vue';
const components = {
  Setup,
  Basic,
  Lifecycle,
  Properties,
  Modularizing,
  Reactivity
};
export default defineComponent({
  name: 'App',
  components,
  props: {
    msg: {
      type: String,
      default: () => ''
    }
  },
  setup() {
    const triggerBasic = (e: any) => {
      console.log('triggerBasic', e);
    };

    const testattr = ref(1);
    const testattrFunc = () => {
      testattr.value += 1;
    };

    const setupCustomEvent = ref({});
    const onSetupCustomEvent = (e: any) => {
      console.log('onSetupCustomEvent', e);
      setupCustomEvent.value = e;
    };
    return {
      onSetupCustomEvent,
      setupCustomEvent,
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
