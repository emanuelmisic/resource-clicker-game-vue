<template>
  <section class="game-window">
    <structure
      v-for="id in buildings"
      :key="id"
      :structure-id="id"
      @add="$emit('add-resource', $event)"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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
