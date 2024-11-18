export const STRUCTURES = [
  {
    id: "wood_cutter",
    resource_name: "wood",
    structure_name: "Wood Cutter",
    icon: "tree",
  },
  {
    id: "stone_quarry",
    resource_name: "stone",
    structure_name: "Stone Quarry",
    icon: "stone",
    build_cost: {
      wood: 50,
    },
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
