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
        <q-btn-toggle
          v-model="model"
          class="lang-toggle"
          no-caps
          rounded
          unelevated
          toggle-color="primary"
          color="white"
          text-color="primary"
          size="8px"
          :options="[
            {label: '中文', value: 'one'},
            {label: '英文', value: 'two'}
          ]"
        />
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
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  setup () {
    return {
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