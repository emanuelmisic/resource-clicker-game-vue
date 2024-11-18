<template>
  <main-view />
</template>

<script lang="ts">
import MainView from "./views/MainView.vue";

export default {
  components: {
    MainView,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-size: 12px;
  box-sizing: border-box;
}

button {
  cursor: pointer;
}
</style>
