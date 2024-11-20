<template>
  <section class="game-window">
    <structure
      v-for="item in buildings"
      :key="item.id"
      :structure-id="item.id"
      :structure-level="item.level"
      @add="$emit('add-resource', $event)"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BuiltStructureObject } from "@/helpers/types";

import Structure from "@/components/Structure.vue";

export default defineComponent({
  name: "GameWindowComponent",
  components: {
    Structure,
  },
  props: {
    structures: Array,
    builtStructures: Array,
  },
  data() {
    return {
      buildings: [] as BuiltStructureObject[],
    };
  },
  watch: {
    builtStructures: {
      immediate: true,
      handler(v) {
        this.buildings = v;
      },
    },
  },
});
</script>

<style>
.game-window {
  padding: 1rem;
  display: flex;
  gap: 1rem;
  width: 100%;
  height: calc(100vh - 60px);

  background-color: #74b06b;
}
</style>
