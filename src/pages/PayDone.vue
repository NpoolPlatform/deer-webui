<template>
  <div>
    paymentId: {{ paymentId }} - {{ amount }}
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
    }
  }
})
</script>

