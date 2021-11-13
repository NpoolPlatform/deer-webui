<template>
  <div class="justify-center row">
    <good-card :good="good"></good-card>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import GoodCard from '../components/GoodCard.vue'

export default defineComponent({
  name: 'Good',
  props: {
    good: {
      type: Object,
      required: true
    }
  },
  components: {
    GoodCard
  },
  methods: {

  }
})
</script>

<style lang="sass" scoped>
</style>