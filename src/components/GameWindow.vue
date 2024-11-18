<template>
  <section class="game-window">
    <structure
      v-for="item in buildings"
      :key="getId(item)"
      :structure-id="getId(item)"
      :structure-level="getLevel(item)"
      @add="$emit('add-resource', $event)"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Structure from "@/components/Structure.vue";
import { getLevel } from "@/helpers/globalMethods";

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
      buildings: [] as Array<string>,
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
  methods: {
    getId(item: string): string {
      return item.split(":")[0];
    },
    getLevel(item: string): number {
      return getLevel(item);
    },
  },
});
</script>

<style>
.game-window {
  display: flex;
  gap: 5px;
  height: 100%;
  width: 100%;
  border: 1px solid blue;
}
</style>
