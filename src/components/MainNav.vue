<template>
  <nav class="main-nav">
    <ul id="resources">
      <template v-for="(value, key) in resourcesStore.resources" :key="key">
        <li v-if="showResource(key as string)">
          <icon :name="`${key}`" size="small" />
          {{ value }}
        </li>
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

<script setup lang="ts">
import { defineEmits, defineOptions } from "vue";
import { useResourcesStore } from "@/stores/resourcesStore";
import { useStructuresStore } from "@/stores/structuresStore";
import { getBuiltStructureFromResource } from "@/helpers/globalMethods";

import Icon from "@/components/IconComponent.vue";

defineOptions({
  name: "MainNav",
  components: {
    Icon,
  },
});
const structuresStore = useStructuresStore();
const resourcesStore = useResourcesStore();

const emit = defineEmits<{
  "open-menu": [menuType: string];
}>();

function openMenu(menuType: string) {
  emit("open-menu", menuType);
}

function showResource(key: string) {
  if (!structuresStore.builtStructures) return false;
  return (
    getBuiltStructureFromResource(structuresStore.builtStructures, key) != null
  );
}
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
  background: -moz-linear-gradient(top, #fffec4 0%, #ffdb59 80%, #d2921a 100%);
  background: -webkit-linear-gradient(
    top,
    #fffec4 0%,
    #ffdb59 80%,
    #d2921a 100%
  );
  background: linear-gradient(to bottom, #fffec4 0%, #ffdb59 80%, #d2921a 100%);
}

.main-nav ul {
  display: flex;
}

.main-nav ul li {
  display: flex;
  margin-right: 10px;
  list-style-type: none;
  font-size: 1.3rem;
}
</style>
