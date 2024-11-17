<template>
  <section class="game-window">
    <structure
      v-for="s in structures"
      :key="s.id"
      :btn-text="`Add ${s.resourceName}`"
      :icon="s.icon"
      :name="s.structureName"
      @add="$emit('add-resource', { res: s.resourceName, amount: 1 })"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { STRUCTURES } from "@/helpers/constants";
import Structure from "@/components/Structure.vue";

type StructuresType = typeof STRUCTURES;

export default defineComponent({
  name: "GameWindowComponent",
  components: {
    Structure,
  },
  data() {
    return {
      structures: [] as StructuresType,
    };
  },
  mounted() {
    this.structures = STRUCTURES as StructuresType;
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
