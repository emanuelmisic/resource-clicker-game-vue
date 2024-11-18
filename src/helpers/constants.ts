import { StructureObject } from "./types";

export const STRUCTURES: StructureObject[] = [
  {
    id: "wood_cutter",
    resource_name: "wood",
    structure_name: "Wood Cutter",
    icon: "tree",
    resource_add_amounts: [1, 2, 3],
    upgrade_costs: [{ wood: 45 }, { wood: 100, stone: 30 }],
  },
  {
    id: "stone_quarry",
    resource_name: "stone",
    structure_name: "Stone Quarry",
    icon: "stone",
    resource_add_amounts: [1, 2, 3],
    build_cost: {
      wood: 50,
    },
    upgrade_costs: [{ wood: 200 }, { wood: 350, stone: 90 }],
  },
];

export const ICONS: { [key: string]: string } = {
  // resources
  wood: "&#129717;",
  stone: "&#129704;",
  // buildings
  tree: "&#127795;",
  saw: "",
};
