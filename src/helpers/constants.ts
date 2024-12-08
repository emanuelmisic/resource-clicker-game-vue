import { StructureObject } from "./types";

export const STRUCTURES: StructureObject[] = [
  {
    id: "wood_cutter",
    resource_name: "wood",
    structure_name: "Wood Cutter",
    icon: "tree",
    resource_add_amounts: [1, 2, 3],
    unlock_requirement: null,
    build_cost: {},
    upgrade_costs: [{ wood: 45 }, { wood: 100, stone: 30 }],
  },
  {
    id: "stone_quarry",
    resource_name: "stone",
    structure_name: "Stone Quarry",
    icon: "stone",
    resource_add_amounts: [1, 2, 3],
    unlock_requirement: "wood_cutter",
    build_cost: {
      wood: 50,
    },
    upgrade_costs: [{ wood: 200 }, { wood: 350, stone: 90 }],
  },
  {
    id: "clay_pit",
    resource_name: "clay",
    structure_name: "Clay Pit",
    icon: "clay",
    resource_add_amounts: [1, 2, 3],
    unlock_requirement: "stone_quarry",
    build_cost: {
      wood: 150,
      stone: 50,
    },
    upgrade_costs: [
      { wood: 350, stone: 150 },
      { wood: 800, stone: 450, clay: 100 },
    ],
  },
];
