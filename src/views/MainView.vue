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
import { defineComponent, onMounted, reactive, ref } from "vue";
import { STRUCTURES } from "@/helpers/constants";
import {
  BuiltStructureObject,
  StructureCostType,
  StructureObject,
} from "@/helpers/types";

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
  setup() {
    const isBuildMenuOpen = ref(false);
    const resources = reactive<{ [key: string]: number }>({
      wood: 500,
      stone: 500,
      clay: 100,
    });
    const alertMessage = ref("");
    const alertType = ref("");
    const structures = ref<StructureObject[]>([]);
    const builtStructures = ref<BuiltStructureObject[]>([
      {
        id: "wood_cutter",
        level: 1,
      },
    ]);

    onMounted(() => {
      structures.value = STRUCTURES as StructureObject[];
    });

    function openMenu(menuType: string) {
      if (menuType === "build") isBuildMenuOpen.value = true;
    }

    function addResource(e: { res: string; amount: number }) {
      resources[e.res] += e.amount;
    }

    function buyStructure(action: string, s: StructureObject) {
      if (!s || !action) return;
      const cost = _getStructureCost(action, s);

      const isStructureAffordable =
        _calculateIfStructureIsAffordable(resources);
      if (!isStructureAffordable) {
        alertType.value = "error";
        alertMessage.value = "Not enough materials!";
        return;
      }
      _payForStructure(cost);

      if (action === "build") _buildStructure(s);
      else _upgradeStructure(s);
    }

    function _getStructureCost(
      action: string,
      structure: StructureObject
    ): StructureCostType {
      return action === "build"
        ? structure.build_cost
        : structure.upgrade_costs[__getBuiltStructureLevel(structure.id) - 1];
    }

    function _calculateIfStructureIsAffordable(cost: StructureCostType) {
      for (const k in resources) {
        if (cost && cost[k] > resources[k]) return false;
      }
      return true;
    }

    function _payForStructure(cost: StructureCostType) {
      for (const k in cost) {
        resources[k] -= cost[k];
      }
    }

    function _buildStructure(structure: StructureObject) {
      builtStructures.value.push({ id: structure.id, level: 1 });
      alertType.value = "success";
      alertMessage.value = `Bought ${structure.structure_name}!`;
    }

    function _upgradeStructure(structure: StructureObject) {
      const bs = builtStructures.value;
      for (const k in bs) {
        if (bs[k].id === structure.id) {
          const level = bs[k].level;
          builtStructures.value[k] = {
            ...bs[k],
            level: level + 1,
          };
          alertType.value = "success";
          alertMessage.value = `Successfully upgraded ${structure.structure_name}!`;
          return;
        }
      }
    }

    function __getBuiltStructureLevel(id: string) {
      let result = 0;
      const bs = builtStructures.value;
      for (const k in bs) {
        if (bs[k].id === id) {
          return bs[k].level;
        }
      }
      return result;
    }

    return {
      isBuildMenuOpen,
      resources,
      alertMessage,
      alertType,
      structures,
      builtStructures,
      openMenu,
      addResource,
      buyStructure,
    };
  },
});
</script>
