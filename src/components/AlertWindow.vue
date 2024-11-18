<template>
  <div v-if="msg && type === 'success'" class="alert alert--success">
    {{ msg }}
  </div>
  <div v-else-if="msg && type === 'error'" class="alert alert--error">
    {{ msg }}
  </div>
</template>

<script lang="ts">
export default {
  name: "AlertWindowComponent",
  props: {
    msg: String,
    type: { type: String, default: "success" },
  },
  watch: {
    msg() {
      setTimeout(() => {
        // eslint-disable-next-line
        (this as any).$emit("clear-msg");
      }, 5000);
    },
  },
};
</script>

<style>
.alert {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translate(-50%, 0);

  padding: 10px;
  border: 1px solid black;
}

.alert--success {
  background-color: rgb(200, 250, 130);
}

.alert--error {
  background-color: rgb(200, 130, 130);
}
</style>
