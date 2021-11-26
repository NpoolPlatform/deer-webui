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
      <q-list class="recommend-list">
        <recommend-good-card
          v-for="(recommend, index) in recommends"
          :key="index"
          :good="recommend">
        </recommend-good-card>
      </q-list>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import RecommendGoodCard from '../components/RecommendGoodCard.vue'
import { api } from 'boot/axios'
import { fail } from '../notify/notify'
import mitt from 'mitt'

export default defineComponent({
  name: 'PageIndex',
  components: {
    RecommendGoodCard
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
      recommendGoods: ref([{
        Actuals: true,
        BenefitType: 'platform',
        Classic: true,
        CoinInfo: {
          ID: 'aaaaaaaa-bbbb-aaaa-aaaa-aaaaaaaa',
          Name: 'BTC',
          Logo: 'logo/btc.png',
          Unit: 'BTC',
          PreSale: false
        },
        DeliveryAt: 1637564087,
        DeviceInfo: {
          ID: "b8769b9e-5767-4e81-ad70-3bb8176aa169",
          Manufacturer: "Ant-1637564087022583747",
          PowerComsuption: 120,
          ShipmentAt: 1637564087,
          Type: "S19-1637564087022583747"
        },
        DurationDays: 180,
        Extra: {
          Rating: 4.2,
          VoteCount: 529,
          Posters: ['logo/btc.png', 'logo/btc.png', 'logo/btc.png', 'logo/btc.png'],
          Labels: ['新币种', '热卖', '即将售罄', '自营'],
          OutSale: false,
          PreSale: false,
        },
        ID: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa',
        InheritFromGood: {
          Actuals: true,
          BenefitType: "platform",
          Classic: true,
          CoinInfoID: "6ba7b812-9dad-11d1-80b4-00c04fd430c9",
          DeliveryAt: 1637564087,
          DeviceInfoID: "b8769b9e-5767-4e81-ad70-3bb8176aa169",
          DurationDays: 180,
          ID: "b1699189-bb6c-4262-8198-7b5feeeff7ec",
          InheritFromGoodID: "00000000-0000-0000-0000-000000000000",
          Price: 13,
          PriceCurrency: "e522b14b-6817-4623-b058-34aea85ef891",
          SeparateFee: true,
          Start: 1637564087,
          SupportCoinTypeIDs: [
            'dabb0dca-311b-465a-be56-f71982ff4922',
            '5135e69c-1993-4860-a466-0e8bc53a4cea'
          ],
          Title: "Ant Miner S19 Pro",
          Total: 100,
          Unit: "TH/s",
          UnitPower: 10,
          VendorLocationID: "dad9d9d0-f38d-4f8c-b5df-a38503200d25"
        },
        Price: 2029.70,
        PriceCurrency: {
          ID: 'aaaaaaaa-bbbb-cccc-aaaa-aaaaaaae',
          Name: 'USDT',
          Unit: 'USDT',
          Symbol: '$'
        },
        SeparateFee: true,
        Start: 1637564087,
        SupportedCoins: [{
          ID: 'aaaaaaaa-bbbb-aaaa-aaaa-aaaaaaaa',
          Name: 'BTC',
          Logo: 'logo/btc.png',
          Unit: 'BTC',
          PreSale: false
        }, {
          ID: 'aaaaaaaa-bbbb-aaaa-aaaa-aaaaaaab',
          Name: 'BCH',
          Logo: 'logo/btc.png',
          Unit: 'BCH',
          PreSale: false
        }],
        Title: '蚂蚁矿机S19Pro套餐',
        Total: 10000,
        Unit: 'TH/s',
        UnitPower: 200,
        Fees: [
          {
            ID: 'aaaaaaaa-bbbb-cccc-aaaa-aaaaaaab',
            FeeType: '技术服务费',
            PayType: 'percent',
            PercentValue: 10,
          }, {
            ID: 'aaaaaaaa-bbbb-cccc-aaaa-aaaaaaac',
            FeeType: '电费',
            PayType: 'amount',
            AmountValue: 0.05,
          }
        ],
        VendorLocation: {
          Address: "Shanghai-1637564087022583747",
          City: "Shanghai-1637564087022583747",
          Country: "China-1637564087022583747",
          ID: "dad9d9d0-f38d-4f8c-b5df-a38503200d25",
          Province: "Shanghai-1637564087022583747"
        }
      }]),
      emitter: mitt()
    }
  },
  created() {
    this.emitter.on('recommend_goods_received', this.onRecommendGoodsReceived)
    this.getRecommendGoods()
  },
  beforeUnmount() {
    this.emitter.off('recommend_goods_received')
  },
  methods: {
    onBannerSliderClick: function(url) {

    },
    getRecommendGoods: function () {
      var thiz = this
      var emitter = this.emitter
      var failMsg = thiz.$t('GENERAL.FAIL_SIGNIN')

      api.post('/cloud-hashing-apis/v1/get/goods/detail')
      .then(function (resp) {
        emitter.emit('recommend_goods_received', resp.data.Details)
      })
      .catch(function (error) {
        fail(undefined, failMsg, error)
      })
    },
    onRecommendGoodsReceived: function (recommends) {
      this.recommendGoods = recommends
    }
  },
  computed: {
    recommends() {
      return this.recommendGoods.filter((good, index) => {
        return index < 4
      })
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