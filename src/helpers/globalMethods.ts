import { STRUCTURES } from "./constants";
import { BuiltStructureObject } from "./types";

function getBuiltStructureFromResource(
  builtStructuresList: BuiltStructureObject[],
  resource: string
): BuiltStructureObject | null {
  let strObj = null;
  for (const k in STRUCTURES) {
    if (STRUCTURES[k].resource_name === resource) strObj = STRUCTURES[k];
  }
  if (!strObj) return null;
  for (const k in builtStructuresList) {
    if (builtStructuresList[k].id === (strObj.id as string))
      return builtStructuresList[k];
  }
  return null;
}

export { getBuiltStructureFromResource };
