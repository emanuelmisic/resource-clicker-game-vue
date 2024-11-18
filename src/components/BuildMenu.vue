<template>
  <div class="dialog">
    <button class="close-btn" @click="close()">&#10060;</button>
    <structure
      v-for="s in structuresList"
      :key="s.id"
      :structure-id="s.id"
      type="menu"
      @buy="$emit('buy-structure', $event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Structure from "@/components/Structure.vue";
import { StructureObject } from "@/helpers/types";

export default defineComponent({
  name: "BuildMenuDialog",
  components: {
    Structure,
  },
  props: {
    structures: Array,
  },
  data() {
    return {
      structuresList: [] as StructureObject[],
    };
  },
  watch: {
    structures: {
      immediate: true,
      handler(v) {
        this.structuresList = v ?? [];
      },
    },
  },
  methods: {
    close() {
      console.log("Close the menu");
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
  gap: 5px;

  border: 2px solid green;
}

.dialog .close-btn {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
