<template>
  <nav class="main-nav">
    <ul id="resources">
      <li v-html="`${$getIcon('wood')} ${resources.wood}`"></li>
      <li v-html="`${$getIcon('stone')} ${resources.stone}`"></li>
    </ul>
    <ul id="actions">
      <li>
        <button>BUILD</button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainNavComponent",
  props: {
    resources: Object,
  },
});
</script>

<style>
.main-nav {
  display: flex;
  justify-content: space-between;
  height: 60px;
  background-color: beige;
}

.main-nav ul li {
  list-style-type: none;
  font-size: 1.5rem;
}
</style>
