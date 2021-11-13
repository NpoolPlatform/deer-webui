<template>
  <div style="width: 100%;">
    <div>
      <input type="text" :placeholder="$t('GENERAL.SEARCH_INTERESTING')" />
    </div>
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6 q-mb-xs">Our Changing Planet</div>
        <div class="row no-wrap items-center">
          <q-rating size="18px" v-model="stars" :max="5" color="primary" />
          <span class="text-caption text-grey q-ml-sm">4.2 (551)</span>
        </div>
      </q-card-section>

      <img src="https://cdn.quasar.dev/img/mountains.jpg">
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'GoodCard',
  props: {
    good: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      stars: ref(4)
    }
  },
})
</script>

<style scoped>

</style>
