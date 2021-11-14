<template>
  <div class="justify-center row">
    <good-card :goodId="goodId"></good-card>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import GoodCard from '../components/GoodCard.vue'

export default defineComponent({
  name: 'Good',
  components: {
    GoodCard
  },
  methods: {
  },
  computed: {
    goodId: function () {
      return this.$route.params.goodId
    }
  }
})
</script>

<style lang="sass" scoped>
</style>