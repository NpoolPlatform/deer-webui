<template>
  <div class="row signin-container">
    <q-space />
    <div>
      <div class="login-panel">
        <q-tabs
          v-model="loginType"
          active-color="blue-6"
          class="text-grey-8 login-panel-tab"
          inline-label
          align="justify"
        >
          <q-tab name="email" icon="email" :label="$t('GENERAL.EMAIL')" />
          <q-tab name="phoneno" icon="phone_android" :label="$t('GENERAL.PHONE_NO')" />
        </q-tabs>
        
        <q-tab-panels v-model="loginType" animated>
          <q-tab-panel class="login-input-panel" name="email">
            <q-input stack-label type="email" v-model="email" :label="$t('GENERAL.EMAIL_ADDRESS')" />
            <q-input stack-label type="password" v-model="password" :label="$t('GENERAL.PASSWORD')" />
          </q-tab-panel>
          <q-tab-panel class="login-input-panel" name="phoneno">
            <q-input stack-label v-model="phoneno" :label="$t('GENERAL.PHONE_NO')" />
            <q-input stack-label type="password" v-model="password" :label="$t('GENERAL.PASSWORD')" />
          </q-tab-panel>
        </q-tab-panels>

        <q-btn
          dense
          class="sign-in-btn"
          :label="$t('GENERAL.SIGN_IN')"
          @click="onSigninClick"
          rounded>
        </q-btn>

        <div class="row">
          <div class="login-opration">{{ $t('GENERAL.FORGET_PASSWORD') }}</div>
          <q-space />
          <div class="login-opration">{{ $t('GENERAL.CREATE_ACCOUNT') }}</div>
        </div>
      </div>
    </div>
    <q-space />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { api } from 'boot/axios'
import { fail } from '../notify/notify'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const $store = useStore()

    const user = computed ({
      get: () => $store.state.user.user,
      set: val => {
        $store.commit('user/updateUser', val)
      }
    })

    return {
      loginType: ref('email'),
      email: ref(''),
      phoneno: ref(''),
      password: ref(''),
      user
    }   
  },
  methods: {
    onSigninClick: function () {
      var thiz = this

      api.post('/login-door/v1/login', {
        Email: this.email,
        Phone: this.phoneno,
        Password: this.password
      })
      .then(function (resp) {
        thiz.user = {
          logined: true,
          info: resp.data.Info
        }
        thiz.$router.push({
          path: '/',
        })
      })
      .catch(function (error) {
        fail(undefined, thiz.$t('GENERAL.FAIL_SIGNIN'), error)
      })
    }
  }
})
</script>

<style lang="sass" scoped>
.signin-container
  padding-top: 200px

.login-panel
  width: 400px

.login-panel-tab
  border-bottom: solid 1px $grey-4

.login-input-panel
  padding: 0

.login-input
  font-size: 12px

.sign-in-btn
  color: white
  background-color: $blue-4
  margin-top: 20px
  margin-right: 20px
  width: 400px

.login-opration
  margin-top: 20px
  font-size: 10px
  color: blue
</style>
