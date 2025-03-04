<script setup>
import { RouterView } from 'vue-router'
import Notification from './components/Notification.vue';
import CourseList from './views/CourseList.vue';
</script>

<template>
  <router-view />
  <Notification/>
  <CourseList/>
</template>
