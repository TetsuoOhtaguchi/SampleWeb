<script lang="ts" setup>
// import { ref } from 'vue'
import WFooter from '../components/WFooter/WFooter.vue'
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <!-- ページコンポーネント -->
    <q-page-container>
      <router-view />
    </q-page-container>
    <WFooter />
  </q-layout>
</template>
