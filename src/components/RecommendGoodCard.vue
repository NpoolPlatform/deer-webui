<template>
  <q-card class="recommend-good">
    <q-item>
      <q-item-section avatar>
        <img :src="coinlogo" class="good-coinlogo">
      </q-item-section>
      <q-item-section>
        <div class="row">
          <h6>{{ title }}</h6>
          <p class="good-parameter">
            {{ unitPower }}{{ unit }} {{ durationDays }}{{ $t('GENERAL.DAYS') }}
          </p>
        </div>
        <div>
          <q-badge
            v-for="badge in labels"
            :key="badge"
            :color="badgeColors[randomNumber() % badgeColors.length]"
            style="margin-right: 6px;"
          >
            {{ badge }}
          </q-badge>
        </div>
      </q-item-section>
    </q-item>
    <q-separator />
    <div class="q-gutter-sm row items-start justify-center">
      <q-intersection
        v-for="poster in posters"
        :key="poster">
        <img
          class="good-poster"
          :src="poster"
        />
      </q-intersection>
    </div>
    <div class="justify-center">
      <q-carousel
        v-model="slide"
        animated
        infinite
        vertical
        autoplay
        height="3rem"
      >
        <q-carousel-slide name="deals">
          <p class="good-real-data">本品于 2021/11/13 15:49 成交一单</p>
        </q-carousel-slide>
        <q-carousel-slide name="incoming">
          <p class="good-real-data">本品于 2021/11/12 23:49 入账5 BTC</p>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="justify-center row good-price-container">
      <h5 class="good-price-char">{{ currencySymbol }}</h5>
      <h2 class="good-price-number">{{ price }}</h2>
    </div>
    <div class="justify-center row">
      <q-separator style="width: 80%;" />
    </div>
    <div class="justify-center row">
      <q-btn class="button-buy-now" rounded @click="onBuyNowClick">{{ $t('BUTTON.BUY_NOW') }}</q-btn>
    </div>
    <q-item>
      <q-item-section>
        <div class="justify-end">
          <p class="good-history-left">{{ $t('GENERAL.MAINTAINANCE_FEE') }}</p>
          <p class="good-history-left">{{ $t('GENERAL.POWER_FEE') }}</p>
          <p class="good-history-left">{{ $t('GENERAL.RENT_FEE') }}</p>
          <p class="good-history-left">{{ $t('GENERAL.DAILY_PRODUCTION') }}</p>
          <p class="good-history-left good-history-production">{{ $t('GENERAL.GOOD_PRODUCTION') }}</p>
        </div>
      </q-item-section>
      <q-item-section>
        <p class="good-history-right">$0.1126/T/{{ $t('GENERAL.DAYS') }}</p>
        <p class="good-history-right">$0.1126/T/{{ $t('GENERAL.DAYS') }}</p>
        <p class="good-history-right">$0.1126/T/{{ $t('GENERAL.DAYS') }}</p>
        <p class="good-history-right">$0.7896/T/{{ $t('GENERAL.DAYS') }}</p>
        <p class="good-history-right good-history-production">178.5%</p>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-card-actions>
      <q-btn flat round color="red" icon="favorite" />
      <q-btn flat round color="teal" icon="bookmark" />
      <q-btn flat round color="primary" icon="share" />
      <q-btn flat round color="accent" icon="camera_indoor" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'RecommentGoodCard',
  props: {
    good: {
      type: Object,
      required: true
    }
  },
  setup() {
    const $store = useStore()

    const clickedGood = computed ({
      set: (val) => {
        $store.commit('good/updateGood', val)
      }
    })

    return {
      badgeColors: [
        'primary', 'secondary', 'accent', 'positive', 'negative', 'blue-6', 'green-4', 'orange-4', 'deep-purple-8'
      ],
      slide: ref('deals'),
      clickedGood
    }
  },
  methods: {
    randomNumber : function (){
      return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    },
    onBuyNowClick: function () {
      if (!this.user.logined) {
        this.$router.push({
          path: 'signin',
          query: {
            by: 'email'
          }
        })
        return
      }
      this.clickedGood = this.good
      this.$router.push({
        path: 'good',
        query: {
          goodId: this.good.ID
        }
      })
    }
  },
  computed: {
    posters: function () {
      if (this.good.Extra === undefined ||
        this.good.Extra.Posters === undefined ||
        this.good.Extra.Posters.length === 0) {
        return ['logo/btc.png', 'logo/btc.png', 'logo/btc.png']
      }
      return this.good.Extra.Posters.slice(0, Math.min(3, this.good.Extra.Posters.length))
    },
    coinlogo: function () {
      if (this.good.CoinInfo === undefined ||
        this.good.CoinInfo.Logo === '' ||
        this.good.CoinInfo.Logo == undefined) {
        return 'logo/btc.png'
      }
      return this.good.CoinInfo.Logo
    },
    labels: function () {
      if (this.good.Extra === undefined || this.good.Extra.Labels.length === 0) {
        return [this.$t('GENERAL.SELF_RUN')]
      }
      return this.good.Extra.Labels
    },
    user: function () {
      return this.$store.state.user.user
    },
    currencySymbol: function () {
      return this.good.PriceCurrency.Symbol
    },
    title: function () {
      return this.good.Title
    },
    unitPower: function () {
      return this.good.UnitPower
    },
    unit: function () {
      return this.good.Unit
    },
    durationDays: function () {
      return this.good.DurationDays
    },
    price: function () {
      return this.good.Price
    }
  }
})
</script>

<style lang="sass" scoped>
.recommend-good
  width: 100%
  margin: 10px
  border-radius: 30px

.good-coinlogo
  width: 50px
  height: 50px

h6
  font-size: 18px
  color: $grey-7
  margin: 0
  font-weight: bold

.good-parameter
  margin-right: 10px
  font-size: 14px
  color: $grey-7
  margin-top: 8px
  margin-bottom: 0
  margin-left: 5px

.good-poster
  max-width: 80px
  height: 120px
  margin: 30px 0 10px 0

.good-real-data
  text-align: center
  color: $grey-6

.good-price-container
  height: 80px

.good-price-char
  margin-top: 10px
  margin-bottol: 10px
  font-weight: bold

.good-price-number
  margin-top: 10px
  margin-bottol: 10px
  font-weight: bold
  color: $orange-4

.button-buy-now
  margin: 20px
  color: $grey-4
  background-color: $indigo-8
  width: 250px

.good-history-left
  text-align: end
  color: $grey-6
  margin: 0

.good-history-right
  color: $grey-8
  margin: 0

.good-history-production
  color: orange
  margin-bottom: 10px
</style>
