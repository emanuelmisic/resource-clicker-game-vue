<template>
  <nav class="main-nav">
    <ul id="resources">
      <template v-for="(n, key) in resourcesObject" :key="key">
        <li v-if="showResource(key as string)">
          <icon :icon-name="`${key}`" icon-size="small" />
          {{ n }}
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

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { getBuiltStructureFromResource } from "@/helpers/globalMethods";
import { BuiltStructureObject } from "@/helpers/types";

import Icon from "@/components/Icon.vue";

export default defineComponent({
  name: "MainNavComponent",
  components: {
    Icon,
  },
  props: {
    builtStructures: Array,
    resources: Object,
  },
  setup(props, { emit }) {
    const resourcesObject = ref<{ [key: string]: number }>({});
    const builtStructuresList = ref<BuiltStructureObject[]>([]);

    const openMenu = (menu: string) => {
      emit("open-menu", menu);
    };

    const showResource = (key: string) => {
      if (!builtStructuresList.value) return false;
      return (
        getBuiltStructureFromResource(builtStructuresList.value, key) != null
      );
    };

    watch(
      () => props.resources,
      (newValue) => {
        resourcesObject.value = newValue || {};
      },
      { immediate: true }
    );

    watch(
      () => props.builtStructures,
      (newValue) => {
        builtStructuresList.value = newValue as BuiltStructureObject[];
      },
      { immediate: true }
    );

    return {
      resourcesObject,
      builtStructuresList,
      openMenu,
      showResource,
    };
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
  display: flex;
  margin-right: 10px;
  list-style-type: none;
  font-size: 1.3rem;
}
</style>
