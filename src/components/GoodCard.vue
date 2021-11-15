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

      <div class="good-parameter">
        <div class="row">
          <div class="good-parameter-label">{{ $t('GENERAL.MINER_HASH_POWER') }}</div>
          <div class="row">
            <div class="good-parameter-data">110</div>
            <div class="good-parameter-unit">TH/s</div>
          </div>
        </div>
        <div class="row">
          <div class="good-parameter-label">{{ $t('GENERAL.MINER_POWER_COMSUPTION') }}</div>
          <div class="row">
            <div class="good-parameter-data">3250</div>
            <div class="good-parameter-unit">W</div>
          </div>
        </div>
        <div class="row">
          <div class="good-parameter-label">{{ $t('GENERAL.MINER_POWER_EFFICIENCY') }}</div>
          <div class="row">
            <div class="good-parameter-data">29.5</div>
            <div class="good-parameter-unit">J/T</div>
          </div>
        </div>

        <div class="row good-production-types">
          <div class="good-production-types-label">{{ $t('GENERAL.PRODUCTION_COIN_TYPES') }}</div>
          <q-btn
            v-for="(coin, index) in good.supportedCoinTypes"
            :key="index"
            :label="coin"
            text-color="grey-9"
            :color="coinSelected[index] ? 'blue-4' : 'white'"
            dense
            @click="onCoinTypeClick(index)"
            class="good-production-types-coin"
          >
          </q-btn>
        </div>

        <div class="row good-production-types">
          <div class="good-production-types-label">{{ $t('GENERAL.COMBO_UNITS') }}</div>
          <q-btn
            :label="good.amount + ' ' + good.unit"
            text-color="grey-9"
            color="blue-4"
            dense
            class="good-production-spec"
          >
          </q-btn>
        </div>

        <div class="row good-production-types">
          <div class="good-production-types-label">{{ $t('GENERAL.GOOD_LABELS') }}</div>
          <q-badge
            v-for="badge in good.badges"
            :key="badge"
            :color="badgeColors[randomNumber() % badgeColors.length]"
            class="good-badge"
          >
            {{ badge }}
          </q-badge>
        </div>

        <div>
          <div class="row">
            <div class="good-production-detail-label">{{ $t('GENERAL.COMBO_DURATION') }}</div>
            <div class="good-production-detail-label">{{ $t('GENERAL.COMBO_START_TIME') }}</div>
            <div class="good-production-detail-label">{{ $t('GENERAL.POWER_FEE') }}</div>
          </div>
          <div class="row">
            <div class="good-production-detail-data">{{ good.duration }} {{ $t('GENERAL.DAYS') }}</div>
            <div class="good-production-detail-data">{{ $t('GENERAL.UNIQUE_START_TIME') }}</div>
            <div class="good-production-detail-data">$ 0.05/T/{{ $t('GENERAL.DAYS') }}</div>
          </div>
        </div>

        <div class="row">
          <q-btn
            dense
            class="good-buy-now-btn"
            icon-right="arrow_right_alt"
            rounded
            @click="onGoodBuyNowClick">
            {{ $t('BUTTON.BUY_GOOD_NOW') }}
          </q-btn>
          <q-btn
            dense
            class="good-buy-now-btn"
            icon-right="arrow_right_alt"
            rounded>
            {{ $t('BUTTON.ADD_GOOD_CART') }}
          </q-btn>
        </div>

        <div class="row">
          <div class="good-vendor-hint">
            {{ $t('GENERAL.GOOD_VENDOR_HINT') }}
          </div>
           <q-badge
            color="green-8"
            class="good-vendor-hint-badge"
          >
            {{ $t('GENERAL.SELF_RUN') }}
          </q-badge>
          <div class="good-vendor-hint-platform-name">
            {{ $t('GENERAL.PLATFORM_NAME') }}
          </div>
        </div>
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
      slide: ref(0),
      coinSelected: [],
      badgeColors: [
        'primary', 'secondary', 'accent', 'positive', 'negative', 'blue-6', 'green-4', 'orange-4', 'deep-purple-8'
      ],
      goodCount: 1
    }
  },
  computed: {
    good: function () {
      var myGood = this.$store.state.good.goods[this.goodId]
      console.log(myGood, this.goodId)
      myGood.supportedCoinTypes.forEach(coin => {
        if (coin == myGood.cointype) {
          this.coinSelected.push(true)
        } else {
          this.coinSelected.push(false)
        }
      })
      return myGood
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
    },
    onCoinTypeClick: function (index) {
      var selected = new Array(this.coinSelected.length)
      this.coinSelected.forEach((val, localIndex) => {
        if (index == localIndex) {
          selected[localIndex] = !val
        } else {
          selected[localIndex] = val
        }
      })
      this.coinSelected = selected
    },
    randomNumber : function (){
      return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    },
    onGoodBuyNowClick: function () {
      this.$router.push({
        name: 'generateOrder',
        params: {
          goodId: this.good.id
        }
      })
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

.good-parameter
  margin-top: 40px

.good-parameter-label
  background-color: $grey-2
  color: $grey-7
  padding: 3px 10px 3px 3px
  width: 200px
  text-align: end
  border: 1px solid $grey-3
  font-weight: bold

.good-parameter-data
  color: $blue-8
  font-weight: bold
  padding: 3px 3px 3px 10px
  border-top: 1px solid $grey-2
  border-bottom: 1px solid $grey-2
  width: 50px
  text-align: end

.good-parameter-unit
  padding: 3px 3px 3px 10px
  border-right: 1px solid $grey-2
  border-top: 1px solid $grey-2
  border-bottom: 1px solid $grey-2
  width: 200px
  color: $grey-7

.good-production-types
  margin: 10px 0 10px 0
  align-items: center

.good-production-types-label
  color: $grey-7
  width: 110px
  margin: 10px 30px 10px 40px

.good-production-types-coin
  width: 200px
  margin: 10px

.good-production-spec
  width: 200px
  margin: 0 10px 10px 10px

.good-badge
  margin-left: 10px

.good-production-detail-label
  background-color: $grey-2
  color: $grey-7
  padding: 3px 10px 3px 3px
  width: 200px
  text-align: center
  border: 1px solid $grey-3
  font-weight: bold

.good-production-detail-data
  color: $grey-8
  padding: 3px 10px 3px 3px
  width: 200px
  text-align: center
  border: 1px solid $grey-3

.good-vendor-hint
  margin: 10px 10px 10px 0
  color: $grey-7

.good-vendor-hint-badge
  margin: 10px 10px 10px 0
  
.good-vendor-hint-platform-name
  color: $blue-6
  margin: 10px 10px 10px 0
  font-weight: bold

.good-buy-now-btn
  color: white
  background-color: $blue-4
  margin-top: 40px
  margin-right: 10px
  width: 250px
</style>
