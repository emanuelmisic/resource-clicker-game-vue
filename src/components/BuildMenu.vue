<template>
  <div v-if="isOpen" class="dialog">
    <button class="close-btn" @click="$emit('close')">&#10060;</button>
    <structure
      v-for="s in structuresList"
      :key="s.id"
      :structure-id="s.id"
      :structure-level="getBuiltStructureLevel(s.id)"
      type="menu"
      @build="$emit('build-structure', $event)"
      @upgrade="$emit('upgrade-structure', $event)"
    />
  </div>
  <div v-if="isOpen" class="dialog-overlay"></div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { BuiltStructureObject, StructureObject } from "@/helpers/types";

import Structure from "@/components/Structure.vue";

export default defineComponent({
  name: "BuildMenuDialog",
  components: {
    Structure,
  },
  props: {
    builtStructures: Array,
    isOpen: Boolean,
    structures: Array,
  },
  setup(props) {
    const open = ref(false);
    const structuresList = ref<StructureObject[]>([]);
    const builtStructuresList = ref<BuiltStructureObject[]>([]);

    watch(
      () => props.structures,
      (newValue) =>
        (structuresList.value = (newValue as StructureObject[]) ?? [])
    );
    watch(
      () => props.builtStructures,
      (newValue) =>
        (builtStructuresList.value =
          (newValue as BuiltStructureObject[]) ?? []),
      { immediate: true }
    );

    function getBuiltStructureLevel(id: string): number {
      const list = builtStructuresList.value;
      for (const k in list) {
        if (list[k].id === id) {
          return list[k].level;
        }
      }
      return 0;
    }

    return {
      open,
      structuresList,
      builtStructuresList,
      getBuiltStructureLevel,
    };
  },
});
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
