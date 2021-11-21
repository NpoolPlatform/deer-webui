<template>
  <div class="row signin-container">
    <q-space />
    <div>
      <div class="signup-panel">
        <q-tabs
          v-model="loginType"
          active-color="blue-6"
          class="text-grey-8 signup-panel-tab"
          inline-label
          align="justify"
        >
          <q-tab name="email" icon="email" :label="$t('GENERAL.EMAIL')" />
          <q-tab name="phoneno" icon="phone_android" :label="$t('GENERAL.PHONE_NO')" />
        </q-tabs>
        
        <q-tab-panels v-model="loginType" animated>
          <q-tab-panel class="signup-input-panel" name="email">
            <q-input stack-label type="email" v-model="email" :label="$t('GENERAL.EMAIL_ADDRESS')" />
            <q-input stack-label v-model="verificationCode" :label="$t('GENERAL.VERIFICATION_CODE')">
              <template v-slot:append>
                <q-btn
                  class="signup-send-verification-code"
                  :label="$t('GENERAL.SEND_VERIFICATION_CODE')"
                  @click="onSendEmailVerificationCodeClick"/>
              </template>
            </q-input>
            <q-input stack-label type="password" v-model="password" :label="$t('GENERAL.PASSWORD')" />
          </q-tab-panel>
          <q-tab-panel class="signup-input-panel" name="phoneno">
            <q-input stack-label v-model="phoneno" :label="$t('GENERAL.PHONE_NO')" />
            <q-input stack-label v-model="verificationCode" :label="$t('GENERAL.VERIFICATION_CODE')">
              <template v-slot:append>
                <q-btn
                  class="signup-send-verification-code"
                  :label="$t('GENERAL.SEND_VERIFICATION_CODE')"
                  @click="onSendPhoneVerificationCodeClick"/>
              </template>
            </q-input>
            <q-input stack-label type="password" v-model="password" :label="$t('GENERAL.PASSWORD')" />
          </q-tab-panel>
        </q-tab-panels>

        <q-btn
          dense
          class="sign-in-btn"
          :label="$t('GENERAL.SIGNUP_NOW')"
          @click="onSignupClick"
          rounded>
        </q-btn>

        <div class="row signup-user-terms">
          <q-space />
          <div class="row signup-click-agree">{{ $t('GENERAL.CLICK_AGREE') }}</div>
          <div class="row signup-terms-of-use">{{ $t('GENERAL.TERMS_OF_USE') }}</div>
          <q-space />
        </div>

        <div class="row">
          <div class="signup-opration">{{ $t('GENERAL.ALREADY_HAS_ACCOUNT') }}</div>
          <q-space />
          <div class="signup-opration">{{ $t('GENERAL.QUESTION_CONTACT') }}</div>
        </div>
      </div>
    </div>
    <q-space />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { api } from 'boot/axios'
import { success, fail, waiting } from '../notify/notify'

export default defineComponent({
  setup() {
    return {
      loginType: ref('email'),
      email: ref(''),
      phoneno: ref(''),
      password: ref(''),
      verificationCode: ref(''),
    }   
  },
  methods: {
    onSignupClick: function () {
      var thiz = this
      api.post('/user-management/v1/signup', {
        Password: this.password,
        EmailAddress: this.email,
        PhoneNumber: this.phoneno,
        Code: this.verificationCode,
        AppId: this.appInfo.id
      })
      .then(function (resp) {
        thiz.$router.push({
          path: 'signin',
          query: {
            by: 'email'
          }
        })
      })
      .catch(function (error) {
        const msg = thiz.$t('GENERAL.FAIL_REGISTER') + error + '(' + error.response + ')'
        fail(undefined, msg)
      })
    },
    onSendPhoneVerificationCodeClick: function () {

    },
    onSendEmailVerificationCodeClick: function () {
      const notif = waiting(this.$t('GENERAL.EMAIL_SENDING'))

      var thiz = this
      api.post('/verification-door/v1/send/email', {
        Email: this.email
      })
      .then(function (resp) {
        const msg = thiz.$t('GENERAL.EMAIL_SENT') + thiz.email + ', ' + thiz.$t('GENERAL.CHECK_EMAIL')
        success(notif, msg)
      })
      .catch(function (error) {
        const msg = thiz.$t('GENERAL.FAIL_EMAIL_SEND') + error + '(' + error.response.data + ')'
        fail(notif, msg)
      })
    },
    
  },
  computed: {
    appInfo: function () {
      return this.$store.state.appInfo.appInfo
    }
  }
})
</script>

<style lang="sass" scoped>
.signin-container
  padding-top: 200px

.signup-panel
  width: 400px

.signup-panel-tab
  border-bottom: solid 1px $grey-4

.signup-input-panel
  padding: 0

.signup-input
  font-size: 12px

.sign-in-btn
  color: white
  background-color: $blue-4
  margin-top: 20px
  margin-right: 20px
  width: 400px

.signup-opration
  font-size: 10px
  color: blue

.signup-send-verification-code
  margin: 5px
  background-color: $grey-2
  font-size: 8px

.signup-user-terms
  margin: 20px

.signup-click-agree
  font-size: 8px
  color: $grey-6
  margin-right: 5px

.signup-terms-of-use
  font-size: 8px
  color: $blue-6
  font-weight: bold
  border-bottom: solid 1px blue
</style>
