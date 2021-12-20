<template>
  <div class="container row">
    <q-tabs
      v-model="tab"
      vertical
      inline-label
      active-color="blue-8"
      class="text-grey-8">
      <q-tab name="myServices" icon="mail" label="我的服务" style="justify-content:initial" />
      <q-tab name="myMachines" icon="alarm" label="我的矿机" style="justify-content:initial" />
      <q-tab name="myOrders" icon="movie" label="我的订单" style="justify-content:initial" />
      <q-tab name="myCoupons" icon="movie" label="我的礼券" style="justify-content:initial" />
      <q-tab name="myInvitations" icon="movie" label="有奖邀请" style="justify-content:initial" />
      <q-tab name="setting" icon="movie" label="设置" style="justify-content:initial" />
    </q-tabs>
    <div class="my-content">
      <div
        class="row"
        v-for="order in orders"
        :key="order.ID">
        <div>
          {{ order.Units }} / {{ order.Payment.Amount }} / {{ order.Payment.State }} / {{ order.Good.Title }}
          <div
            class="row"
            v-for="(benefit, index) in userBenefitsByOrder(order)"
            :key="index">
            {{ benefit.ID }} / {{ benefit.Amount }} / {{ benefitCreateAt(benefit.CreateAt) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { api } from 'boot/axios'
import moment from 'moment'

export default defineComponent({
  setup() {
    const store = useStore()

    const user = computed({
      get: () => store.state.user.user
    })

    return {
      store,
      splitterModel: ref(20),
      tab: ref('myServices'),
      user,
      orders: ref([]),
      benefits: ref([])
    }
  },
  mounted: function () {
    var thiz = this

    api.post('/cloud-hashing-apis/v1/get/orders/detail/by/app/user')
    .then(function (resp) {
      let orders = []
      resp.data.Details.forEach(info => {
        if (info.Payment != null) {
          orders.push(info)
        }
      });
      thiz.orders = orders
    })
    .catch(function (error) {
      console.log(error)
    })

    api.post('/cloud-hashing-billing/v1/get/user/benefits/by/app/user')
    .then(function (resp) {
      thiz.benefits = resp.data.Infos
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    userBenefitsByOrder: function (order) {
      return this.benefits.filter(val => {
        return val.OrderID == order.ID
      })
    },
    benefitCreateAt: function (unixTimestamp) {
      return moment(unixTimestamp * 1000).format('MM/DD/YYYY hh:mm')
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

.my-content
  background-color: white
  height: 100%
  padding-left: 20px

</style>
