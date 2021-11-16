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
              {{ good.title }}
              <p class="good-poster-title-parameter">
                {{ good.amount }}{{ good.unit }} {{ good.duration }}{{ $t('GENERAL.DAYS') }}
              </p>
            </div>
            <q-badge
              v-for="badge in good.badges"
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
              <div class="payment-currency">{{ good.pricecurrencychar}}</div>
              <div class="payment-amount">{{ good.price}}</div>
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
                :label="payType.type"
                v-for="payType in supportPayTypes"
                :key="payType.type" />
            </div>
            <div class="row">
              <div class="payment-scan-amount-label">{{ $t('GENERAL.NEED_PAY') }}:</div>
              <div class="payment-scan-amount-amount">{{ payment.summary }}</div>
              <div class="payment-scan-amount-unit">{{ supportPayTypes[selectedPayTypeIndex].type }}</div>
            </div>

            <div class="row">
              <q-btn
                dense
                class="pay-btn"
                icon-right="arrow_right_alt"
                rounded
                @click="onPayClick">
                {{ $t('GENERAL.GOTO_PAY') }} ({{ supportPayTypes[selectedPayTypeIndex].type }})
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
            <div class="payment-label">{{ supportPayTypes[selectedPayTypeIndex].type }} {{ $t('GENERAL.PAY') }}</div>
            <div class="row payment-address">
              <div>
                <div>
                  {{ payingAmount }} {{ supportPayTypes[selectedPayTypeIndex].type }}
                </div>
                <div>
                  1 {{ supportPayTypes[selectedPayTypeIndex].type }} = $ 621.48000000
                </div>
                <div>
                  {{ payingAddress }}
                </div>
              </div>
              
              <div>
                <vue-qrcode :value="payingAddress" level="H" />
                <div>{{ $t('GENERAL.SCAN_TO_PAY') }}</div>
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
                {{ $t('GENERAL.PAID') }} ({{ supportPayTypes[selectedPayTypeIndex].type }})
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
            <div class="payment-deal-info-deal-id">ID: {{ payment.id }}</div>
            <q-separator />
            <div class="payment-deal-info-info">
              <div class="row">
                <div class="payment-deal-info-label">{{ $t('GENERAL.AVAILABLE_BALANCE') }}</div>
                <q-space />
                <div class="payment-deal-info-currency">{{ good.pricecurrencychar}}</div>
                <div class="payment-deal-info-amount">0</div>
              </div>
              <div class="row">
                <div class="payment-deal-info-label">{{ $t('GENERAL.DEAL_PAY_AMOUNT') }}</div>
                <q-space />
                <div class="payment-deal-info-currency">{{ good.pricecurrencychar}}</div>
                <div class="payment-deal-info-amount">{{ good.price}}</div>
              </div>
              <div class="row payment-deal-info-summary">
                <div class="payment-deal-info-label">{{ $t('GENERAL.SUMMARY') }}</div>
                <q-space />
                <div class="payment-deal-info-currency">{{ good.pricecurrencychar}}</div>
                <div class="payment-deal-info-amount">{{ good.price}}</div>
              </div>
            </div>
            <q-separator />
            <div class="payment-deal-info-good-summary">
              <div class="row">
                <q-space />
                <div class="q-mb-xs row payment-deal-info-good-title">
                  {{ good.title }}
                  <p class="good-poster-title-parameter">
                    {{ good.amount }}{{ good.unit }} {{ good.duration }}{{ $t('GENERAL.DAYS') }}
                  </p>
                  (x1)
                </div>
              </div>
              <div class="row">
                <q-space />
                <div class="payment-currency">{{ good.pricecurrencychar}}</div>
                <div class="payment-amount">{{ good.price}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import VueQrcode from 'vue-qrcode'

export default defineComponent({
  components: {
    VueQrcode
  },
  setup() {
    return {
      payment: {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaad',
        summary: 1290.78,
        payingId: ['aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaf'],
        gasPayingId: ['aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaag'],
        deadline: Math.round(+new Date()/1000) + 6 * 60 * 60
      },
      payings: [],
      gasPayings: [],
      badgeColors: [
        'primary', 'secondary', 'accent', 'positive', 'negative', 'blue-6', 'green-4', 'orange-4', 'deep-purple-8'
      ],
      remainHour: ref(6),
      remainMinute: ref(6),
      remainSecond: ref(6),
      paymentInterval: ref(-1),
      supportPayTypes: [
        {
          icon: 'logo/btc.png',
          type: 'BTC'
        }, {
          icon: 'logo/btc.png',
          type: 'BCH' 
        }, {
          icon: 'logo/btc.png',
          type: 'ETH' 
        }, {
          icon: 'logo/btc.png',
          type: 'ETC' 
        }, {
          icon: 'logo/btc.png',
          type: 'LTC' 
        }, {
          icon: 'logo/btc.png',
          type: 'USDT(ERC20)' 
        }, {
          icon: 'logo/btc.png',
          type: 'USDT(OMNI)' 
        }, {
          icon: 'logo/btc.png',
          type: 'USDC' 
        }
      ],
      selectedPayTypeIndex: 0,
      paying: false,
      payingAmount: 5.19,
      payingAddress: 'bitcoincash:qpg7yf0f06kk9zyn4adfr5pqx6l5q83xmulcmgxuqkge'
    }
  },
  mounted () {
    this.startTimer(this.payment.deadline)
  },
  beforeUnmount () {
    if (this.paymentInterval != -1) {
      clearInterval(this.paymentInterval)
    }
  },
  computed: {
    paymentId: function () {
      return this.$route.query.paymentId
    },
    goodId: function () {
      return this.$route.query.goodId
    },
    good: function () {
      return this.$store.state.good.goods[this.goodId]
    },
    posters: function () {
      return this.good.posters.slice(0, Math.min(4, this.good.posters.length))
    },
    poster: function () {
      if (this.good.posters.length > 0) {
        return this.good.posters[0]
      }
      return 'logo/btc.png'
    },
  },
  methods: {
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
        this.paying = true
    },
    onPayStatusClick: function () {
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
  padding: 20px

.payment-methods
  flex: 1

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
  background-color: $indigo-8
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
  margin: 10px
  padding: 0 10px 20px 10px
  border-radius: 10px

.payment-address
  margin-bottom: 20px

.payment-pay-status
  margin-top: 20px
</style>
