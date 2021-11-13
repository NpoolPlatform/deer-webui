<template>
  <q-card class="recommend-good">
    <q-item>
      <q-item-section avatar>
        <img :src="good.coinlogo" class="good-coinlogo">
      </q-item-section>
      <q-item-section>
        <h6>{{ good.title }}</h6>
        <div>
          <q-badge
            v-for="badge in good.badges"
            :key="badge"
            :color="badgeColors[randomNumber() % badgeColors.length]"
          >
            {{ badge }}
          </q-badge>
        </div>
      </q-item-section>
    </q-item>
    <q-card-actions>
      <q-btn flat round color="red" icon="favorite" />
      <q-btn flat round color="teal" icon="bookmark" />
      <q-btn flat round color="primary" icon="share" />
      <q-btn flat round color="accent" icon="camera_indoor" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RecommentGood',
  props: {
    good: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      badgeColors: [
        'primary', 'secondary', 'accent', 'positive', 'negative'
      ]
    }
  },
  methods: {
    randomNumber : function(){
      return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    }
  }
})
</script>

<style lang="sass" scoped>
.recommend-good
  width: 100%
  margin: 10px

.good-coinlogo
  width: 50px
  height: 50px

h6
  font-size: 18px
  color: $grey-8
  margin: 0
</style>
