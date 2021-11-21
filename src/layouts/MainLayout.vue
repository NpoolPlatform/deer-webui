<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="container">
      <q-toolbar class="toolbar">
        <q-icon name="mic" style="color: #616161; font-size: 1.5rem;" />
        <q-carousel
          v-model="slide"
          animated
          infinite
          vertical
          autoplay
          height="1.5rem"
        >
          <q-carousel-slide
            v-for="(announcement, index) in announcements" @click="onAnnouncementClick(announcement.url)"
            :key="index"
            :name="index"
            class="padding-0">
            <div class="text-subtitle2 text-grey-8 bg-grey-1 fill-parent">
              <a :href="announcement.url">{{ announcement.title }}</a>
            </div>
          </q-carousel-slide>
        </q-carousel>
        <q-space />
        <q-btn v-if="user.logined" flat class="text-grey-8 text-caption">{{ $t('MENU.DEPOSIT_ELETRICAL_FEE') }}</q-btn>
        <q-select
          v-model="locale"
          :options="[
            { value: 'en-US', label: $t('LANG.ENGLISH') },
            { value: 'zh-CN', label: $t('LANG.CHINESE') }
          ]"
          :label="$t('LANG.LANGUAGE')"
          dense
          borderless
          emit-value
          map-options
          options-dense
        >
          <template v-slot:prepend>
            <q-icon name="language" color="blue" />
          </template>
        </q-select>
      </q-toolbar>
      <q-toolbar style="height: 60px;" class="header">
        <q-btn flat class="margin-0" style="padding: 0 40px 0 0;" @click="onLogoClick">
          <img src="logo/logo.png" style="width: 80px;">
        </q-btn>
        <q-tabs v-model="tab" class="text-grey-8 main-tabs" inline-label indicator-color="blue" active-color="blue">
          <q-tab name="mainpage" icon="whatshot" :label="$t('MENU.MAINPAGE')" />
          <q-tab name="goods" icon="storefront" :label="$t('MENU.POWERGOODS')" />
          <q-tab name="help" icon="help" :label="$t('MENU.HELP')" />
          <q-tab name="aboutus" icon="group" :label="$t('MENU.ABOUTUS')" />
        </q-tabs>
        <q-space />
        <div v-if="user.logined" class="row">
          <q-btn flat :label="$t('MENU.MYASSETS')" color="grey-8">
            <template v-slot:prepend>
              <q-icon name="language" color="blue" />
            </template>
          </q-btn>
          <q-btn-dropdown
            split
            color="grey-6"
            dense
            push
            no-caps
            flat
            :label="username"
            icon="person_outline"
            @click="onUserInfoClick"
          >
            <q-list dense>
              <q-item clickable v-close-popup @click="onMyOrdersClick">
                <q-item-section side>
                  <q-icon name="menu_book" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ $t('MENU.MYORDERS') }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onDepositPowerFeeClick">
                <q-item-section side>
                  <q-icon name="power" color="secondary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ $t('MENU.DEPOSIT_ELETRICAL_FEE') }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onMyCouponsClick">
                <q-item-section side>
                  <q-icon name="card_giftcard" color="accent" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ $t('MENU.MYCOUPONS') }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onInvitationsClick">
                <q-item-section side>
                  <q-icon name="insert_invitation" color="dark" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ $t('MENU.INVITATIONS') }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onSettingsClick">
                <q-item-section side>
                  <q-icon name="settings" color="positive" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ $t('MENU.SETTING') }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onExitClick">
                <q-item-section side>
                  <q-icon name="exit_to_app" color="info" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ $t('MENU.EXIT') }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="arrow_right_alt" color="amber" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn dense flat icon="notifications_none" color="grey-6">
            <q-badge v-if="newMessages > 0" floating rounded dense color="red" align="middle">{{ newMessages }}</q-badge>
          </q-btn>
        </div>
        <div v-else class="row">
          <q-btn
            dense
            class="login-btn"
            rounded
            @click="onLoginClick">
            {{ $t('BUTTON.LOGIN') }}
          </q-btn>
          <q-btn
            dense
            class="register-btn"
            rounded
            @click="onRegisterClick">
            {{ $t('BUTTON.REGISTER') }}
          </q-btn>
        </div>
        <q-btn dense flat icon="share" color="blue"></q-btn>
      </q-toolbar>
    </q-header>
    
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'MainLayout',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    const $store = useStore()
    const q = useQuasar()

    const appInfo = computed ({
      set: val => {
        $store.commit('appInfo/updateAppInfo', val)
      },
      get: () => $store.state.appInfo.appInfo
    })

    const user = computed ({
      get: () => $store.state.user.user
    })

    return {
      newMessages: 0,
      locale,
      slide: ref(0),
      announcements: [
        {
          title: 'A frog jump over a brown fox',
          url: 'http://localhost:8080',
        }, {
          title: 'A frog jump over another brown fox',
          url: 'http://localhost:8080',
        }
      ],
      tab: ref('mainpage'),
      appInfo,
      q,
      user
    }
  },
  created() {
    this.appInfo = {
      id: '7e395ecd-1ea0-43c4-b9d5-52ff668331bd'
    }
    this.q.cookies.set('AppID', this.appInfo.id)
  },
  methods: {
    onAnnouncementClick: function (url) {

    },
    onUserInfoClick: function () {

    },
    onMyOrdersClick: function () {

    },
    onDepositPowerFeeClick: function () {

    },
    onMyCouponsClick: function () {

    },
    onInvitationsClick: function () {

    },
    onSettingsClick: function () {

    },
    onExitClick: function () {

    },
    onRegisterClick: function () {
      this.$router.push({
        path: 'signup',
        query: {
          by: 'email'
        }
      })
    },
    onLoginClick: function () {
      this.$router.push({
        path: 'signin',
        query: {
          by: 'email'
        }
      })
    },
    onLogoClick: function () {
      this.$router.push({
        path: '/',
      })
    }
  },
  computed: {
    username: function () {
      return this.user.info.Username
    }
  }
})
</script>

<style lang="sass" scoped>
.padding-0
  padding: 0

.margin-0
  margin: 0

.fill-parent
  width: 100%
  height: 100%

.lang-toggle
  border: 1px solid #027be3

.container
  background-color: white

.toolbar
  background-color: $grey-2
  min-height: 28px
  padding: 0 100px 0 100px

.header
  height: 60px
  padding: 0 100px 0 100px

.login-btn
  border: solid 1px $indigo-8
  margin: 5px
  color: $indigo-8
  font-size: 12px
  width: 100px

.register-btn
  border: solid 1px $indigo-8
  margin: 5px
  background-color: $indigo-8
  font-size: 12px
  width: 100px

.main-tabs
  border-bottom: solid 1px $grey-4
</style>