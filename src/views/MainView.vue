<template>
  <main-nav :resources="resources" />
  <game-window @add-resource="addResource($event)" />
  <build-menu @buy-structure="buyStructure($event)" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainNav from "@/components/MainNav.vue";
import GameWindow from "@/components/GameWindow.vue";
import BuildMenu from "@/components/BuildMenu.vue";

export default defineComponent({
  name: "MainView",
  components: {
    MainNav,
    GameWindow,
    BuildMenu,
  },
  data() {
    return {
      resources: {
        wood: 0,
        stone: 0,
      } as { [key: string]: number },
    };
  },
  methods: {
    addResource(e: { res: string; amount: number }) {
      this.resources[e.res] += e.amount;
    },
    buyStructure(e: any) {
      console.log("BUYING");
    },
  },
});
</script>
