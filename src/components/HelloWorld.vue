<template>
    <div class="hello">
        <!-- <h1>{{ msg }}</h1> -->
        <h1>Selected ID: {{ selectedId }}</h1>
        <br>
        <pre>
            {{ userDetail }}
        </pre>
        <hr>
        <div
            class="item"
            v-for="(item, idx) in userList"
            v-bind:key="idx"
            v-on:click="setId(item.id)"
        >
            <button>id = {{ item.id }}</button>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch, watchEffect } from 'vue';

type UserDetail = {
    id: number | null,
    level: number | null,
}
function delayData(data: UserDetail, time = 1000): {
    promise: Promise<UserDetail>,
    timeoutId: number
} {
  let timeoutId = 0;
  const p = new Promise((resolve) => {
    timeoutId = setTimeout(() => resolve(data), (data.id ?? 1) * time);
  });
  return {
    promise: p as Promise<UserDetail>,
    timeoutId
  };
}

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: () => ''
    }
  },
  setup() {
    const selectedId = ref(-1);
    const userDetail = ref<UserDetail>({
      id: null,
      level: null
    });

    const userList = ref(new Array(10).fill(0).map((_, i) => ({ id: i, level: i })));
    const setId = (id: number) => {
      selectedId.value = id;
    };

    // const tmp1 = ref(123);
    // const tmp2 = ref(2);

    // watchEffect(async(onInvalidate) => {
    //   const now = selectedId.value;
    //   console.log(`changed: ${now}`);
    //   const { promise, timeoutId } = delayData({
    //     id: now,
    //     level: now * tmp1.value * tmp2.value
    //   });
    //   onInvalidate(() => {
    //     console.log('onInvalidate! ', now);
    //     clearTimeout(timeoutId);
    //   });
    //   const result = await promise;
    //   console.log(`result: ${now}`);
    //   console.log(result.id);
    //   userDetail.value = result;
    // }, {
    //   onTrack(e) {
    //     debugger;
    //   },
    //   onTrigger(e) {
    //     debugger;
    //   }
    // });

    // watch(selectedId, async(newId, oldId, onInvalidate) => {
    //   // const now = selectedId.value;
    //   console.log(`changed: ${newId}`);
    //   const { promise, timeoutId } = delayData({
    //     id: newId,
    //     level: newId
    //   });
    //   onInvalidate(() => {
    //     console.log('onInvalidate! ', newId);
    //     clearTimeout(timeoutId);
    //   });
    //   const result = await promise;
    //   console.log(`result: ${newId}`);
    //   console.log(result.id);
    //   userDetail.value = result;
    // }, {
    //   onTrack(e) {
    //     debugger;
    //   },
    //   onTrigger(e) {
    //     debugger;
    //   }
    // });

    return {
      setId,
      userList,
      selectedId,
      userDetail
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
