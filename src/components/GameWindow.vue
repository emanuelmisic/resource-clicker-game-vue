<template>
  <section class="game-window">
    <structure
      v-for="item in buildings"
      :key="item.id"
      :structure-id="item.id"
      :structure-level="item.level"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { BuiltStructureObject } from "@/helpers/types";

import Structure from "@/components/StructureComponent.vue";

export default defineComponent({
  name: "GameWindowComponent",
  components: {
    Structure,
  },
  props: {
    structures: Array,
    builtStructures: Array,
  },
  setup(props) {
    const buildings = ref<BuiltStructureObject[]>([]);

    watch(
      () => props.builtStructures,
      (newValue) => (buildings.value = newValue as BuiltStructureObject[]),
      { immediate: true }
    );

    return { buildings };
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
