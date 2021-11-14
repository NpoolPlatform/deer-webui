<template>
  <div class="ui icon input container">
    <q-card class="good-poster" bordered>
      <q-card-section>
        <div class="text-h6 q-mb-xs">{{ good.title }}</div>
        <div class="row no-wrap items-center">
          <q-rating size="18px" v-model="stars" :max="5" color="primary" />
          <span class="text-caption text-grey q-ml-sm">{{ good.rating }} ({{ good.rateCount }})</span>
        </div>
      </q-card-section>

      <q-card-section class="good-poster-poster">
        <q-carousel
          swipeable
          animated
          v-model="slide"
          infinite
          dense
          navigation-position="bottom"
        >
          <q-carousel-slide
            v-for="(poster, index) in posters"
            :name="index"
            :key="index"
            :img-src="poster" />
        </q-carousel>

        <div class="justify-center row good-poster-thumbnail-container">
          <q-btn
            v-for="(poster, index) in posters"
            :key="index"
            dense
            @mouseenter="onMouseEnterThumbnail(index)">
            <img :src="poster" class="good-poster-thumbnail" />
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'GoodCard',
  props: {
    goodId: {
      type: String,
      required: true
    }
  },
  setup () {
    return {
      slide: ref(0)
    }
  },
  computed: {
    good: function () {
      return this.$store.state.good.goods[this.goodId]
    },
    stars: function () {
      return this.good.rating
    },
    posters: function () {
      return this.good.posters
    }
  },
  methods: {
    onMouseEnterThumbnail: function (index) {
      this.slide = index
    }
  }
})
</script>

<style lang="sass" scoped>
.container
  width: 100%
  padding: 0 100px 0 100px
  margin-top: 20px

.good-poster
  width: 500px

.good-poster-poster
  padding: 0

.good-poster-thumbnail-container
  margin-top: 10px
  margin-bottom: 10px

.good-poster-thumbnail
  width: 115px
</style>
