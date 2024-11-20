export type StructureCostType = { [key: string]: number };

export type StructureObject = {
  id: string;
  resource_name: string;
  structure_name: string;
  icon: string;
  resource_add_amounts: number[];
  upgrade_costs: StructureCostType[];
  build_cost?: StructureCostType;
};

export type BuiltStructureObject = {
  id: string;
  level: number;
};
