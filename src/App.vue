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
  font-family: "Itim", "cursive";
  padding: 5px;
  background: #ffee73;
  background: -moz-linear-gradient(top, #ffee73 0%, #ffc25e 50%, #b06a30 100%);
  background: -webkit-linear-gradient(
    top,
    #ffee73 0%,
    #ffc25e 50%,
    #b06a30 100%
  );
  background: linear-gradient(to bottom, #ffee73 0%, #ffc25e 50%, #b06a30 100%);
}

button:hover {
  transform: scale(1.1);
}

button:disabled {
  transform: scale(1);
}

button:active {
  transform: scale(1);
}
</style>
