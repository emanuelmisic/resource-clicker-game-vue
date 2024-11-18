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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Structure from "@/components/Structure.vue";
import { StructureObject } from "@/helpers/types";
import { getLevel } from "@/helpers/globalMethods";

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
  data() {
    return {
      open: false,
      structuresList: [] as StructureObject[],
      builtStructuresList: [] as string[],
    };
  },
  watch: {
    structures: {
      immediate: true,
      handler(v) {
        this.structuresList = v ?? [];
      },
    },
    builtStructures: {
      immediate: true,
      handler(v) {
        this.builtStructuresList = v ?? [];
      },
    },
  },
  methods: {
    getBuiltStructureLevel(id: string): number {
      for (const k in this.builtStructuresList) {
        if (this.builtStructuresList[k].includes(id)) {
          return getLevel(this.builtStructuresList[k]);
        }
      }
      return 0;
    },
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
</style>
