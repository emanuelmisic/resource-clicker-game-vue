<template>
  <nav class="main-nav">
    <ul id="resources">
      <template v-for="(n, key) in resourcesObject" :key="key">
        <li
          v-if="showResource(String(key))"
          v-html="`${getIcon(String(key))} ${n}`"
        ></li>
      </template>
    </ul>
    <ul id="actions">
      <li>
        <button @click="openMenu('build')">BUILD</button>
        <!-- achievements -->
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  getBuiltStructureFromResource,
  getIcon,
} from "@/helpers/globalMethods";

export default defineComponent({
  name: "MainNavComponent",
  props: {
    builtStructures: Array,
    resources: Object,
  },
  data() {
    return {
      resourcesObject: {} as { [key: string]: number },
      builtStructuresList: [] as string[],
    };
  },
  watch: {
    resources: {
      immediate: true,
      handler(v) {
        this.resourcesObject = v;
      },
    },
    builtStructures: {
      immediate: true,
      handler(v) {
        this.builtStructuresList = v;
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
    showResource(key: string) {
      if (!this.builtStructuresList) return false;
      return (
        getBuiltStructureFromResource(this.builtStructuresList, key) != null
      );
    },
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Funnel+Display:wght@300..800&family=Hanalei+Fill&family=Itim&family=Slackey&display=swap");

.main-nav {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: center;
  height: 60px;
  background: #fffec4;
  background: -moz-linear-gradient(top, #fffec4 0%, #ffdb59 70%, #d2921a 100%);
  background: -webkit-linear-gradient(
    top,
    #fffec4 0%,
    #ffdb59 70%,
    #d2921a 100%
  );
  background: linear-gradient(to bottom, #fffec4 0%, #ffdb59 70%, #d2921a 100%);
}

.main-nav ul {
  display: flex;
}

.main-nav ul li {
  margin-right: 10px;
  list-style-type: none;
  font-size: 1.3rem;
}
</style>
