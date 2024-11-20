<template>
  <alert-window
    :msg="alertMessage"
    :type="alertType"
    @clear-msg="alertMessage = ''"
  />
  <main-nav
    :built-structures="builtStructures"
    :resources="resources"
    @open-menu="openMenu($event)"
  />
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
import { BuiltStructureObject, StructureObject } from "@/helpers/types";

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
      builtStructures: [] as BuiltStructureObject[],
      resources: {
        wood: 500,
        stone: 500,
        clay: 100,
      } as { [key: string]: number },
      alertMessage: "",
      alertType: "",
      isBuildMenuOpen: false,
    };
  },
  mounted() {
    this.structures = STRUCTURES as StructureObject[];
    this.builtStructures = [
      {
        id: "wood_cutter",
        level: 1,
      },
    ];
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
        if (this.builtStructures[k].id === id) {
          result = this.builtStructures[k].level;
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
        this.builtStructures.push({ id: s.id, level: 1 });
        this.alertType = "success";
        this.alertMessage = `Bought ${s.structure_name}!`;
      } else {
        for (const k in this.builtStructures) {
          if (this.builtStructures[k].id === s.id) {
            const level = this.builtStructures[k].level;
            this.builtStructures[k] = {
              ...this.builtStructures[k],
              level: level + 1,
            };
            this.alertType = "success";
            this.alertMessage = `Successfully upgraded ${s.structure_name}!`;
          }
        }
      }
    },
  },
});
</script>
