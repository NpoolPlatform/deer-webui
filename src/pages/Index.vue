<template>
  <div>
    <div class="banner container">
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
            v-for="(slider, index) in sliders" @click="onBannerSliderClick(slider.url)"
            :key="index"
            :name="index"
            style="padding: 0; margin: 0;">
            <img :src="slider.image" class="slider-img" />
          </q-carousel-slide>
        </q-carousel>
    </div>
    <div class="container">
      <h4 class="title">{{ $t('BUTTON.PLATFORM_RECOMMEND') }}</h4>
      <!-- q-list class="recommend-list">
        <recommend-good-card
          v-for="recommend in recommends"
          :key="recommend.ID"
          :good="recommend">
        </recommend-good-card>
      </q-list -->
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
// import RecommendGoodCard from '../components/RecommendGoodCard.vue'
import { api } from 'boot/axios'
import { fail } from '../notify/notify'
import mitt from 'mitt'

export default defineComponent({
  name: 'PageIndex',
  components: {
    // RecommendGoodCard
  },
  setup () {
    return {
      slide: ref(0),
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
      recommends: [{
        Actuals: true,
        ID: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa",
        BenefitType: "platform",
        CoinInfo: {
          ID: "aaaaaaaa-bbbb-aaaa-aaaa-aaaaaaaa",
          CoinType: "BTC",
          CoinLogo: 'logo/btc.png'
        },
        SupportedCoinTypes: [{
          ID: "aaaaaaaa-bbbb-dddd-aaaa-aaaaaaaa",
          CoinType: "BTC",
          CoinLogo: 'logo/btc.png'
        }, {
          ID: "aaaaaaaa-bbbb-cccc-aaaa-aaaaaaaa",
          CoinType: "BCH",
          CoinLogo: 'logo/btc.png'
        }],
        Title: '蚂蚁矿机S19Pro套餐',
        Extra: {
          Rating: 4.2,
          VoteCount: 529,
          Posters: ['logo/btc.png', 'logo/btc.png', 'logo/btc.png', 'logo/btc.png'],
          Labels: ['新币种', '热卖', '即将售罄', '自营'],
          OutSale: false,
          PreSale: false,
        },
        DurationDays: 180,
        Unit: 'TH/s',
        UnitPower: 200,
        Fees: [
          {
            ID: "aaaaaaaa-bbbb-cccc-aaaa-aaaaaaab",
            FeeType: '技术服务费',
            PayType: 'percent',
            PercentValue: 10,
          }, {
            ID: "aaaaaaaa-bbbb-cccc-aaaa-aaaaaaac",
            FeeType: '电费',
            PayType: 'amount',
            AmountValue: 0.05,
          }
        ],
        Start: Math.round(+new Date()/1000),
        Price: 2029.70,
        pricecurrency: {
          ID: "aaaaaaaa-bbbb-cccc-aaaa-aaaaaaae",
          Name: "USDT",
          Unit: "USDT",
          Symbol: "$"
        }
      }],
      emitter: mitt()
    }
  },
  created() {
    this.getRecommendGoods()
    this.emitter.on('recommend_goods_received', this.onRecommendGoodsReceived)
  },
  methods: {
    onBannerSliderClick: function(url) {

    },
    getRecommendGoods: function () {
      var thiz = this

      api.post('/cloud-hashing-goods/v1/get/goods/detail')
      .then(function (resp) {
        thiz.emitter.emit('recommend_goods_received', resp.data.Details)
      })
      .catch(function (error) {
        fail(undefined, thiz.$t('GENERAL.FAIL_SIGNIN'), error, error)
      })
    },
    onRecommendGoodsReceived: function (recommends) {
      console.log(recommends)
      this.recommends = recommends
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

.container
  padding: 0 100px 0 100px
</style>