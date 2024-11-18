<template>
  <nav class="main-nav">
    <ul id="resources">
      <li v-html="`${getIcon('wood')} ${resourcesObject.wood}`"></li>
      <li v-html="`${getIcon('stone')} ${resourcesObject.stone}`"></li>
    </ul>
    <ul id="actions">
      <li>
        <button @click="openMenu('build')">BUILD</button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getIcon } from "@/helpers/globalMethods";

export default defineComponent({
  name: "MainNavComponent",
  props: {
    resources: Object,
  },
  data() {
    return {
      resourcesObject: {} as { [key: string]: number },
    };
  },
  watch: {
    resources: {
      immediate: true,
      handler(v) {
        this.resourcesObject = v;
      },
    },
  },
  methods: {
    getIcon(icon: string) {
      return getIcon(icon);
    },
    openMenu(menu: string) {
      this.$emit("open-menu", menu);
    },
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
