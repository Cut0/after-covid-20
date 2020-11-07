<template lang="pug">
  v-bottom-navigation(
    v-if="$vuetify.breakpoint.xs"
    background-color="#68B787" app fixed grow dark shift)
    v-btn.nav-button(to="/" aria-label="ページ")
      span ホーム
      v-icon $home
    v-btn.nav-button(to="/ranking" aria-label="ランキングページ")
      span ランキング
      v-icon $crown
    v-btn.nav-button(to="/notifications" aria-label="通知ページ")
      span 通知
      v-icon $notification
    v-btn.nav-button(to="/config" aria-label="設定ページ")
      span 設定
      v-icon $config
</template>
<style lang="sass">
.nav-button
  height: 56px !important
</style>
