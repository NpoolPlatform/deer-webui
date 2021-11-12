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
          arrows=false
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
        <q-btn flat class="text-grey-8 text-caption">{{ $t('GENERAL.DEPOSIT_ELETRICAL_FEE') }}</q-btn>
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
      <q-toolbar style="padding: 0 100px 0 100px;">
        <q-icon name="mic" style="color: #616161; font-size: 1.5rem;" />
      </q-toolbar>
    </q-header>
    
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
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
          title: "A frog jump over a brown fox",
          url: "http://localhost:8080",
        }, {
          title: "A frog jump over another brown fox",
          url: "http://localhost:8080",
        }
      ]
    }
  },
  methods: {
    onAnnouncementClick: function(url) {

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