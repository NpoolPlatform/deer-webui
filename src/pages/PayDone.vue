<template>
  <div>
    paymentId: {{ paymentId }}
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    
  },
  computed: {
    orderId: function () {
      return this.$route.query.orderId
    },
    paymentId: function () {
      return this.$route.query.paymentId
    },
  }
})
</script>

