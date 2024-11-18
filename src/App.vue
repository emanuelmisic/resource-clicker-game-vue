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
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Funnel+Display:wght@300..800&family=Hanalei+Fill&family=Itim&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Slackey&display=swap");

* {
  margin: 0;
  padding: 0;
  font-size: 12px;
  box-sizing: border-box;
  font-family: "Roboto", "sans-serif";
}

button {
  cursor: pointer;
}
</style>
