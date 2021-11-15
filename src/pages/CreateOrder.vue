<template>
  <div class="container">
    <div class="row">
      <div class="order-confirm-text">{{$t('GENERAL.CONFIRM_WITHDRAW_ADDRESS') }}</div>
      <q-space />
      <div class="order-manage-text">{{ $t('GENERAL.MANAGE_WITHDRAW_ADDRESS') }}</div>
    </div>
    <q-separator />
    <div class="order-section order-section-odd">
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
        <div v-if="withdrawAddress.currentUsed" class="order-manage-text order-modify-text">{{ $t('GENERAL.MODIFY_THIS_ADDRESS') }}</div>
      </div>

      <div class="order-manage-text order-manage-text-inside">{{ $t('GENERAL.USE_OTHER_WITHDRAW_ADDRESS') }}</div>
    </div>

    <div class="order-section-space">
      <div class="order-confirm-text">{{$t('GENERAL.SELECT_MINING_POOL') }}</div>
      <q-separator />
      <div class="row">
        <div class="order-item-label">{{ $t('GENERAL.SELECT_CONNECT_MINING_POOL') }}</div>
        <q-btn
            dense
            class="order-select-mining-pool-btn"
            rounded>
            BTC.com
          </q-btn>
          <q-btn
            dense
            class="order-select-mining-pool-btn"
            rounded>
            Viabtc
          </q-btn>
      </div>
    </div>

    <div class="order-section-space">
      <div class="order-confirm-text">{{$t('GENERAL.POWER_FEE') }}</div>
      <q-separator />
      <div class="order-section order-section-odd">
        <div class="row">
          <div class="order-item-label">{{ $t('GENERAL.FIRST_ELECTRICAL_FEE_DURATION') }}</div>
          <q-btn
              dense
              class="order-select-mining-pool-btn"
              rounded>
              10 {{ $t('GENERAL.DAYS') }}
            </q-btn>
            <q-btn
              dense
              class="order-select-mining-pool-btn"
              rounded>
              30 {{ $t('GENERAL.DAYS') }}
            </q-btn>
            <q-btn
              dense
              class="order-select-mining-pool-btn"
              rounded>
              60 {{ $t('GENERAL.DAYS') }}
            </q-btn>
            <q-btn
              dense
              class="order-select-mining-pool-btn"
              rounded>
              {{ $t('GENERAL.SAME_AS_DEAL') }}
            </q-btn>
        </div>
        <div class="row">
          <div class="order-item-label">{{ $t('GENERAL.USER_DEFINE_DAYS') }}</div>
          <q-input
            v-model="powerFeeDays"
            outlined
            dense
            :label="$t('GENERAL.OTHER_DAYS')"
            class="order-other-days"
            />
        </div>
        <div class="row order-continuation-way">
          <div class="order-item-label">{{ $t('GENERAL.CONTINUATION_ELECTRICAL_FEE_METHOD') }}</div>
          <q-btn
              dense
              class="order-select-mining-pool-btn"
              rounded>
              {{ $t('GENERAL.CONTINUATION_BY_MANUAL') }}
            </q-btn>
            <q-btn
              dense
              class="order-select-mining-pool-btn"
              rounded>
              {{ $t('GENERAL.CONTINUATION_BY_WALLET') }}
            </q-btn>
            <q-btn
              dense
              class="order-select-mining-pool-btn"
              rounded>
              {{ $t('GENERAL.CONTINUATION_BY_BALANCE') }}
            </q-btn>
        </div>
      </div>
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
      username: 'kikakkz@hotmail.com',
      powerFeeDays: ''
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
  margin: 10px 0 0 120px

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

.order-section
  margin-top: 10px
  margin-bottom: 10px
  padding-bottom: 10px
  padding-top: 10px

.order-section-space
  margin-top: 40px

.order-select-mining-pool-btn
  color: white
  background-color: $blue-4
  margin-top: 10px
  margin-right: 10px
  width: 200px

.order-other-days
  height: 25px
  line-height: 25px
  padding-top: 10px
  width: 200px

.order-item-label
  width: 110px
  line-height: 32px
  margin-top: 10px
  margin-right: 10px
  font-size: 12px
  color: $grey-7

.order-section-odd
  background-color: $blue-1
  padding: 10px

.order-continuation-way
  padding-top: 8px
  padding-bottom: 10px
</style>
