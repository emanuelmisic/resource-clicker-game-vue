<template>
  <alert-window ref="alert" />
  <main-nav
    :built-structures="structuresStore.builtStructures"
    :resources="resourcesStore.resources"
    @open-menu="openMenu($event)"
  />
  <game-window :built-structures="structuresStore.builtStructures" />
  <build-menu
    :is-open="isBuildMenuOpen"
    @build-structure="buyStructure('build', $event)"
    @close="isBuildMenuOpen = false"
    @upgrade-structure="buyStructure('upgrade', $event)"
  />
</template>

<script setup lang="ts">
import { defineOptions, ref } from "vue";
import { useResourcesStore } from "@/stores/resourcesStore";
import { useStructuresStore } from "@/stores/structuresStore";
import { StructureCostType, StructureObject } from "@/helpers/types";

import AlertWindow from "@/components/AlertWindow.vue";
import MainNav from "@/components/MainNav.vue";
import GameWindow from "@/components/GameWindow.vue";
import BuildMenu from "@/components/BuildMenu.vue";

defineOptions({
  name: "MainView",
  components: {
    AlertWindow,
    MainNav,
    GameWindow,
    BuildMenu,
  },
});
const resourcesStore = useResourcesStore();
const structuresStore = useStructuresStore();

const alert = ref(null);
const isBuildMenuOpen = ref(false);

function openMenu(menuType: string) {
  if (menuType === "build") isBuildMenuOpen.value = true;
}

function triggerAlert(type: string, msg: string) {
  if (alert.value)
    (alert.value as InstanceType<typeof AlertWindow>).trigger(type, msg);
}

function buyStructure(action: string, s: StructureObject) {
  if (!s || !action) return;
  const cost = structuresStore.getStructureCost(action, s);
  const isStructureAffordable = _calculateIfStructureIsAffordable(cost);

  if (!isStructureAffordable) {
    triggerAlert("error", "Not enough materials!");
    return;
  }
  _payForStructure(cost);

  if (action === "build") {
    structuresStore.buildStructure(s);
    triggerAlert("success", `Bought ${s.structure_name}!`);
  } else {
    structuresStore.upgradeStructure(s.id);
    triggerAlert("success", `Successfully upgraded ${s.structure_name}!`);
  }
}

function _calculateIfStructureIsAffordable(cost: StructureCostType) {
  for (const key in resourcesStore.resources) {
    if (cost && cost[key] > resourcesStore.getResource(key)) return false;
  }
  return true;
}

function _payForStructure(cost: StructureCostType) {
  for (const k in cost) {
    resourcesStore.resources[k] -= cost[k];
  }
}
</script>
