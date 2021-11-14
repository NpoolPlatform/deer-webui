<template>
  <div class="ui icon input container row">
    <div>
      <q-card class="good-poster" bordered>
        <q-card-section class="good-poster-poster">
          <q-carousel
            swipeable
            animated
            v-model="slide"
            infinite
            dense
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

        <q-card-actions>
          <q-btn dense flat round color="red" icon="favorite" />
          <q-btn dense flat round color="teal" icon="bookmark" />
          <q-btn dense flat round color="primary" icon="share" />
          <q-btn dense flat round color="accent" icon="camera_indoor" />
          <q-btn dense flat round color="positive" icon="compare" />
          <q-space />
          <q-btn flat icon="error_outline" color="red"></q-btn>
        </q-card-actions>
      </q-card>

      <q-btn class="large-amount-deal-btn" rounded>{{ $t('BUTTON.LARGE_AMOUNT_DEAL_HINT') }}</q-btn>
    </div>

    <div class="good-poster-info">
      <div class="row">
        <img avatar :src="good.coinlogo" class="good-poster-coin-logo" />
        <div class="good-title">
          <div class="q-mb-xs row good-title">
            {{ good.title }}
            <p class="good-poster-title-parameter">
              {{ good.amount }}{{ good.unit }} {{ good.duration }}{{ $t('GENERAL.DAYS') }}
            </p>
          </div>
        
          <div class="row no-wrap items-center">
            <q-rating size="18px" v-model="stars" :max="5" color="primary" />
            <span class="text-caption text-grey q-ml-sm">{{ good.rating }} ({{ good.rateCount }})</span>
          </div>
        </div>
      </div>

      <div class="good-price row">
        <p class="good-power-price good-price-label">{{ $t('GENERAL.RENT_FEE') }}</p>
        <p class="good-power-price good-power-price-symbol">{{ good.pricecurrencychar }}</p>
        <p class="good-power-price good-power-price-price">{{ good.price }}</p>
        <p class="good-power-price good-price-label">{{ $t('GENERAL.MAINTAINANCE_FEE') }}</p>
        <p class="good-power-price good-power-price-fee">10%</p>
        <p class="good-power-price good-price-label">{{ $t('GENERAL.POWER_FEE') }}</p>
        <p class="good-power-price good-power-price-symbol">{{ good.pricecurrencychar }}</p>
        <p class="good-power-price good-power-power-fee">2.66/</p>
        <p class="good-power-price good-power-power-fee-days">{{ $t('GENERAL.DAYS') }}</p>
      </div>
    </div>
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
      return this.good.posters.slice(0, Math.min(4, this.good.posters.length))
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

.large-amount-deal-btn
  color: $grey-6
  width: 500px
  margin-top: 20px
  margin-bottom: 20px

.good-poster-title-parameter
  margin-left: 10px
  font-size: 16px
  color: $grey-7

.good-poster-coin-logo
  width: 60px
  height: 60px
  margin-right: 10px

.good-poster-info
  margin-left: 20px
  flex: 1

.good-title
  font-weight: bold
  flex: 1
  line-height: 40px
  font-size: 20px
  height: 40px
  margin: 0

.good-price
  background-color: $grey-2
  margin-top: 20px
  margin-bottom: 20px
  padding-left: 40px

.good-power-price
  text-align: center
  line-height: 60px
  margin: 0

.good-power-price-symbol
  font-weight: bold
  line-height: 50px
  font-size: 20px

.good-power-price-price
  font-weight: bold
  font-size: 36px
  color: $orange-10
  width: 200px
  text-align: left

.good-price-label
  color: $grey-7
  margin-right: 10px

.good-power-price-fee
  font-weight: bold
  font-size: 24px
  color: $grey-8
  width: 200px
  text-align: left

.good-power-power-fee
  font-weight: bold
  font-size: 24px
  color: $grey-8

.good-power-power-fee-days
  font-size: 14px
  color: $grey-7
  margin-top: 4px
  height: 46px
</style>
