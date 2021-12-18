<template>
  <div class="container">
    <div class="pay-info">
      <div class="row">
        <q-icon name="verified_user" color="green" size="1.5rem"></q-icon>
        <div>
          <div class="row">
            <p class="pay-label">{{ $t('GENERAL.PAY_SUCCESS') }}</p>
            <p class="pay-amount">{{ amount }}</p>
            <p class="pay-unit">{{ priceUnit }}</p>
            <p class="good-info">{{ goodInfo }}</p>
          </div>
          <div class="row">
            <div class="benefit-address-label">
              {{ $t('GENERAL.BENEFIT_ADDRESS') }}:
            </div>
            <div class="benefit-address">
              f1gtwd7rl2fyxnhz353gqzbe4utin2arqruzt5rta
            </div>
            <div class="benefit-address-desc">
              KK的默认地址
            </div>
            <div class="benefit-address-modify">
              修改收益地址
            </div>
          </div>
          <div class="row">
            <div class="good-info-detail">
              本单详情
            </div>
            <q-btn
              class="good-info-detail"
              flat
              @click="onOrderHistoryClick">
              历史订单
            </q-btn>
          </div>
        </div>
      </div>
    </div>
    <div>畅销 收益更高 稳健 打新 活动</div>
    <div>购买过程中遇到问题？提交意见和建议帮助我们变得更好</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    return {
      store
    }
  },
  methods: {
    onOrderHistoryClick: function () {
      this.$router.push({
        path: 'dashboard'
      })
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
    goodName: function () {
      if (this.good === undefined) {
        return 'NaN'
      }
      return this.good.Title
    },
    unitPower: function () {
      if (this.good === undefined) {
        return 'NaN'
      }
      return this.good.UnitPower
    },
    goodUnit: function () {
      if (this.good === undefined) {
        return 'NaN'
      }
      return this.good.Unit
    },
    durationDays: function () {
      if (this.good === undefined) {
        return 'NaN'
      }
      return this.good.DurationDays
    },
    units: function () {
      if (this.order === undefined) {
        return 'NaN'
      }
      return this.order.Units
    },
    goodInfo: function () {
      return this.goodName + ' ' + this.unitPower + this.goodUnit + ' ' + this.durationDays + 'Days x ' + this.units
    },
    paymentId: function () {
      return this.$route.query.paymentId
    },
    payment: function () {
      return this.store.state.payment.payments[this.paymentId]
    },
    amount: function () {
      if (this.payment === undefined || this.payment === null) {
        return 'NaN'
      }
      return this.payment.Amount
    },
    payCoinInfoID: function () {
      if (this.payment === undefined || this.payment === null) {
        return undefined
      }
      return this.payment.CoinInfoID
    },
    payCoinInfo: function () {
      if (this.payCoinInfoID === undefined) {
        return undefined
      }
      return this.store.state.coininfo.coininfos[this.payCoinInfoID]
    },
    priceUnit: function () {
      if (this.payCoinInfo === undefined) {
        return 'USDT'
      }
      return this.payCoinInfo.Unit
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

.pay-info
  height: 120px
  width: 100%
  background-color: $green-1
  border: 1px solid $green-4
  padding: 20px 100px 20px 100px

.pay-amount
  color: $orange-6
  font-weight: bold
  padding: 0 3px 0 3px
  font-size: 16px

.pay-label
  margin: 0 3px 0 3px
  color: $grey-8
  font-size: 16px

.pay-unit
  color: $green-8
  font-weight: bold
  font-size: 16px

.benefit-address-label
  color: $grey-6
  font-weight: bold
  font-size: 12px
  margin-right: 10px

.benefit-address
  color: $grey-8
  font-size: 10px

.benefit-address-desc
  color: $grey-8
  font-size: 10px
  margin-left: 10px

.benefit-address-modify
  color: $blue-8
  font-size: 8px
  margin-left: 20px

.good-info
  color: $grey-6
  margin-left: 10px
  margin-top: 4px
  font-size: 8px

.good-info-detail
  color: $blue-8
  margin-top: 4px
  font-size: 8px
  margin-right: 10px

</style>
