export type StructureObject = {
  id: string;
  resource_name: string;
  structure_name: string;
  icon: string;
  build_cost?: { [key: string]: number };
};
