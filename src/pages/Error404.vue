<template>
  <div
    class="fullscreen bg-white text-black text-center q-pa-md flex flex-center"
  >
    <div>
      <q-icon
        color="black"
        name="no_transfer"
        style="font-size: 20vh; margin-bottom: 30px;"
      />

      <div class="text-h5">
        OOPS，这里什么都没有...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="返回搜索页"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Error404'
});
</script>
