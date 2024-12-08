<template>
  <div v-if="msg && type === 'success'" class="alert alert--success">
    {{ msg }}
  </div>
  <div v-else-if="msg && type === 'error'" class="alert alert--error">
    {{ msg }}
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";

export default defineComponent({
  name: "AlertWindowComponent",
  props: {
    msg: String,
    type: { type: String, default: "success" },
  },
  setup(props, { emit }) {
    watch(
      () => props.msg,
      () => {
        setTimeout(() => {
          emit("clear-msg");
        }, 5000);
      }
    );
  },
});
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
