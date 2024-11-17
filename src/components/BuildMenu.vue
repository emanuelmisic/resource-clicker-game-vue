<template>
  <div class="dialog">
    <button class="close-btn" @click="close()">&#10060;</button>
    <structure type="menu" @buy="$emit('buy-structure')" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Structure from "@/components/Structure.vue";

export default defineComponent({
  name: "BuildMenuDialog",
  components: {
    Structure,
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

  border: 2px solid green;
}

.dialog .close-btn {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
