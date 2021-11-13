<template>
  <div>
    <div class="banner">
      <div class="left-banner">
        <h3 class="slogan-main">{{ $t('SLOGAN.MINEME_MAIN') }}</h3>
        <h5 class="slogan-subtitle">{{ $t('SLOGAN.MINEME_SUBTITLE') }}</h5>
        <q-btn class="start-btn" icon-right="arrow_right_alt" rounded>{{ $t('BUTTON.START_MINE_NOW') }}</q-btn>
      </div>
      <q-carousel
          v-model="slide"
          animated
          infinite
          autoplay
          height="280px"
          style="margin: 100px 0 100px 0; background-color: yellow;"
        >
          <q-carousel-slide
            v-for="slider in sliders" @click="onBannerSliderClick(slider.url)"
            :key="slider.label"
            :name="slider.label"
            style="padding: 0; margin: 0;">
            <img :src="slider.image" class="slider-img" />
          </q-carousel-slide>
        </q-carousel>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PageIndex',
  setup () {
    return {
      slide: ref('style'),
      sliders: [
        {
          label: 'slider-1',
          image: 'images/slider-1.jpg',
          url: 'http://localhost:8080',
        }, {
          label: 'slider-2',
          image: 'images/slider-2.png',
          url: 'http://localhost:8080',
        }, {
          label: 'slider-3',
          image: 'images/slider-3.png',
          url: 'http://localhost:8080',
        }, {
          label: 'slider-4',
          image: 'images/slider-4.png',
          url: 'http://localhost:8080',
        }
      ]
    }
  },
  methods: {
    onBannerSliderClick: function(url) {

    }
  }
})
</script>

<style lang="sass" scoped>
.banner
  background-image: url("../../public/images/background_main_banner.png")
  height: 500px
  padding: 0 100px 0 100px
  display: flex

.left-banner
  width: 60%
  padding-top: 150px

.slogan-main
  color: #aaaaaa
  width: 100%
  margin: 0

.slogan-subtitle
  color: #cccccc
  margin: 10px 0 10px 0

.start-btn
  color: $grey-4
  background-color: $indigo-8
  margin-top: 30px
  width: 250px

.slider-img
  height: 280px
  margin: 0
  padding: 0
  background-color: red
</style>