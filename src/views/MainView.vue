<template>
  <alert-window
    :msg="alertMessage"
    :type="alertType"
    @clear-msg="alertMessage = ''"
  />
  <main-nav :resources="resources" @open-menu="openMenu($event)" />
  <game-window
    :built-structures="builtStructures"
    @add-resource="addResource($event)"
  />
  <build-menu
    :built-structures="builtStructures"
    :is-open="isBuildMenuOpen"
    :structures="structures"
    @build-structure="buyStructure('build', $event)"
    @close="isBuildMenuOpen = false"
    @upgrade-structure="buyStructure('upgrade', $event)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { STRUCTURES } from "@/helpers/constants";
import { StructureObject } from "@/helpers/types";

import AlertWindow from "@/components/AlertWindow.vue";
import MainNav from "@/components/MainNav.vue";
import GameWindow from "@/components/GameWindow.vue";
import BuildMenu from "@/components/BuildMenu.vue";
import { getLevel } from "@/helpers/globalMethods";

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
        wood: 200,
        stone: 0,
      } as { [key: string]: number },
      alertMessage: "",
      alertType: "",
      isBuildMenuOpen: false,
    };
  },
  mounted() {
    this.structures = STRUCTURES as StructureObject[];
    this.builtStructures = ["wood_cutter:1"];
  },
  methods: {
    addResource(e: { res: string; amount: number }) {
      this.resources[e.res] += e.amount;
    },
    openMenu(menu: string) {
      if (menu === "build") this.isBuildMenuOpen = true;
    },
    getBuiltStructureLevel(id: string) {
      let result = 0;
      for (const k in this.builtStructures) {
        if (this.builtStructures[k].includes(id)) {
          result = getLevel(this.builtStructures[k]);
          break;
        }
      }
      return result;
    },
    buyStructure(action: string, s: StructureObject) {
      if (!s || !action) return;
      const cost =
        action === "build"
          ? s.build_cost
          : s.upgrade_costs[this.getBuiltStructureLevel(s.id) - 1];

      for (const k in this.resources) {
        if (cost && cost[k] > this.resources[k]) {
          this.alertType = "error";
          this.alertMessage = "Not enough materials!";
          return;
        }
      }

      // buy the structure
      for (const k in cost) {
        this.resources[k] -= cost[k];
      }
      if (action === "build") {
        this.builtStructures.push(`${s.id}:1`);
        this.alertType = "success";
        this.alertMessage = `Bought ${s.structure_name}!`;
      } else {
        for (const k in this.builtStructures) {
          if (this.builtStructures[k].includes(s.id)) {
            const level = getLevel(this.builtStructures[k]);
            this.builtStructures[k] = `${s.id}:${level + 1}`;
            this.alertType = "success";
            this.alertMessage = `Upgraded ${s.structure_name}!`;
          }
        }
      }
    },
  },
});
</script>
