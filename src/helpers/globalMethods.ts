import { STRUCTURES } from "./constants";

function getLevel(item: string): number {
  const arr = item.split(":");
  return parseInt(arr[arr.length - 1]);
}

function getBuiltStructureFromResource(
  builtStructuresList: string[],
  resource: string
): string | null {
  let strObj = null;
  for (const k in STRUCTURES) {
    if (STRUCTURES[k].resource_name === resource) strObj = STRUCTURES[k];
  }
  if (!strObj) return null;
  for (const k in builtStructuresList) {
    if (builtStructuresList[k].includes(strObj.id as string))
      return builtStructuresList[k];
  }
  return null;
}

export { getLevel, getBuiltStructureFromResource };
