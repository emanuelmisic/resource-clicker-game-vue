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
