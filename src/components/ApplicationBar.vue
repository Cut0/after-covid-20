<template lang="pug">
  v-app-bar(color="#68B787" app fixed collapse-on-scroll dark)
    v-app-bar-nav-icon(aria-label="ページアイコン")
      v-icon(v-if="$route.name==='ホーム'") $home
      v-icon(v-if="$route.name==='検索'") $search
      v-icon(v-if="$route.name==='通知一覧'") $notification
      v-icon(v-if="$route.name==='設定'") $config
    v-toolbar-title {{this.$route.name}}
    v-spacer
</template>
