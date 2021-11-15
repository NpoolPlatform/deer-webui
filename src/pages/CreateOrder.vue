<template>
  <div class="container">
    <div class="row">
      <div class="order-confirm-text">{{$t('GENERAL.CONFIRM_WITHDRAW_ADDRESS') }}</div>
      <q-space />
      <div class="order-manage-text">{{ $t('GENERAL.MANAGE_WITHDRAW_ADDRESS') }}</div>
    </div>
    <q-separator />
    <div class="order-addresses">
      <div
        v-for="withdrawAddress in withdrawAddresses"
        :key="withdrawAddress.address"
        class="row"
        :class="withdrawAddress.currentUsed ? 'order-default-withdraw-address' : ''"
      >
        <div v-if="withdrawAddress.currentUsed" class="row">
          <q-icon class="order-title-icon" name="account_balance_wallet" color="blue-8" size="1.2rem"></q-icon>
          <div class="order-title-text">{{ $t('GENERAL.WITHDRAW_TO') }}</div>
        </div>
        <div v-else class="order-title-occupied">
        </div>
        
        <q-radio
          v-model="currentWithdrawAddress"
          class="order-withdraw-address"
          size="1.5rem"
          :val="withdrawAddress.address"
          :label="withdrawAddress.address" />
        
        <div class="order-withdraw-username">{{ username }}</div>
        <div
          v-if="withdrawAddress.remark != undefined && withdrawAddress.remark != ''"
          class="order-withdraw-remark">
          ({{ withdrawAddress.remark }})
        </div>
        <q-space />
        <div class="order-manage-text order-modify-text">{{ $t('GENERAL.MODIFY_THIS_ADDRESS') }}</div>
      </div>

      <div class="order-manage-text order-manage-text-inside">{{ $t('GENERAL.USE_OTHER_WITHDRAW_ADDRESS') }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      withdrawAddresses: [
        {
          address: '1F6eVWEz2ZQ5M41PbLz417i9JKUY7oCFnVAAA',
          currentUsed: false,
          remark: 'KK的默认地址'
        }, {
          address: '1F6eVWEz2ZQ5M41PbLz417i9JKUY7oCFnVBBB',
          currentUsed: false,
        }, {
          address: '1F6eVWEz2ZQ5M41PbLz417i9JKUY7oCFnVCCC',
          currentUsed: false,
        }, {
          address: '1F6eVWEz2ZQ5M41PbLz417i9JKUY7oCFnVDDD',
          currentUsed: false,
        }, {
          address: '1F6eVWEz2ZQ5M41PbLz417i9JKUY7oCFnVEEE',
          currentUsed: true,
        }
      ],
      currentWithdrawAddress: ref('1F6eVWEz2ZQ5M41PbLz417i9JKUY7oCFnVEEE'),
      username: 'kikakkz@hotmail.com'
    }
  },
  computed: {
    goodId: function () {
      return this.$route.query.goodId
    },
    good: function () {
      return this.$store.state.good.goods[this.goodId]
    },
    posters: function () {
      return this.good.posters.slice(0, Math.min(4, this.good.posters.length))
    }
  },
  methods: {
    onWithdrawAddressUpdate: function (val, evt) {
      console.log(val, evt)
    }
  },
  watch: {
    currentWithdrawAddress: function (val) {
      this.withdrawAddresses.forEach(addr => {
        addr.currentUsed =  false
        if (val === addr.address) {
          addr.currentUsed = true
        }
      })
    }
  }
})
</script>

<style lang="sass" scoped>
.container
  width: 100%
  padding: 0 100px 0 100px
  margin-top: 20px

.order-confirm-text
  font-weight: bold
  color: $grey-8

.order-manage-text
  color: blue
  font-size: 12px

.order-modify-text
  line-height: 25px
  margin-right: 10px

.order-title-icon
  width: 25px
  height: 25px

.order-title-text
  line-height: 25px
  color: $blue-6
  font-weight: bold
  font-size: 10px
  width: 67px

.order-title-occupied
  width: 93px

.order-default-withdraw-address
  border: 1px solid blue
  background-color: $blue-1

.order-manage-text-inside
  margin: 10px 0 10px 120px

.order-withdraw-address
  font-weight: bold
  color: $grey-8
  font-size: 12px
  line-height: 24px
  margin: 0 0 0 20px
  width: 300px

.order-withdraw-username
  color: $grey-6
  font-size: 12px
  line-height: 24px
  margin-left: 20px

.order-withdraw-remark
  color: $grey-8
  font-size: 12px
  line-height: 24px
  margin-left: 20px

.order-addresses
  margin-top: 10px
  margin-bottom: 10px
</style>
