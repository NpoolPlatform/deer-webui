<template>
  <div class="container">
    <div class="pay-info">
      <div class="row">
        <q-icon name="verified_user" color="green" size="1.5rem"></q-icon>
        <p class="pay-label">{{ $t('GENERAL.PAY_SUCCESS') }}</p>
        <p class="pay-amount">{{ amount }}</p>
        <p class="pay-unit">{{ unit }}</p>
      </div>
    </div>
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
    unit: function () {
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
  height: 400px
  width: 100%
  background-color: $green-1
  border: 1px solid $green-4
  padding: 20px 100px 20px 100px

.pay-amount
  color: $orange-6
  font-weight: bold
  padding: 0 3px 0 3px

.pay-label
  margin: 0 3px 0 3px
  color: $grey-8

.pay-unit
  color: $green-8
  font-weight: bold

</style>
