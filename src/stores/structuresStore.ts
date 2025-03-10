import { STRUCTURES } from "@/helpers/constants";
import {
  BuiltStructureObject,
  StructureCostType,
  StructureObject,
} from "@/helpers/types";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useStructuresStore = defineStore("structures", () => {
  const builtStructures = reactive<BuiltStructureObject[]>([
    {
      id: "wood_cutter",
      level: 1,
    },
  ]);
  const structures = reactive<StructureObject[]>(STRUCTURES);

  function getStructureCost(
    action: string,
    structure: StructureObject
  ): StructureCostType {
    return action === "build"
      ? structure.build_cost
      : structure.upgrade_costs[
          (getBuiltStructureLevel(structure.id) as number) - 1
        ];
  }

  function getBuiltStructure(id: string) {
    for (const i in builtStructures) {
      if (builtStructures[i].id === id) return builtStructures[i];
    }
  }

  function getBuiltStructureLevel(id: string) {
    for (const i in builtStructures) {
      if (builtStructures[i].id === id) return builtStructures[i].level;
    }
  }

  function buildStructure(structure: StructureObject) {
    builtStructures.push({ id: structure.id, level: 1 });
  }

  function upgradeStructure(id: string) {
    for (const i in builtStructures) {
      if (builtStructures[i].id === id) {
        builtStructures[i].level++;
      }
    }
  }

  return {
    builtStructures,
    structures,
    getStructureCost,
    getBuiltStructure,
    getBuiltStructureLevel,
    buildStructure,
    upgradeStructure,
  };
});
