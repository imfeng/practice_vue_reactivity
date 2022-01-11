<template>
    <div class="basic">
        <h1>Reactivity Component</h1>
        <pre>capacity = {{ capacity }}</pre>
        <pre>attending = {{ attending }}</pre>
        <pre>spacesLeft = {{ spacesLeft }}</pre>

        <div class="control">
            <button v-on:click="increaseCapacity()">
                increaseCapacity
            </button>
            <div class="attend-ctrl">

                <label for="attending"></label>
                <input v-model="inputAttend" type="text">
                <button v-on:click="addAttending()">
                    add attending
                </button>
                <p v-bind:class="[isValidName ? 'green' : 'red']">
                    loading = {{ isValidLoading }},
                    isValid = {{ isValidName }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, customRef, defineComponent, reactive, readonly, ref, toRefs, watch, watchEffect } from 'vue';
import { useMovieSpace } from './useMovieSpace';

async function delay(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

async function fakeApiValidAttending(name: string) {
  const validAttending = ['Bell', 'Louis', 'Felix', 'Una'].map(v => v.toLowerCase());
  if (name === 'Un') {
    await delay(2000);
  }
  await delay(1000);
  const result = validAttending.includes(name?.toLowerCase());
  return Promise.resolve(result);
}

const useFakeApiValidAttending = function(name: string) {
  const cancelRef = ref(() => {});
  const promise = new Promise((resolve, reject) => {
    cancelRef.value = reject;
    fakeApiValidAttending(name).then((r) => {
      resolve(r);
    });
  });

  return {
    cancelRef,
    promise
  };
};

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: () => ''
    }
  },
  setup(props, context) {
    console.log('=========== START Reactivity COMPONENT ==========');

    const {
      capacity, attending, spacesLeft, inputAttend,
      increaseCapacity, addAttending
    } = useMovieSpace(4);

    const isValidName = ref(false);
    const isValidLoading = ref(false);
    // watch(inputAttend, async(newVal, oldVal) => {
    //   isValidLoading.value = true;
    //   isValidName.value = await fakeApiValidAttending(newVal);
    //   isValidLoading.value = false;
    // });

    const stopFunc = watchEffect(async(onInvalidate) => {
      isValidLoading.value = true;
      isValidName.value = await fakeApiValidAttending(inputAttend.value);
      isValidLoading.value = false;

      if (isValidName.value) {
        stopFunc();
      }
    });

    console.log('=========== END Reactivity COMPONENT ==========');
    return {
      isValidName,
      isValidLoading,
      capacity,
      attending,
      spacesLeft,
      inputAttend,
      increaseCapacity,
      addAttending
    };
  }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.green {
  color: #42b983;
}
.red {
  color: rgb(174, 27, 27);
}
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

function useMovieSpace(arg0: number): { capacity: any; attending: any; spacesLeft: any; inputAttend: any; increaseCapacity: any; addAttending: any; } {
  throw new Error('Function not implemented.');
}

function useMovieSpace(arg0: number): { capacity: any; attending: any; spacesLeft: any; inputAttend: any; increaseCapacity: any; addAttending: any; } {
  throw new Error('Function not implemented.');
}
