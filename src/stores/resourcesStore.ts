import { defineStore } from "pinia";
import { reactive } from "vue";

export const useResourcesStore = defineStore("resources", () => {
  const resources = reactive<{ [key: string]: number }>({
    wood: 500,
    stone: 500,
    clay: 100,
  });

  function getResource(type: string) {
    return resources[type];
  }

  function addResource(type: string, amount: number) {
    resources[type] += amount;
  }
  // function payResource(type: string, amount: number) {}

  return { resources, getResource, addResource };
});
