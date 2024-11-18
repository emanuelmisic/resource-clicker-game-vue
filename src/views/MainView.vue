<template>
  <alert-window
    :msg="alertMessage"
    :type="alertType"
    @clear-msg="alertMessage = ''"
  />
  <main-nav :resources="resources" />
  <game-window
    :built-structures="builtStructures"
    @add-resource="addResource($event)"
  />
  <build-menu :structures="structures" @buy-structure="buyStructure($event)" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { STRUCTURES } from "@/helpers/constants";
import { StructureObject } from "@/helpers/types";

import AlertWindow from "@/components/AlertWindow.vue";
import MainNav from "@/components/MainNav.vue";
import GameWindow from "@/components/GameWindow.vue";
import BuildMenu from "@/components/BuildMenu.vue";

export default defineComponent({
  name: "MainView",
  components: {
    AlertWindow,
    MainNav,
    GameWindow,
    BuildMenu,
  },
  data() {
    return {
      structures: [] as StructureObject[],
      builtStructures: [] as Array<string>,
      resources: {
        wood: 45,
        stone: 0,
      } as { [key: string]: number },
      alertMessage: "",
      alertType: "",
    };
  },
  mounted() {
    this.structures = STRUCTURES as StructureObject[];
    this.builtStructures = ["wood_cutter"];
  },
  methods: {
    addResource(e: { res: string; amount: number }) {
      this.resources[e.res] += e.amount;
    },
    buyStructure(s: StructureObject) {
      if (!s) return;
      for (const k in this.resources) {
        if (s.build_cost && s.build_cost[k] > this.resources[k]) {
          this.alertType = "error";
          this.alertMessage = "Not enough materials!";
          return;
        }
      }
      // buy the structure
      for (const k in s.build_cost) {
        this.resources[k] -= s.build_cost[k];
      }
      this.builtStructures.push(s.id as string);
      this.alertType = "success";
      this.alertMessage = `Bought ${s.structure_name}!`;
    },
  },
});
</script>
