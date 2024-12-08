export type StructureCostType = { [key: string]: number };

export type StructureObject = {
  id: string;
  resource_name: string;
  structure_name: string;
  icon: string;
  resource_add_amounts: number[];
  unlock_requirement: string | null;
  build_cost: StructureCostType;
  upgrade_costs: StructureCostType[];
};

export type BuiltStructureObject = {
  id: string;
  level: number;
};
