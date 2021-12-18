<template>
  <div class="container">
    <div class="payment">
      <div class="payment-label">{{ $t('GENERAL.CHECKOUT_COUNTER') }}</div>
      <q-separator color="blue-2" size="2px" />

      <div class="payment-info">
        <div class="row">
          <q-img class="good-coinlogo" :src="poster" />
          <div>
            <div class="q-mb-xs row good-title">
              {{ title }}
              <p class="good-poster-title-parameter">
                {{ amount }}{{ unit }} {{ duration }}{{ $t('GENERAL.DAYS') }}
              </p>
            </div>
            <q-badge
              v-for="badge in badges"
              :key="badge"
              :color="badgeColors[randomNumber() % badgeColors.length]"
              class="good-badge"
            >
              {{ badge }}
            </q-badge>
          </div>
          <q-space />
          <div>
            <div class="row">
              <q-space />
              <div class="payment-currency">{{ currencySymbol}}</div>
              <div class="payment-amount">{{ price}}</div>
            </div>
            <div class="row">
              <q-icon name="av_timer" color="green-3" size="1.5rem" />
              <span id="time" class="payment-timer">{{ remainHour }}:{{ remainMinute }}:{{ remainSecond }}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="row">
          <q-space />
          <q-btn color="blue-7" size="8px" flat dense>{{ $t('GENERAL.DEAL_DETAIL') }}</q-btn>
        </div>
        <q-separator size="4px" />
        <div class="row payment-method-info">
          <div v-if="!paying" class="payment-methods">
            <div class="payment-label">{{ $t('GENERAL.SCAN_DIMENSION_CODE_PAY') }}</div>
            <div class="q-gutter-xs payment-scan-methods">
              <q-btn
                color="blue-4"
                class="payment-scan-item"
                v-for="(payType, index) in supportPayTypes"
                :label="payType.Name"
                :key="payType.Name"
                @click="onPayCoinTypeClick(index)" />
            </div>
            <div class="row">
              <div class="payment-scan-amount-label">{{ $t('GENERAL.NEED_PAY') }}:</div>
              <div class="payment-scan-amount-amount">{{ payment.summary }}</div>
              <div class="payment-scan-amount-unit">{{ supportPayTypes[selectedPayTypeIndex].Name }}</div>
            </div>

            <div class="row">
              <q-btn
                dense
                class="pay-btn"
                icon-right="arrow_right_alt"
                rounded
                @click="onPayClick">
                {{ $t('GENERAL.GOTO_PAY') }} ({{ supportPayTypes[selectedPayTypeIndex].Name }})
              </q-btn>
              <q-btn
                dense
                class="pay-btn"
                icon-right="arrow_right_alt"
                rounded
                @click="onPayClick">
                {{ $t('GENERAL.GOTO_PAY_BY_WALLET') }}
              </q-btn>
            </div>
          </div>
          <div v-else class="payment-methods">
            <div class="payment-label">{{ supportPayTypes[selectedPayTypeIndex].Name }} {{ $t('GENERAL.PAY') }}</div>
            <q-separator />
            <div class="row payment-address">
              <div>
                <div class="payment-pay-amount">
                  {{ payingAmount }} {{ supportPayTypes[selectedPayTypeIndex].Name }}
                </div>
                <div class="payment-pay-currency">
                  1 {{ supportPayTypes[selectedPayTypeIndex].Name }} = $ 621.48000000
                </div>
                <div class="payment-pay-address">
                  {{ payingAddress }}
                </div>

                <div class="payment-pay-announcement">
                  {{ $t('GENERAL.SCAN_PAY_ANNOUNCEMENT') }}
                </div>
              </div>
              
              <div class="payment-pay-qrcode-container">
                <vue-qrcode
                  class="payment-pay-qrcode"
                  :value="payingAddress"
                  type="image/png"
                  :color="{dark: '#555555', light: '#ffffff'}"
                  :scale=7
                  level="H"
                  :quality=0.5 />
                <div class="payment-scan-to-pay">{{ $t('GENERAL.SCAN_TO_PAY') }}</div>
              </div>
            </div>
            <q-separator />
            <div class="row payment-pay-status">
              <q-btn
                dense
                class="pay-btn"
                icon-right="arrow_right_alt"
                rounded
                @click="onPayStatusClick">
                {{ $t('GENERAL.PAID') }} ({{ supportPayTypes[selectedPayTypeIndex].Name }})
              </q-btn>
              <q-btn
                dense
                class="pending-btn"
                rounded
                @click="onPayStatusClick">
                {{ $t('GENERAL.PENDING_PAYING') }}
              </q-btn>
            </div>
          </div>
          <div class="payment-deal-info">
            <div class="payment-deal-info-deal-id">ID: {{ orderId }}</div>
            <q-separator />
            <div class="payment-deal-info-info">
              <div class="row">
                <div class="payment-deal-info-label">{{ $t('GENERAL.AVAILABLE_BALANCE') }}</div>
                <q-space />
                <div class="payment-deal-info-currency">{{ currencySymbol }}</div>
                <div class="payment-deal-info-amount">0</div>
              </div>
              <div class="row">
                <div class="payment-deal-info-label">{{ $t('GENERAL.DEAL_PAY_AMOUNT') }}</div>
                <q-space />
                <div class="payment-deal-info-currency">{{ currencySymbol }}</div>
                <div class="payment-deal-info-amount">{{ price}}</div>
              </div>
              <div class="row payment-deal-info-summary">
                <div class="payment-deal-info-label">{{ $t('GENERAL.SUMMARY') }}</div>
                <q-space />
                <div class="payment-deal-info-currency">{{ currencySymbol }}</div>
                <div class="payment-deal-info-amount">{{ price}}</div>
              </div>
            </div>
            <q-separator />
            <div class="payment-deal-info-good-summary">
              <div class="row">
                <q-space />
                <div class="q-mb-xs row payment-deal-info-good-title">
                  {{ title }}
                  <p class="good-poster-title-parameter">
                    {{ amount }}{{ unit }} {{ duration }}{{ $t('GENERAL.DAYS') }}
                  </p>
                  (x1)
                </div>
              </div>
              <div class="row">
                <q-space />
                <div class="payment-currency">{{ currencySymbol }}</div>
                <div class="payment-amount">{{ price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import VueQrcode from 'vue-qrcode'
import { api } from 'boot/axios'
import { fail } from '../notify/notify'
import { useStore } from 'vuex'
import mitt from 'mitt'

export default defineComponent({
  components: {
    VueQrcode
  },
  setup() {
    const store = useStore()
    
    const appInfo = computed ({
      get: () => store.state.appInfo.appInfo
    })

    const user = computed ({
      get: () => store.state.user.user
    })

    return {
      payment: ref({
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaad',
        summary: 1290.78,
        payingId: ['aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaf'],
        gasPayingId: ['aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaag'],
        deadline: Math.round(+new Date()/1000) + 6 * 60 * 60
      }),
      payings: [],
      paying: false,
      gasPayings: [],
      badgeColors: [
        'primary', 'secondary', 'accent', 'positive', 'negative', 'blue-6', 'green-4', 'orange-4', 'deep-purple-8'
      ],
      remainHour: ref(6),
      remainMinute: ref(6),
      remainSecond: ref(6),
      paymentInterval: ref(-1),
      paymentChecker: ref(-1),
      supportPayTypes: ref([{
        ID: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
        Name: 'BTC',
        Unit: 'BTC',
        Logo: 'logo/btc.png'    
      }]),
      selectedPayTypeIndex: 0,
      payingAmount: 5.19,
      payingAddress: 'bitcoincash:qpg7yf0f06kk9zyn4adfr5pqx6l5q83xmulcmgxuqkge',
      appInfo,
      user,
      emitter: mitt(),
      store
    }
  },
  mounted () {
    this.startTimer(this.payment.deadline)
    this.getCoinInfos()
  },
  beforeUnmount () {
    if (this.paymentInterval != -1) {
      clearInterval(this.paymentInterval)
    }
    if (this.paymentChecker != -1) {
      clearInterval(this.paymentChecker)
    }
  },
  created() {
    this.emitter.on('payment_created', this.onPaymentCreated)
  },
  beforeUnmount() {
    this.emitter.off('payment_created')
  },
  watch: {
    order: function () {
      this.getPaymentByOrder(this.order)
    }
  },
  computed: {
    orderId: function () {
      return this.$route.query.orderId
    },
    order: function () {
      return this.store.state.order.orders[this.orderId]
    },
    goodId: function () {
      return this.$route.query.goodId
    },
    good: function () {
      return this.store.state.good.goods[this.goodId]
    },
    posters: function () {
      if (this.good.Extra === undefined ||
        this.good.Extra.Posters === undefined ||
        this.good.Extra.Posters.length === 0) {
        return ['logo/btc.png', 'logo/btc.png', 'logo/btc.png']
      }
      return this.good.Extra.Posters.slice(0, Math.min(3, this.good.Extra.Posters.length))
    },
    poster: function () {
      if (this.posters.length > 0) {
        return this.posters[0]
      }
      return 'logo/btc.png'
    },
    title: function () {
      return this.good.Title
    },
    badges: function () {
      if (this.good.Extra === undefined || this.good.Extra.Labels.length === 0) {
        return [this.$t('GENERAL.SELF_RUN')]
      }
      return this.good.Extra.Labels
    },
    rating: function () {
      return this.good.Extra.Rating
    },
    voteCount: function () {
      return this.good.Extra.VoteCount
    },
    cointype: function () {
      return this.good.CoinInfo.Name
    },
    duration: function () {
      return this.good.DurationDays
    },
    currencySymbol: function () {
      return this.good.PriceCurrency.Symbol
    },
    price: function () {
      return this.good.Price
    },
    amount: function () {
      return this.good.Total
    },
    unit: function () {
      return this.good.PriceCurrency.Unit
    },
  },
  methods: {
    onPaymentCreated: function (order) {
      this.payment.id = order.Payment.ID
      this.payment.summary = order.Payment.Amount
      this.payingAddress = order.Payment.Account.Address
    },
    getCoinInfos: function () {
      var thiz = this
      api.post('/sphinx-coininfo/v1/get/coininfos')
      .then(function (resp) {
        thiz.supportPayTypes = resp.data.Infos
      })
      .catch(function (error) {
        fail(undefined, thiz.$t('GENERAL.FAIL_GET_COININFOS'), error)
      })
    },
    randomNumber : function (){
      return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    },
    startTimer: function (deadline) {
      this.paymentInterval = setInterval(() => {
        var remain = deadline - Math.floor(+new Date()/1000)

        this.remainHour = Math.floor(remain / 60 / 60)
        this.remainMinute = Math.floor((remain - this.remainHour * 60 * 60) / 60)
        this.remainSecond = Math.floor(remain - this.remainHour * 60 * 60 - this.remainMinute * 60)

        if (remain <= 0) {
          clearInterval(this.paymentInterval)
          this.paymentInterval = -1
        }
      }, 1000)
    },
    onPayClick: function () {
      var fees = []

      if (this.good.Fees != undefined) {
        for (let i = 0; i < this.good.Fees.length; i++) {
          fees.push({
            ID: this.good.Fees[i].ID,
            DurationDays: 10
          })
        }
      }

      var order = {
        OrderID: this.orderId,
        Fees: fees,
        PaymentCoinTypeID: this.supportPayTypes[this.selectedPayTypeIndex].ID,
      }

      var thiz = this
      var emitter = this.emitter
      var failMsg = this.$t('GENERAL.FAIL_CREATE_ORDER')

      api.post('/cloud-hashing-apis/v1/create/order/payment', order)
      .then(function (resp) {
        emitter.emit('payment_created', resp.data.Info)
        thiz.paymentChecker = setTimeout(() => {
          thiz.getPaymentByOrder(resp.data.Info)
        }, 30000)
        thiz.paying = true
      })
      .catch(function (error) {
        fail(undefined, failMsg, error)
      })
    },
    onPayStatusClick: function () {
    },
    getPaymentByOrder: function (order) {
      var thiz = this
      var router = this.$router
      var store = this.store

      api.post('/cloud-hashing-order/v1/get/payment/by/order', {
        OrderID: order.ID
      })
      .then(function (resp) {
        if (resp.data.Info.State != 'done') {
          thiz.paymentChecker = setTimeout(() => {
            thiz.getPaymentByOrder(order)
          }, 30000)
          return
        }

        store.commit('order/updateOrder', thiz.order)
        store.commit('payment/updatePayment', resp.data.Info)

        router.push({
          path: 'payDone',
          query: {
            orderId: resp.data.Info.OrderID,
            paymentId: resp.data.Info.ID
          }
        })
      })
      .catch(function (error) {
        console.log(error, order)
        thiz.paymentChecker = setTimeout(() => {
          thiz.getPaymentByOrder(order)
        }, 5000)
      })
    },
    onPayCoinTypeClick: function (index) {
      this.selectedPayTypeIndex = index
    }
  }
})
</script>

<style lang="sass" scoped>
.container
  width: 100%
  height: 100%
  padding: 20px 100px 100px 100px
  background-color: $grey-1

.payment
  background-color: white
  padding: 30px 50px 30px 50px

.payment-label
  font-weight: bold
  color: $grey-8
  font-size: 20px
  margin: 5px

.good-coinlogo
  width: 60px
  margin-right: 10px

.payment-info
  margin: 20px 0 20px 0

.good-title
  flex: 1
  line-height: 30px
  font-size: 14px
  height: 30px
  margin: 0

.good-poster-title-parameter
  margin-left: 10px
  font-size: 14px
  color: $grey-7
  margin-right: 5px

.good-badge
  margin-right: 5px

.payment-currency
  color: $grey-6
  font-size: 22px
  margin-right: 3px
  font-weight: bold

.payment-amount
  color: $orange-9
  font-size: 22px
  font-weight: bold

.payment-deal-info-currency
  color: $grey-6
  font-size: 12px
  margin-right: 3px
  font-weight: bold

.payment-deal-info-amount
  color: $orange-6
  font-size: 12px
  margin-right: 3px
  font-weight: bold

.payment-timer
  color: $red-5
  font-size: 16px
  font-weight: bold
  line-height: 25px
  margin-left: 5px

.payment-deal-info
  border: solid 1px $grey-4
  width: 400px
  height: 335px
  padding: 20px

.payment-methods
  flex: 1
  margin-right: 20px

.payment-method-info
  margin-top: 20px
  margin-bottom: 20px

.payment-scan-methods
  margin-top: 20px
  margin-bottom: 40px

.payment-scan-item
  width: 270px

.payment-scan-amount-label
  font-size: 16px
  font-weight: bold
  color: $grey-7
  margin-top: 4px
  margin-right: 10px

.payment-scan-amount-amount
  font-size: 20px
  font-weight: bold
  color: $orange-9
  margin-right: 5px

.payment-scan-amount-unit
  font-size: 20px
  font-weight: bold
  color: $green-6

.pay-btn
  margin: 10px 0 10px 0
  color: $grey-4
  background-color: $indigo-6
  width: 250px
  margin-right: 10px

.pending-btn
  margin: 10px 0 10px 0
  color: $grey-8
  background-color: white
  width: 250px
  margin-right: 10px

.payment-deal-info-deal-id
  font-weight: bold
  color: $grey-8
  margin: 0 10px 10px 10px

.payment-deal-info-label
  font-size: 10px
  color: $grey-6
  margin-top: 3px

.payment-deal-info-info
  margin: 20px 10px 20px 10px

.payment-deal-info-summary
  margin-top: 10px

.payment-deal-info-good-title
  font-weight: bold
  margin-top: 30px

.payment-deal-info-good-summary
  background-color: $green-1
  margin: 20px 10px 20px 10px
  padding: 0 10px 20px 10px
  border-radius: 10px

.payment-address
  margin-bottom: 20px
  margin-left: 10px

.payment-pay-status
  margin-top: 20px

.payment-pay-amount
  font-weight: bold
  color: $orange-9
  font-size: 24px
  margin-top: 20px

.payment-pay-currency
  color: $orange-9
  font-size: 16px

.payment-pay-address
  margin-top: 40px
  font-size: 20px
  color: $grey-7

.payment-pay-announcement
  width: 400px
  margin-top: 20px
  border: solid 1px $orange-4
  background-color: $yellow-1
  padding: 10px
  color: orange
  font-size: 8px
  margin-top: 40px

.payment-pay-qrcode-container
  margin-left: 40px

.payment-scan-to-pay
  text-align: center
  color: $grey-8

.payment-pay-qrcode
  background-color: red
  margin: 0
</style>
