<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background: #ffffff;">
      <q-toolbar class="bg-grey-1" style="padding: 0 100px 0 100px; min-height: 32px;">
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
            v-for="announcement in announcements" @click="onAnnouncementClick(announcement.url)"
            :key="announcement.title"
            :name="announcement.title"
            class="padding-0">
            <div class="text-subtitle2 text-grey-8 bg-grey-1 fill-parent">
              <a :href="announcement.url">{{ announcement.title }}</a>
            </div>
          </q-carousel-slide>
        </q-carousel>
        <q-space />
        <q-btn flat class="text-grey-8 text-caption">{{ $t('MENU.DEPOSIT_ELETRICAL_FEE') }}</q-btn>
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
      <q-toolbar style="padding: 0 100px 0 100px; height: 60px;">
        <q-btn flat class="margin-0" style="padding: 0 40px 0 0;">
          <img src="logo/logo.png" style="width: 80px;">
        </q-btn>
        <q-tabs v-model="tab" class="text-grey-8" inline-label indicator-color="blue" active-color="blue">
          <q-tab name="goods" icon="storefront" :label="$t('MENU.POWERGOODS')" />
          <q-tab name="help" icon="help" :label="$t('MENU.HELP')" />
        </q-tabs>
        <q-space />
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
      </q-toolbar>
    </q-header>
    
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'MainLayout',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
      slide: ref('style'),
      model: ref('one'),
      announcements: [
        {
          title: 'A frog jump over a brown fox',
          url: 'http://localhost:8080',
        }, {
          title: 'A frog jump over another brown fox',
          url: 'http://localhost:8080',
        }
      ],
      tab: ref('goods'),
      username: 'kikakkz@hotmail.com'
    }
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
</style>