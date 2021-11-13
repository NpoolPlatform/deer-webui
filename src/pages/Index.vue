<template>
  <div>
    <div class="banner">
      <div class="left-banner">
        <h3 class="slogan-main">{{ $t('SLOGAN.MINEME_MAIN') }}</h3>
        <h5 class="slogan-subtitle">{{ $t('SLOGAN.MINEME_SUBTITLE') }}</h5>
        <q-btn class="start-btn" icon-right="arrow_right_alt" rounded>{{ $t('BUTTON.START_MINE_NOW') }}</q-btn>
      </div>
      <q-carousel
          v-model="slide"
          animated
          infinite
          autoplay
          height="280px"
          style="margin: 100px 0 100px 0; background-color: yellow;"
        >
          <q-carousel-slide
            v-for="slider in sliders" @click="onBannerSliderClick(slider.url)"
            :key="slider.label"
            :name="slider.label"
            style="padding: 0; margin: 0;">
            <img :src="slider.image" class="slider-img" />
          </q-carousel-slide>
        </q-carousel>
    </div>
    <div>
      <h4 class="title">{{ $t('BUTTON.PLATFORM_RECOMMEND') }}</h4>
      <q-list class="recommend-list">
        <recommend-good-card
          v-for="recommend in recommends"
          :key="recommend.id"
          :good="recommend">
        </recommend-good-card>
      </q-list>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import RecommendGoodCard from '../components/RecommendGoodCard.vue'

export default defineComponent({
  name: 'PageIndex',
  components: {
    RecommendGoodCard
  },
  setup () {
    return {
      slide: ref('style'),
      sliders: [
        {
          label: 'slider-1',
          image: 'images/slider-1.jpg',
          url: 'http://localhost:8080',
        }, {
          label: 'slider-2',
          image: 'images/slider-2.png',
          url: 'http://localhost:8080',
        }, {
          label: 'slider-3',
          image: 'images/slider-3.png',
          url: 'http://localhost:8080',
        }, {
          label: 'slider-4',
          image: 'images/slider-4.png',
          url: 'http://localhost:8080',
        }
      ],
      recommends: [
        {
          id: 1,
          cointype: 'BTC',
          coinlogo: 'logo/btc.png',
          title: '蚂蚁矿机S19Pro套餐',
          duration: 180,
          unit: 'TH/s',
          amount: 200,
          posters: ['logo/btc.png', 'logo/btc.png', 'logo/btc.png', 'logo/btc.png'],
          gotourl: 'http://localhost:8080',
          fees: [
            {
              type: '技术服务费',
              paytype: 'percent',
              percent: 10,
            }, {
              type: '电费',
              paytype: 'amount',
              unitamount: 0.05,
              currency: 'USDT'
            }
          ],
          start: Math.round(+new Date()/1000),
          badges: ['新币种', '热卖', '即将售罄', '自营'],
          outsale: false,
          presale: false,
          price: 2029.70,
          priceunit: 'USDT',
          pricecurrency: 'USDT',
          pricecurrencychar: '$'
        }, {
          id: 2,
          cointype: 'BTC',
          coinlogo: 'logo/btc.png',
          title: '蚂蚁矿机S20Pro套餐',
          duration: 180,
          unit: 'TH/s',
          amount: 200,
          posters: ['logo/btc.png', 'logo/btc.png', 'logo/btc.png', 'logo/btc.png'],
          gotourl: 'http://localhost:8080',
          fees: [
            {
              type: '技术服务费',
              paytype: 'percent',
              percent: 10,
            }, {
              type: '电费',
              paytype: 'amount',
              unitamount: 0.05,
              currency: 'USDT'
            }
          ],
          start: Math.round(+new Date()/1000),
          badges: ['热卖', '自营'],
          outsale: false,
          presale: false,
          price: 1029.70,
          priceunit: 'USDT',
          pricecurrency: 'USDT',
          pricecurrencychar: '$'
        }, {
          id: 3,
          cointype: 'BTC',
          coinlogo: 'logo/btc.png',
          title: '蚂蚁矿机S21Pro套餐',
          duration: 180,
          unit: 'TH/s',
          amount: 200,
          posters: ['logo/btc.png', 'logo/btc.png', 'logo/btc.png', 'logo/btc.png'],
          gotourl: 'http://localhost:8080',
          fees: [
            {
              type: '技术服务费',
              paytype: 'percent',
              percent: 10,
            }, {
              type: '电费',
              paytype: 'amount',
              unitamount: 0.05,
              currency: 'USDT'
            }
          ],
          start: Math.round(+new Date()/1000),
          badges: ['热卖', '自营'],
          outsale: false,
          presale: false,
          price: 1129.70,
          priceunit: 'USDT',
          pricecurrency: 'USDT',
          pricecurrencychar: '$'
        }, {
          id: 4,
          cointype: 'BTC',
          coinlogo: 'logo/btc.png',
          title: '蚂蚁矿机S22Pro套餐',
          duration: 180,
          unit: 'TH/s',
          amount: 200,
          posters: ['logo/btc.png', 'logo/btc.png', 'logo/btc.png', 'logo/btc.png'],
          gotourl: 'http://localhost:8080',
          fees: [
            {
              type: '技术服务费',
              paytype: 'percent',
              percent: 10,
            }, {
              type: '电费',
              paytype: 'amount',
              unitamount: 0.05,
              currency: 'USDT'
            }
          ],
          start: Math.round(+new Date()/1000),
          badges: ['预售'],
          outsale: false,
          presale: false,
          price: 1229.70,
          priceunit: 'USDT',
          pricecurrency: 'USDT',
          pricecurrencychar: '$'
        }, {
          id: 5,
          cointype: 'BTC',
          coinlogo: 'logo/btc.png',
          title: '蚂蚁矿机S23Pro套餐',
          duration: 180,
          unit: 'TH/s',
          amount: 200,
          posters: ['logo/btc.png', 'logo/btc.png', 'logo/btc.png', 'logo/btc.png'],
          gotourl: 'http://localhost:8080',
          fees: [
            {
              type: '技术服务费',
              paytype: 'percent',
              percent: 10,
            }, {
              type: '电费',
              paytype: 'amount',
              unitamount: 0.05,
              currency: 'USDT'
            }
          ],
          start: Math.round(+new Date()/1000),
          badges: ['预售', '自营'],
          outsale: false,
          presale: false,
          price: 1229.70,
          priceunit: 'USDT',
          pricecurrency: 'USDT',
          pricecurrencychar: '$'
        }
      ]
    }
  },
  methods: {
    onBannerSliderClick: function(url) {

    }
  }
})
</script>

<style lang="sass" scoped>
.banner
  background-image: url("../../public/images/background_main_banner.png")
  height: 500px
  display: flex

.left-banner
  width: 60%
  padding-top: 150px

.slogan-main
  color: #aaaaaa
  width: 100%
  margin: 0

.slogan-subtitle
  color: #cccccc
  margin: 10px 0 10px 0

.start-btn
  color: $grey-4
  background-color: $indigo-8
  margin-top: 30px
  width: 250px

.slider-img
  height: 280px
  margin: 0
  padding: 0
  background-color: red

.title
  width: 100%
  font-size: 28px
  text-align: center
  color: $grey-7

h4
  font-weight: bold

.recommend-list
  display: flex
</style>