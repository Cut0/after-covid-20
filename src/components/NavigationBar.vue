<template lang="pug">
  v-bottom-navigation(
    v-if="$vuetify.breakpoint.xs"
    background-color="#68B787" app fixed grow dark)
    v-btn(to="/" aria-label="ページ")
      v-icon $home
    v-btn(to="/search" aria-label="検索ページ")
      v-icon $search
    v-btn(to="/ranking" aria-label="ランキングページ")
      v-icon $crown
    v-btn(to="/notifications" aria-label="通知ページ")
      v-icon $notification
    v-btn(to="/config" aria-label="設定ページ")
      v-icon $config
</template>
