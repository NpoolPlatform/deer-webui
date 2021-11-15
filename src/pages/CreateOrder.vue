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
      <div class="row order-section">
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

    <div class="order-section-space">
      <div class="order-confirm-text">{{$t('GENERAL.CONFIRM_DEAL_INFO') }}</div>
      <q-separator />
      <div class="row order-section">
        <div class="order-deal-info-title order-deal-info-good">{{ $t('GENERAL.GOOD') }}</div>
        <div class="order-deal-info-title order-deal-info-production-types">{{ $t('GENERAL.PRODUCTION_COIN_TYPES') }}</div>
        <div class="order-deal-info-title order-deal-info-combo-units">{{ $t('GENERAL.COMBO_UNITS') }}</div>
        <div class="order-deal-info-title order-deal-info-combo-duration">{{ $t('GENERAL.COMBO_DURATION') }}</div>
        <div class="order-deal-info-title order-deal-info-start-time">{{ $t('GENERAL.COMBO_START_TIME') }}</div>
        <div class="order-deal-info-title order-deal-info-daily-price">{{ $t('GENERAL.DAILY_PRICE') }}</div>
        <div class="order-deal-info-title order-deal-info-price">{{ $t('GENERAL.PRICE') }}</div>
        <div class="order-deal-info-title order-deal-info-units">{{ $t('GENERAL.UNITS') }}</div>
        <div class="order-deal-info-title order-deal-info-preferential">{{ $t('GENERAL.PREFERENTIAL') }}</div>
        <div class="order-deal-info-title order-deal-info-history-production">{{ $t('GENERAL.HISTORY_PRODUCTION') }}</div>
        <div class="order-deal-info-title order-deal-info-expect-production">{{ $t('GENERAL.EXPECT_PRODUCTION') }}</div>
        <div class="order-deal-info-title order-deal-info-summary">{{ $t('GENERAL.SUMMARY') }}</div>
      </div>
      <div class="row order-deal-info-section">
        <div class="row order-deal-info-good">
          <img class="order-deal-info-good-poster" :src="poster" />
          <div>
            <div class="row order-deal-info-good-info">
              <div class="order-deal-info-good-title">{{ good.title }}</div>
              <div>
                <q-badge
                  v-for="badge in good.badges"
                  :key="badge"
                  :color="badgeColors[randomNumber() % badgeColors.length]"
                  class="order-deal-info-good-badge"
                >
                  {{ badge }}
                </q-badge>
              </div>
            </div>
            <div class="row no-wrap items-center order-deal-info-good-rating">
              <q-rating size="18px" v-model="stars" :max="5" color="primary" />
              <span class="text-caption text-grey q-ml-sm">{{ good.rating }} ({{ good.rateCount }})</span>
            </div>
          </div>
        </div>

        <div class="row order-deal-info-production-types order-deal-info-content">
          {{ good.cointype }}
        </div>

        <div class="row order-deal-info-combo-units order-deal-info-content">
          {{ goodCount }}
        </div>

        <div class="row order-deal-info-combo-duration order-deal-info-content">
          {{ good.duration }} {{ $t('GENERAL.DAYS') }}
        </div>

        <div class="row order-deal-info-start-time order-deal-info-content">
          TBD
        </div>

        <div class="row order-deal-info-daily-price order-deal-info-content">
          TBD
        </div>

        <div class="row order-deal-info-price order-deal-info-content">
          {{ good.pricecurrencychar }} {{ good.price }}
        </div>

        <div class="row order-deal-info-units order-deal-info-content">
          {{ good.amount }} {{ good.unit }}
        </div>

        <div class="row order-deal-info-preferential order-deal-info-content">
          TBD
        </div>

        <div class="row order-deal-info-history-production order-deal-info-content">
          TBD
        </div>

        <div class="row order-deal-info-expect-production order-deal-info-content">
          TBD
        </div>

        <div class="row order-deal-info-summary order-deal-info-content">
          {{ good.pricecurrencychar }} {{ good.price }}
        </div>
      </div>

      <div class="row order-deal-info-section">
        <div class="row order-deal-info-good order-deal-info-content-left">
          {{ powerFeeDays }} {{ $t('GENERAL.DAYS_ELECTRICAL_FEE_COMNO') }}
        </div>

        <div class="row order-deal-info-production-types order-deal-info-content">
          -
        </div>

        <div class="row order-deal-info-combo-units order-deal-info-content">
          {{ goodCount }}
        </div>

        <div class="row order-deal-info-combo-duration order-deal-info-content">
          {{ good.duration }} {{ $t('GENERAL.DAYS') }}
        </div>

        <div class="row order-deal-info-start-time order-deal-info-content">
          TBD
        </div>

        <div class="row order-deal-info-daily-price order-deal-info-content">
          TBD
        </div>

        <div class="row order-deal-info-price order-deal-info-content">
          {{ good.pricecurrencychar }} {{ good.price }}
        </div>

        <div class="row order-deal-info-units order-deal-info-content">
          {{ good.amount }} {{ good.unit }}
        </div>

        <div class="row order-deal-info-preferential order-deal-info-content">
          TBD
        </div>

        <div class="row order-deal-info-history-production order-deal-info-content">
          TBD
        </div>

        <div class="row order-deal-info-expect-production order-deal-info-content">
          TBD
        </div>

        <div class="row order-deal-info-summary order-deal-info-content">
          {{ good.pricecurrencychar }} {{ good.price }}
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
      powerFeeDays: '',
      badgeColors: [
        'primary', 'secondary', 'accent', 'positive', 'negative', 'blue-6', 'green-4', 'orange-4', 'deep-purple-8'
      ],
      goodCount: 1
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
    },
    poster: function () {
      if (this.good.posters.length > 0) {
        return this.good.posters[0]
      }
      return 'logo/btc.png'
    },
    stars: function () {
      return this.good.rating
    }
  },
  methods: {
    onWithdrawAddressUpdate: function (val, evt) {
      console.log(val, evt)
    },
    randomNumber : function (){
      return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
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
  padding: 10px

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

.order-continuation-way
  padding-top: 8px
  padding-bottom: 10px

.order-deal-info-title
  border-bottom: solid 3px $blue-3
  text-align: center
  color: $grey-6
  font-size: 12px
  margin-left: 1px
  margin-right: 1px

.order-deal-info-good
  width: 400px

.order-deal-info-production-types
  width: 120px

.order-deal-info-combo-units
  width: 80px

.order-deal-info-combo-duration
  width: 120px

.order-deal-info-start-time
  width: 100px

.order-deal-info-daily-price
  width: 100px

.order-deal-info-price
  width: 120px

.order-deal-info-units
  width: 120px

.order-deal-info-preferential
  width: 200px

.order-deal-info-history-production
  width: 100px

.order-deal-info-expect-production
  width: 100px

.order-deal-info-good-poster
  margin: 10px
  width: 60px

.order-deal-info-good-info
  padding: 10px 0 0 10px
  flex: 1

.order-deal-info-good-title
  font-size: 16px
  margin: 5px
  font-weight: bold
  color: $grey-8

.order-deal-info-good-badge
  margin: 9px 0 5px 5px

.order-deal-info-good-rating
  margin-left: 10px

.order-deal-info-content
  height: 60px
  margin: 10px 1px 10px 1px
  line-height: 60px
  text-align: center
  font-size: 18px
  color: $grey-8
  font-weight: bold
  display: inline
  border-left: solid 1px $grey-4

.order-deal-info-content-left
  text-align: left
  height: 60px
  margin: 10px 1px 10px 10px
  line-height: 60px
  font-size: 18px
  color: $grey-8
  font-weight: bold
  display: inline
  width: 390px

.order-deal-info-summary
  flex: 1

.order-deal-info-section
  background-color: $light-green-1
  margin: 3px 10px 0 10px
</style>
