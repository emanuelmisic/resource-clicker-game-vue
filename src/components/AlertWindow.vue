<template>
  <div v-if="show" class="alert" :class="alertTypeClass">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { defineOptions, defineExpose, ref, computed } from "vue";

defineOptions({
  name: "AlertWindowComponent",
});

const show = ref(false);
const text = ref("");
const type = ref("success");
const timeout = ref(0);

const alertTypeClass = computed<string>(() => {
  switch (type.value) {
    case "success":
      return "alert--success";
    case "error":
      return "alert--error";
    default:
      return "";
  }
});

function trigger(alertType: string, message: string) {
  text.value = message;
  type.value = alertType;

  showAlert();
}

function showAlert() {
  if (timeout.value) clearTimeout(timeout.value);
  show.value = true;

  timeout.value = setTimeout(() => {
    show.value = false;
  }, 3000);
}

defineExpose({ trigger });
</script>

<style>
.alert {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translate(-50%, 0);
  font-weight: bold;
  z-index: 999;

  padding: 15px;
  border: 5px outset #a27400;
  border-radius: 5px;

  background: #e2a200;
  background: -moz-linear-gradient(top, #e2a200 0%, #a27400 50%, #715100 100%);
  background: -webkit-linear-gradient(
    top,
    #e2a200 0%,
    #a27400 50%,
    #715100 100%
  );
  background: linear-gradient(to bottom, #e2a200 0%, #a27400 50%, #715100 100%);
}

.alert--success {
  color: #075a00;
}

.alert--error {
  color: #640800;
}
</style>
