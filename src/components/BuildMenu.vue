<template>
  <div v-if="isOpen" class="dialog">
    <button class="close-btn" @click="$emit('close')">&#10060;</button>
    <structure
      v-for="s in structuresStore.structures"
      :key="s.id"
      :is-structure-unlocked="getIsStructureUnlocked(s)"
      :structure-id="s.id"
      :structure-level="getBuiltStructureLevel(s.id)"
      type="menu"
      @build="$emit('build-structure', $event)"
      @upgrade="$emit('upgrade-structure', $event)"
    />
  </div>
  <div v-if="isOpen" class="dialog-overlay"></div>
</template>

<script setup lang="ts">
import { defineOptions, defineProps, ref } from "vue";
import { useStructuresStore } from "@/stores/structuresStore";
import { StructureObject } from "@/helpers/types";

import Structure from "@/components/StructureComponent.vue";

defineOptions({
  name: "BuildMenuDialog",
  components: {
    Structure,
  },
});
const structuresStore = useStructuresStore();

defineProps({
  isOpen: Boolean,
});

function getBuiltStructureLevel(id: string): number {
  const list = structuresStore.builtStructures;
  for (const k in list) {
    if (list[k].id === id) {
      return list[k].level;
    }
  }
  return 0;
}

function getIsStructureUnlocked(structure: StructureObject) {
  if (!structure.unlock_requirement) return true;
  for (const k in structuresStore.builtStructures) {
    if (structuresStore.builtStructures[k].id === structure.unlock_requirement)
      return true;
  }
  return false;
}
</script>

<style>
.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 30px;
  transform: translate(-50%, -50%);
  z-index: 1;

  display: flex;
  gap: 20px;

  border: 4px solid #a27400;
  border-radius: 10px;
  background-color: #ffe4c1;
}

.dialog .close-btn {
  position: absolute;
  top: 0;
  right: 0;
}

.dialog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.5;
}
</style>
